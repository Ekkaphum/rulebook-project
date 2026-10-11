import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, readSession, isAdminEmail } from "@/lib/session";
import { db } from "@/lib/db";

export async function getSession() {
  const jar = await cookies();
  return readSession(jar.get(SESSION_COOKIE)?.value);
}

/** Verifies the session against the database — use for anything privileged. */
export async function requireAdmin() {
  const s = await getSession();
  if (!s || !isAdminEmail(s.email)) redirect("/");
  const rows = (await db()`select blocked from users where id = ${s.sub}`) as { blocked: boolean }[];
  if (!rows[0] || rows[0].blocked) redirect("/");
  return s;
}
