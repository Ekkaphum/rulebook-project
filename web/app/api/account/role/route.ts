import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { isRole } from "@/lib/roles";
import { SESSION_COOKIE, readSession, safeNext, sessionCookieOptions, signSession } from "@/lib/session";

/** Saves the reader's role and re-issues the session so the proxy lets them through. */
export async function POST(req: NextRequest) {
  const s = await readSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!s) return NextResponse.redirect(new URL("/welcome", req.url), 303);

  const form = await req.formData();
  const role = form.get("role");
  const next = safeNext(String(form.get("next") ?? "/"));
  const back = new URL(`${next.startsWith("/th") ? "/th" : ""}/onboarding`, req.url);
  back.searchParams.set("next", next);
  if (!isRole(role)) {
    back.searchParams.set("error", "1");
    return NextResponse.redirect(back, 303);
  }
  const other = role === "other" ? String(form.get("other") ?? "").trim().slice(0, 120) || null : null;

  const rows = (await db()`update users set role = ${role}, role_other = ${other}, role_at = now()
    where id = ${s.sub} and not blocked returning name, picture`) as { name: string | null; picture: string | null }[];
  if (!rows[0]) return NextResponse.redirect(new URL("/blocked", req.url), 303);

  const token = await signSession({ sub: s.sub, email: s.email, name: rows[0].name ?? "", picture: rows[0].picture ?? "", role });
  const res = NextResponse.redirect(new URL(next, req.url), 303);
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return res;
}
