import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  let body: { resolved?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const resolved = Boolean(body.resolved);

  const { error } = await supabase
    .from("conversations")
    .update({ resolved, resolved_at: resolved ? new Date().toISOString() : null })
    .eq("id", id);

  if (error) {
    console.error("Failed to update conversation resolved state:", error);
    return NextResponse.json({ error: "Couldn't update this conversation. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
