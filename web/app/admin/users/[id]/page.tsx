import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db, type UserRow } from "@/lib/db";
import { roleLabel } from "@/lib/roles";
import { Avatar, BlockForm, EVENT_LABEL, Tile, ago, duration, fmtDate, pageName } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Admin · User", robots: { index: false } };
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const sql = db();

  const [user] = (await sql`select * from users where id = ${id}`) as UserRow[];
  if (!user) notFound();

  const pages = (await sql`
    select v.path, v.views, v.last, r.depth, r.dur
    from (select path, count(*)::int as views, max(created_at) as last from events
          where user_id = ${id} and type = 'page_view' group by path) v
    left join (select path, max(value)::int as depth, sum(duration)::int as dur from events
               where user_id = ${id} and type = 'read' group by path) r on r.path = v.path
    order by v.last desc
  `) as { path: string; views: number; last: string; depth: number | null; dur: number | null }[];

  const sections = (await sql`
    select path, target, min(created_at) as first from events
    where user_id = ${id} and type = 'section' group by path, target order by first
  `) as { path: string; target: string; first: string }[];

  const timeline = (await sql`
    select type, path, target, value, duration, created_at, country, ua from events
    where user_id = ${id} and (type <> 'read' or duration > 5)
    order by created_at desc limit 200
  `) as { type: string; path: string; target: string | null; value: number | null; duration: number | null; created_at: string; country: string | null; ua: string | null }[];

  const totalSeconds = pages.reduce((a, p) => a + (p.dur ?? 0), 0);
  const downloads = timeline.filter((e) => e.type === "download").length;
  const lastUa = timeline.find((e) => e.ua)?.ua;

  return (
    <div className="admin">
      <p style={{ margin: "0 0 1rem" }}><Link href="/admin?tab=users">← ผู้ใช้ทั้งหมด</Link></p>

      <section className="card admin-card admin-profile">
        <Avatar src={user.picture} name={user.name || user.email} size={64} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1>{user.name || "—"}</h1>
          <p><a href={`mailto:${user.email}`}>{user.email}</a></p>
          <p><b>{roleLabel(user.role)}</b>{user.role_other && ` — ${user.role_other}`}</p>
          <p className="admin-muted">
            สมัคร {fmtDate(user.created_at)} · เข้าล่าสุด {ago(user.last_seen_at)} · {[user.city, user.country].filter(Boolean).join(", ") || "ไม่ทราบตำแหน่ง"}
            {user.locale && ` · ภาษา ${user.locale}`}
          </p>
          {lastUa && <p className="admin-muted" style={{ fontSize: ".75rem" }}>{lastUa}</p>}
          {user.blocked && (
            <p className="admin-pill admin-pill-bad" style={{ display: "inline-block" }}>
              ● บล็อกเมื่อ {fmtDate(user.blocked_at)}{user.blocked_reason ? ` — ${user.blocked_reason}` : ""}
            </p>
          )}
        </div>
        {user.id !== admin.sub && <BlockForm id={user.id} blocked={user.blocked} />}
      </section>

      <section className="admin-tiles">
        <Tile label="ล็อกอิน" value={user.login_count} />
        <Tile label="หน้าที่เปิด" value={pages.reduce((a, p) => a + p.views, 0)} note={`${pages.length} หน้าไม่ซ้ำ`} />
        <Tile label="เวลาอ่านรวม" value={duration(totalSeconds)} />
        <Tile label="หัวข้อที่อ่านถึง" value={sections.length} />
        <Tile label="ดาวน์โหลด" value={downloads} />
      </section>

      <section className="admin-two">
        <div className="card admin-card">
          <h2>หน้าที่อ่าน</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>หน้า</th><th className="num">ครั้ง</th><th className="num">อ่านลึกสุด</th><th className="num">เวลา</th></tr></thead>
              <tbody>
                {pages.length === 0 && <tr><td colSpan={4} className="admin-empty">ยังไม่ได้เปิดหน้าไหน</td></tr>}
                {pages.map((p) => (
                  <tr key={p.path}>
                    <td>{pageName(p.path)}</td>
                    <td className="num">{p.views}</td>
                    <td className="num">{p.depth != null ? <span className="admin-meter"><span style={{ width: `${p.depth}%` }} />{p.depth}%</span> : "—"}</td>
                    <td className="num">{duration(p.dur)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card admin-card">
          <h2>หัวข้อที่อ่านถึง</h2>
          <ol className="admin-list">
            {sections.length === 0 && <li className="admin-empty">ยังไม่มี</li>}
            {sections.map((s) => <li key={s.path + s.target}><span>{s.target} <small>{pageName(s.path)}</small></span></li>)}
          </ol>
        </div>
      </section>

      <section className="card admin-card">
        <h2>ไทม์ไลน์ <small>200 รายการล่าสุด</small></h2>
        <ul className="admin-feed">
          {timeline.map((e, i) => (
            <li key={i}>
              <span className="admin-pill">{EVENT_LABEL[e.type] ?? e.type}</span>
              <span className="admin-feed-text">
                {e.type === "section" ? `${e.target} · ${pageName(e.path)}` : e.type === "download" || e.type === "outbound" ? e.target : pageName(e.path)}
                {e.type === "read" && <span className="admin-muted"> · อ่านถึง {e.value}% · {duration(e.duration)}</span>}
              </span>
              <time className="admin-muted">{fmtDate(e.created_at)}</time>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
