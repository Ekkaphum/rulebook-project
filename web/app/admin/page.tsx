import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { db, type UserRow } from "@/lib/db";
import { ROLES, roleLabel } from "@/lib/roles";
import { AdminNav, Avatar, BlockForm, DailyBars, EVENT_LABEL, Tile, ago, duration, pageName } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

type Search = Promise<{ tab?: string; q?: string; status?: string; sort?: string; role?: string }>;

export default async function AdminPage({ searchParams }: { searchParams: Search }) {
  const admin = await requireAdmin();
  const sp = await searchParams;
  return (
    <div className="admin">
      <header style={{ marginBottom: "1.25rem" }}>
        <p className="eyebrow">Admin</p>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, margin: 0 }}>ผู้อ่านและการใช้งาน</h1>
      </header>
      <AdminNav current={sp.tab === "users" ? "users" : "overview"} />
      {sp.tab === "users" ? <Users q={sp.q ?? ""} status={sp.status ?? "all"} sort={sp.sort ?? "recent"} role={sp.role ?? "all"} self={admin.sub} /> : <Overview />}
    </div>
  );
}

async function Overview() {
  const sql = db();
  const [kpi] = (await sql`
    select
      (select count(*) from users)::int as users,
      (select count(*) from users where created_at > now() - interval '7 days')::int as new7,
      (select count(*) from users where blocked)::int as blocked,
      (select count(distinct user_id) from events where user_id is not null and created_at > now() - interval '7 days')::int as active7,
      (select count(distinct user_id) from events where user_id is not null and created_at > now() - interval '1 day')::int as active1,
      (select count(*) from events where type = 'page_view' and user_id is not null and created_at > now() - interval '7 days')::int as views7,
      (select count(distinct session_id) from events where user_id is null and created_at > now() - interval '7 days')::int as visitors7,
      (select count(*) from events where type = 'download' and created_at > now() - interval '7 days')::int as downloads7
  `) as Record<string, number>[];

  const daily = (await sql`
    select to_char(d, 'YYYY-MM-DD') as day,
      (select count(distinct user_id) from events e where e.user_id is not null and e.created_at >= d and e.created_at < d + interval '1 day')::int as active,
      (select count(*) from users u where u.created_at >= d and u.created_at < d + interval '1 day')::int as signups
    from generate_series(date_trunc('day', now() at time zone 'Asia/Bangkok') - interval '29 days',
                         date_trunc('day', now() at time zone 'Asia/Bangkok'), interval '1 day') d
    order by d
  `) as { day: string; active: number; signups: number }[];

  const pages = (await sql`
    select v.path, v.views, v.readers, r.depth, r.dur
    from (select path, count(*)::int as views, count(distinct user_id)::int as readers
          from events where type = 'page_view' and user_id is not null and created_at > now() - interval '30 days'
          group by path) v
    left join (select path, round(avg(value))::int as depth, round(avg(duration))::int as dur
               from events where type = 'read' and created_at > now() - interval '30 days' group by path) r
      on r.path = v.path
    order by v.views desc limit 15
  `) as { path: string; views: number; readers: number; depth: number | null; dur: number | null }[];

  const sections = (await sql`
    select path, target, count(distinct user_id)::int as readers
    from events where type = 'section' and created_at > now() - interval '30 days'
    group by path, target order by readers desc, target limit 15
  `) as { path: string; target: string; readers: number }[];

  const downloads = (await sql`
    select target, count(*)::int as n, count(distinct user_id)::int as people
    from events where type = 'download' group by target order by n desc limit 10
  `) as { target: string; n: number; people: number }[];

  const outbound = (await sql`
    select target, count(*)::int as n from events where type = 'outbound'
    group by target order by n desc limit 10
  `) as { target: string; n: number }[];

  const countries = (await sql`
    select coalesce(country, '—') as country, count(*)::int as n from users group by 1 order by n desc limit 8
  `) as { country: string; n: number }[];

  const roles = (await sql`
    select role, count(*)::int as n from users group by role order by n desc
  `) as { role: string | null; n: number }[];
  const roleTotal = roles.reduce((a, r) => a + r.n, 0) || 1;

  const recent = (await sql`
    select e.type, e.path, e.target, e.value, e.duration, e.created_at, u.id as uid, u.name, u.email, u.picture
    from events e join users u on u.id = e.user_id
    where e.type <> 'read' or e.duration > 5
    order by e.created_at desc limit 25
  `) as { type: string; path: string; target: string | null; value: number | null; duration: number | null; created_at: string; uid: string; name: string | null; email: string; picture: string | null }[];

  const conversion = kpi.visitors7 ? Math.min(100, Math.round((kpi.new7 / kpi.visitors7) * 100)) : null;

  return (
    <>
      <section className="admin-tiles">
        <Tile label="ผู้ใช้ทั้งหมด" value={kpi.users} note={`ใหม่ 7 วัน: ${kpi.new7}`} />
        <Tile label="Active วันนี้ / 7 วัน" value={`${kpi.active1} / ${kpi.active7}`} />
        <Tile label="หน้าที่ถูกเปิด (7 วัน)" value={kpi.views7} />
        <Tile label="ผู้เยี่ยมชม Landing (7 วัน)" value={kpi.visitors7} note={conversion != null ? `สมัครคิดเป็น ~${conversion}%` : "ยังไม่ล็อกอิน"} />
        <Tile label="ดาวน์โหลด (7 วัน)" value={kpi.downloads7} />
        <Tile label="ถูกบล็อก" value={kpi.blocked} />
      </section>

      <section className="admin-two">
        <DailyBars title="ผู้อ่านที่ active ต่อวัน" unit="คน" data={daily.map((d) => ({ day: d.day, n: d.active }))} />
        <DailyBars title="สมัครใหม่ต่อวัน" unit="คน" data={daily.map((d) => ({ day: d.day, n: d.signups }))} />
      </section>

      <section className="card admin-card">
        <h2>หน้าที่ถูกอ่านมากที่สุด <small>30 วัน</small></h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>หน้า</th><th className="num">เปิด</th><th className="num">ผู้อ่าน</th><th className="num">อ่านลึกเฉลี่ย</th><th className="num">เวลาเฉลี่ย</th></tr></thead>
            <tbody>
              {pages.length === 0 && <tr><td colSpan={5} className="admin-empty">ยังไม่มีข้อมูล</td></tr>}
              {pages.map((p) => (
                <tr key={p.path}>
                  <td>{pageName(p.path)} <code>{p.path}</code></td>
                  <td className="num">{p.views}</td>
                  <td className="num">{p.readers}</td>
                  <td className="num">
                    {p.depth != null ? (
                      <span className="admin-meter"><span style={{ width: `${p.depth}%` }} />{p.depth}%</span>
                    ) : "—"}
                  </td>
                  <td className="num">{duration(p.dur)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-two">
        <div className="card admin-card">
          <h2>หัวข้อที่คนอ่านถึง <small>30 วัน · นับจำนวนคน</small></h2>
          <ol className="admin-list">
            {sections.length === 0 && <li className="admin-empty">ยังไม่มีข้อมูล</li>}
            {sections.map((s) => (
              <li key={s.path + s.target}><span>{s.target} <small>{pageName(s.path)}</small></span><b>{s.readers}</b></li>
            ))}
          </ol>
        </div>
        <div className="card admin-card">
          <h2>ไฟล์ที่ถูกดาวน์โหลด</h2>
          <ol className="admin-list">
            {downloads.length === 0 && <li className="admin-empty">ยังไม่มีข้อมูล</li>}
            {downloads.map((d) => (
              <li key={d.target}><span>{d.target.split("/").pop()} <small>{d.people} คน</small></span><b>{d.n}</b></li>
            ))}
          </ol>
          <h2 style={{ marginTop: "1.5rem" }}>แหล่งที่มาที่ถูกคลิก</h2>
          <ol className="admin-list">
            {outbound.length === 0 && <li className="admin-empty">ยังไม่มีข้อมูล</li>}
            {outbound.map((o) => (
              <li key={o.target}><a href={o.target} target="_blank" rel="noreferrer">{o.target.replace(/^https?:\/\//, "").slice(0, 60)}</a><b>{o.n}</b></li>
            ))}
          </ol>
          <h2 style={{ marginTop: "1.5rem" }}>ผู้ใช้ตามบทบาท</h2>
          <ol className="admin-list">
            {roles.map((r) => (
              <li key={r.role ?? "none"}>
                <Link href={`/admin?tab=users&role=${r.role ?? "none"}`}>{r.role ? roleLabel(r.role) : "ยังไม่ได้ตอบ"}</Link>
                <span className="admin-meter"><span style={{ width: `${(r.n / roleTotal) * 100}%` }} /><b>{r.n}</b></span>
              </li>
            ))}
          </ol>
          <h2 style={{ marginTop: "1.5rem" }}>ผู้ใช้ตามประเทศ</h2>
          <ol className="admin-list">
            {countries.map((c) => <li key={c.country}><span>{c.country}</span><b>{c.n}</b></li>)}
          </ol>
        </div>
      </section>

      <section className="card admin-card">
        <h2>กิจกรรมล่าสุด</h2>
        <ul className="admin-feed">
          {recent.length === 0 && <li className="admin-empty">ยังไม่มีกิจกรรม</li>}
          {recent.map((e, i) => (
            <li key={i}>
              <Avatar src={e.picture} name={e.name || e.email} size={26} />
              <span className="admin-feed-text">
                <Link href={`/admin/users/${e.uid}`}>{e.name || e.email}</Link>{" "}
                <span className="admin-muted">{EVENT_LABEL[e.type] ?? e.type}</span>{" "}
                {e.type === "section" ? e.target : e.type === "download" || e.type === "outbound" ? e.target?.split("/").pop() : pageName(e.path)}
                {e.type === "read" && <span className="admin-muted"> · {e.value}% · {duration(e.duration)}</span>}
              </span>
              <time className="admin-muted">{ago(e.created_at)}</time>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

async function Users({ q, status, sort, role, self }: { q: string; status: string; sort: string; role: string; self: string }) {
  const like = `%${q.trim()}%`;
  const rows = (await db()`
    select u.*,
      (select count(*) from events e where e.user_id = u.id and e.type = 'page_view')::int as views,
      (select count(distinct e.path) from events e where e.user_id = u.id and e.type = 'page_view')::int as pages,
      (select coalesce(sum(e.duration), 0) from events e where e.user_id = u.id and e.type = 'read')::int as seconds
    from users u
    where (${q} = '' or u.email ilike ${like} or u.name ilike ${like})
      and (${status} = 'all' or (${status} = 'blocked' and u.blocked) or (${status} = 'active' and not u.blocked))
      and (${role} = 'all' or (${role} = 'none' and u.role is null) or u.role = ${role})
    order by
      case when ${sort} = 'new' then u.created_at end desc,
      case when ${sort} = 'recent' then u.last_seen_at end desc,
      u.created_at desc
    limit 500
  `) as (UserRow & { views: number; pages: number; seconds: number })[];

  const sorted = sort === "active" ? [...rows].sort((a, b) => b.seconds - a.seconds) : rows;

  return (
    <section className="card admin-card">
      <form className="admin-filters">
        <input type="hidden" name="tab" value="users" />
        <input name="q" defaultValue={q} placeholder="ค้นหาชื่อหรืออีเมล" />
        <select name="status" defaultValue={status}>
          <option value="all">ทุกสถานะ</option>
          <option value="active">ใช้งานได้</option>
          <option value="blocked">ถูกบล็อก</option>
        </select>
        <select name="role" defaultValue={role}>
          <option value="all">ทุกบทบาท</option>
          {ROLES.map((r) => <option key={r.id} value={r.id}>{r.th}</option>)}
          <option value="none">ยังไม่ได้ตอบ</option>
        </select>
        <select name="sort" defaultValue={sort}>
          <option value="recent">เข้าใช้ล่าสุด</option>
          <option value="new">สมัครล่าสุด</option>
          <option value="active">ใช้เวลาอ่านมากสุด</option>
        </select>
        <button className="admin-btn" type="submit">กรอง</button>
      </form>
      <p className="admin-muted" style={{ fontSize: ".82rem" }}>{sorted.length} คน</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>ผู้ใช้</th><th>บทบาท</th><th>ประเทศ</th><th>สมัคร</th><th>เข้าล่าสุด</th><th className="num">ล็อกอิน</th><th className="num">หน้าที่เปิด</th><th className="num">เวลาอ่าน</th><th>สถานะ</th><th></th></tr>
          </thead>
          <tbody>
            {sorted.length === 0 && <tr><td colSpan={10} className="admin-empty">ไม่พบผู้ใช้</td></tr>}
            {sorted.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link href={`/admin/users/${u.id}`} className="admin-user">
                    <Avatar src={u.picture} name={u.name || u.email} />
                    <span><b>{u.name || "—"}</b><small>{u.email}</small></span>
                  </Link>
                </td>
                <td>{roleLabel(u.role)}{u.role_other && <small className="admin-muted"> · {u.role_other}</small>}</td>
                <td>{u.country ?? "—"}</td>
                <td>{ago(u.created_at)}</td>
                <td>{ago(u.last_seen_at)}</td>
                <td className="num">{u.login_count}</td>
                <td className="num">{u.views} <small className="admin-muted">({u.pages} หน้า)</small></td>
                <td className="num">{duration(u.seconds)}</td>
                <td>{u.blocked ? <span className="admin-pill admin-pill-bad">● บล็อก</span> : <span className="admin-pill admin-pill-good">● ปกติ</span>}</td>
                <td>{u.id !== self && <BlockForm id={u.id} blocked={u.blocked} compact />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
