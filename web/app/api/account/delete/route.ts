import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { SESSION_COOKIE, readSession } from "@/lib/session";

/** Self-service erasure: removes the account and, by cascade, its reading history. */
export async function POST(req: NextRequest) {
  const s = await readSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (s) await db()`delete from users where id = ${s.sub} and not blocked`;
  const res = NextResponse.redirect(new URL("/", req.url), 303);
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
