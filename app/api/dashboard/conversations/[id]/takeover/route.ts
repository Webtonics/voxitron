import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// Logged-in-dashboard counterpart to the no-login /takeover/[token] flow
// (app/api/takeover/[token]/*): same ai_paused flag, different entry
// point. "Take over" pauses the AI without requiring a reply first (an
// owner already looking at the dashboard may want to silence the AI
// before typing); the takeover-link flow pauses automatically on send
// instead, since there's no separate "take over" click there.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  let body: { paused?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const paused = Boolean(body.paused);

  const patch: { ai_paused: boolean; ai_paused_at: string | null; needs_human?: boolean } = {
    ai_paused: paused,
    ai_paused_at: paused ? new Date().toISOString() : null,
  };
  if (!paused) {
    patch.needs_human = false;
  }

  const { error } = await supabase.from("conversations").update(patch).eq("id", id);

  if (error) {
    console.error("Failed to update conversation takeover state:", error);
    return NextResponse.json({ error: "Couldn't update this conversation. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
