import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";

const KB_UPLOADS_BUCKET = "kb-uploads";
const SIGNED_URL_TTL_SECONDS = 600; // 10 minutes: enough for n8n to fetch, short enough to be safe

const SOURCE_TYPES = ["paste", "website", "file", "sheet", "delete"] as const;
type SourceType = (typeof SOURCE_TYPES)[number];

function isSourceType(value: unknown): value is SourceType {
  return typeof value === "string" && (SOURCE_TYPES as readonly string[]).includes(value);
}

// Voxitron-team-only escape hatch (see components/dashboard/Sidebar.tsx's
// debug toggle and lib/dashboard/debugMode.ts): when the request sends this
// header, error responses include the real status/body from n8n instead of
// only the friendly one-liner. Never sent by a customer-facing form unless
// the team member viewing it flipped the sidebar toggle on, and even then
// this route doesn't check who's asking, it only ever adds detail to an
// error response that would otherwise already be an error.
const DEBUG_HEADER = "x-debug";

function isDebugRequest(request: Request): boolean {
  return request.headers.get(DEBUG_HEADER) === "1";
}

export async function POST(request: Request) {
  const debug = isDebugRequest(request);
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const webhookUrl = process.env.N8N_KB_INGEST_WEBHOOK_URL;
  const apiKey = process.env.N8N_KB_INGEST_API_KEY;
  if (!webhookUrl || !apiKey) {
    console.error("N8N_KB_INGEST_WEBHOOK_URL and/or N8N_KB_INGEST_API_KEY is not set.");
    return NextResponse.json(
      { error: "Knowledge base ingest isn't configured yet. Contact an admin." },
      { status: 500 }
    );
  }

  const contentType = request.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  let incoming: FormData | Record<string, unknown>;
  try {
    incoming = isJson ? await request.json() : await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  function field(key: string): string {
    if (incoming instanceof FormData) return String(incoming.get(key) || "");
    const value = (incoming as Record<string, unknown>)[key];
    return typeof value === "string" ? value : "";
  }

  const customers = await getUserCustomers(supabase, user.id);
  const requestedCustomerId = field("customerId");
  const active = resolveActiveCustomer(customers, requestedCustomerId || undefined);
  const customerId = active.id;

  const documentTitle = field("documentTitle");
  const sourceTypeRaw = field("sourceType");

  if (!documentTitle) {
    return NextResponse.json({ error: "Document title is required." }, { status: 400 });
  }
  if (!isSourceType(sourceTypeRaw)) {
    return NextResponse.json({ error: "Invalid source type." }, { status: 400 });
  }
  const sourceType = sourceTypeRaw;

  const payload: Record<string, string> = {
    customerId,
    documentTitle,
    sourceType,
  };

  if (sourceType === "paste") {
    const content = field("content");
    if (!content.trim()) {
      return NextResponse.json({ error: "Content is required for pasted text." }, { status: 400 });
    }
    payload.content = content;
  } else if (sourceType === "website") {
    const pageUrl = field("pageUrl");
    if (!/^https?:\/\//.test(pageUrl)) {
      return NextResponse.json({ error: "A valid http(s) Page URL is required." }, { status: 400 });
    }
    payload.pageUrl = pageUrl;
  } else if (sourceType === "sheet") {
    const googleSheetUrl = field("googleSheetUrl");
    if (!/^https?:\/\/docs\.google\.com\/spreadsheets\//.test(googleSheetUrl)) {
      return NextResponse.json(
        { error: "A valid docs.google.com/spreadsheets URL is required." },
        { status: 400 }
      );
    }
    payload.googleSheetUrl = googleSheetUrl;
  } else if (sourceType === "file") {
    const storagePath = field("storagePath");
    if (!storagePath) {
      return NextResponse.json({ error: "No uploaded file to ingest." }, { status: 400 });
    }

    // The path is server-chosen at upload time (`{customerId}/{uuid}.{ext}`,
    // see app/api/kb-upload-url/route.ts) but this request's customerId is
    // resolved fresh from the session above, not trusted from the client,
    // so this re-check is what actually stops one tenant from pointing at
    // another tenant's uploaded object.
    if (!storagePath.startsWith(`${customerId}/`)) {
      return NextResponse.json({ error: "That file doesn't belong to this account." }, { status: 403 });
    }

    const admin = createAdminClient();
    const { data: signedUrlData, error: signedUrlError } = await admin.storage
      .from(KB_UPLOADS_BUCKET)
      .createSignedUrl(storagePath, SIGNED_URL_TTL_SECONDS);

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error("Failed to create a signed URL for the uploaded KB source file:", signedUrlError);
      return NextResponse.json({ error: "Couldn't prepare the uploaded file. Try again." }, { status: 500 });
    }

    payload.fileUrl = signedUrlData.signedUrl;
  }
  // sourceType === "delete": no extra fields, customerId + documentTitle are enough.

  let n8nResponse: Response;
  try {
    n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to reach the knowledge base ingest workflow:", error);
    return NextResponse.json(
      {
        error: "Couldn't reach the ingest workflow. Try again in a moment.",
        ...(debug && {
          debug: {
            stage: "fetch",
            webhookUrl,
            message: error instanceof Error ? error.message : String(error),
          },
        }),
      },
      { status: 502 }
    );
  }

  const responseText = await n8nResponse.text();
  let responseJson: unknown;
  try {
    responseJson = JSON.parse(responseText);
  } catch {
    console.error("Ingest workflow returned a non-JSON response:", responseText);
    return NextResponse.json(
      {
        error: "The ingest workflow returned an unexpected response.",
        ...(debug && {
          debug: {
            stage: "parse-response",
            webhookUrl,
            requestPayload: { ...payload, content: payload.content ? `[${payload.content.length} chars]` : undefined },
            n8nStatus: n8nResponse.status,
            n8nStatusText: n8nResponse.statusText,
            n8nBody: responseText.slice(0, 4000),
          },
        }),
      },
      { status: 502 }
    );
  }

  return NextResponse.json(responseJson, { status: n8nResponse.status });
}
