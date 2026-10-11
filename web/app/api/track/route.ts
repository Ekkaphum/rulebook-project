import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { SESSION_COOKIE, readSession } from "@/lib/session";

const TYPES = new Set(["page_view", "read", "section", "download", "outbound"]);
const PUBLIC_PATHS = new Set(["/", "/th", "/welcome", "/th/welcome"]);

type Incoming = { type: string; path?: string; target?: string; value?: number; duration?: number; sid?: string };

const clip = (s: unknown, n: number) => (typeof s === "string" ? s.slice(0, n) : null);
const int = (v: unknown, max: number) => (typeof v === "number" && Number.isFinite(v) ? Math.max(0, Math.min(max, Math.round(v))) : null);

/**
 * Records reading activity. Signed-in readers are attributed to their account;
 * anonymous visitors are counted only on the landing page, by a per-tab id.
 */
export async function POST(req: NextRequest) {
  let body: Incoming | Incoming[];
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const events = (Array.isArray(body) ? body : [body]).slice(0, 20).filter((e) => TYPES.has(e?.type));
  if (!events.length) return new NextResponse(null, { status: 204 });

  const session = await readSession(req.cookies.get(SESSION_COOKIE)?.value);
  let userId: string | null = null;
  if (session) {
    const rows = (await db()`update users set last_seen_at = now() where id = ${session.sub} and not blocked returning id`) as { id: string }[];
    if (!rows[0]) return new NextResponse(null, { status: 403 });
    userId = rows[0].id;
  }

  const country = req.headers.get("x-vercel-ip-country");
  const ua = req.headers.get("user-agent")?.slice(0, 300) ?? null;
  for (const e of events) {
    const path = clip(e.path, 300);
    if (!userId && !(e.type === "page_view" && path && PUBLIC_PATHS.has(path))) continue;
    await db()`insert into events (user_id, session_id, type, path, target, value, duration, country, ua)
      values (${userId}, ${clip(e.sid, 64)}, ${e.type}, ${path}, ${clip(e.target, 500)}, ${int(e.value, 100)}, ${int(e.duration, 86400)}, ${country}, ${ua})`;
  }
  return new NextResponse(null, { status: 204 });
}
