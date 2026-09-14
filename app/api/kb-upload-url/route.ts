import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";

const KB_UPLOADS_BUCKET = "kb-uploads";
const ALLOWED_EXTENSIONS = [".pdf", ".docx"];
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB

function extensionOf(filename: string): string {
  return filename.includes(".") ? filename.slice(filename.lastIndexOf(".")).toLowerCase() : "";
}

export async function POST(request: Request) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  let body: { filename?: unknown; contentType?: unknown; size?: unknown; customerId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const filename = typeof body.filename === "string" ? body.filename : "";
  const size = typeof body.size === "number" ? body.size : NaN;

  if (!filename) {
    return NextResponse.json({ error: "A filename is required." }, { status: 400 });
  }

  const extension = extensionOf(filename);
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return NextResponse.json({ error: "Only .pdf and .docx files are supported." }, { status: 400 });
  }

  if (!Number.isFinite(size) || size <= 0) {
    return NextResponse.json({ error: "A valid file size is required." }, { status: 400 });
  }
  if (size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "That file is too large. Max size is 25MB." }, { status: 400 });
  }

  const customers = await getUserCustomers(supabase, user.id);
  const requestedCustomerId = typeof body.customerId === "string" ? body.customerId : undefined;
  const active = resolveActiveCustomer(customers, requestedCustomerId);
  const customerId = active.id;

  const storagePath = `${customerId}/${randomUUID()}${extension}`;

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from(KB_UPLOADS_BUCKET)
    .createSignedUploadUrl(storagePath);

  if (error || !data) {
    console.error("Failed to create a signed upload URL for a KB source file:", error);
    return NextResponse.json({ error: "Couldn't prepare the upload. Try again." }, { status: 500 });
  }

  return NextResponse.json({
    path: data.path,
    token: data.token,
    signedUrl: data.signedUrl,
  });
}
