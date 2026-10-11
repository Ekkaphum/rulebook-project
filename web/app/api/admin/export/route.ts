import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { isAdminEmail } from "@/lib/session";

export const dynamic = "force-dynamic";

const cell = (v: unknown) => {
  const s = v == null ? "" : v instanceof Date ? v.toISOString() : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET() {
  const s = await getSession();
  if (!s || !isAdminEmail(s.email)) return new NextResponse("Forbidden", { status: 403 });
  const [me] = (await db()`select blocked from users where id = ${s.sub}`) as { blocked: boolean }[];
  if (!me || me.blocked) return new NextResponse("Forbidden", { status: 403 });

  const rows = (await db()`
    select u.name, u.email, u.role, u.role_other, u.country, u.city, u.locale, u.created_at, u.last_seen_at, u.login_count, u.blocked,
      (select count(*) from events e where e.user_id = u.id and e.type = 'page_view')::int as page_views,
      (select coalesce(sum(e.duration), 0) from events e where e.user_id = u.id and e.type = 'read')::int as reading_seconds,
      (select count(*) from events e where e.user_id = u.id and e.type = 'download')::int as downloads
    from users u order by u.created_at desc
  `) as Record<string, unknown>[];

  const cols = ["name", "email", "role", "role_other", "country", "city", "locale", "created_at", "last_seen_at", "login_count", "blocked", "page_views", "reading_seconds", "downloads"];
  const csv = "﻿" + [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="rulebook-users-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
