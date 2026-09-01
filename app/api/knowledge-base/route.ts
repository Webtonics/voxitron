import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";

const KB_UPLOADS_BUCKET = "kb-uploads";
const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour, only needs to survive the n8n workflow's download step

const SOURCE_TYPES = ["paste", "website", "file", "sheet", "delete"] as const;
type SourceType = (typeof SOURCE_TYPES)[number];

function isSourceType(value: unknown): value is SourceType {
  return typeof value === "string" && (SOURCE_TYPES as readonly string[]).includes(value);
}

export async function POST(request: Request) {
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

  let incoming: FormData;
  try {
    incoming = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const customers = await getUserCustomers(supabase, user.id);
  const requestedCustomerId = String(incoming.get("customerId") || "");
  const active = resolveActiveCustomer(customers, requestedCustomerId || undefined);
  const customerId = active.id;

  const documentTitle = String(incoming.get("documentTitle") || "");
  const sourceTypeRaw = incoming.get("sourceType");

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
    const content = String(incoming.get("content") || "");
    if (!content.trim()) {
      return NextResponse.json({ error: "Content is required for pasted text." }, { status: 400 });
    }
    payload.content = content;
  } else if (sourceType === "website") {
    const pageUrl = String(incoming.get("pageUrl") || "");
    if (!/^https?:\/\//.test(pageUrl)) {
      return NextResponse.json({ error: "A valid http(s) Page URL is required." }, { status: 400 });
    }
    payload.pageUrl = pageUrl;
  } else if (sourceType === "sheet") {
    const googleSheetUrl = String(incoming.get("googleSheetUrl") || "");
    if (!/^https?:\/\/docs\.google\.com\/spreadsheets\//.test(googleSheetUrl)) {
      return NextResponse.json(
        { error: "A valid docs.google.com/spreadsheets URL is required." },
        { status: 400 }
      );
    }
    payload.googleSheetUrl = googleSheetUrl;
  } else if (sourceType === "file") {
    const file = incoming.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "A file is required." }, { status: 400 });
    }

    const extension = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
    if (![".pdf", ".docx"].includes(extension.toLowerCase())) {
      return NextResponse.json({ error: "Only .pdf and .docx files are supported." }, { status: 400 });
    }

    const admin = createAdminClient();
    const storagePath = `${customerId}/${randomUUID()}${extension}`;

    const { error: uploadError } = await admin.storage
      .from(KB_UPLOADS_BUCKET)
      .upload(storagePath, file, {
        contentType: file.type || undefined,
        upsert: false,
      });

    if (uploadError) {
      console.error("Failed to upload KB source file to Storage:", uploadError);
      return NextResponse.json({ error: "Couldn't upload the file. Try again." }, { status: 500 });
    }

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
      { error: "Couldn't reach the ingest workflow. Try again in a moment." },
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
      { error: "The ingest workflow returned an unexpected response." },
      { status: 502 }
    );
  }

  return NextResponse.json(responseJson, { status: n8nResponse.status });
}
