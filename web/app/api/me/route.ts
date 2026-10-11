import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { gateEnabled, isAdminEmail } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const s = await getSession();
  const gate = gateEnabled();
  if (!s) return NextResponse.json({ user: null, gate });
  return NextResponse.json({
    user: { name: s.name, email: s.email, picture: s.picture, admin: isAdminEmail(s.email) },
    gate,
  });
}
