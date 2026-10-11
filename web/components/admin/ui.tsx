import Link from "next/link";
import { setBlocked } from "@/app/admin/actions";

export function fmtDate(d: string | Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("th-TH", { timeZone: "Asia/Bangkok", dateStyle: "medium", timeStyle: "short" });
}

export function ago(d: string | Date | null) {
  if (!d) return "—";
  const s = Math.round((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "เมื่อสักครู่";
  if (s < 3600) return `${Math.floor(s / 60)} นาทีที่แล้ว`;
  if (s < 86400) return `${Math.floor(s / 3600)} ชม. ที่แล้ว`;
  return `${Math.floor(s / 86400)} วันที่แล้ว`;
}

export function duration(sec: number | null) {
  if (sec == null) return "—";
  if (sec < 60) return `${sec} วิ`;
  const m = Math.floor(sec / 60);
  return m < 60 ? `${m} นาที` : `${Math.floor(m / 60)} ชม. ${m % 60} นาที`;
}

export const EVENT_LABEL: Record<string, string> = {
  login: "ล็อกอิน",
  page_view: "เปิดหน้า",
  read: "อ่านจบหน้า",
  section: "อ่านถึงหัวข้อ",
  download: "ดาวน์โหลด",
  outbound: "คลิกแหล่งที่มา",
};

export function Tile({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="admin-tile">
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  );
}

export function Avatar({ src, name, size = 32 }: { src: string | null; name: string; size?: number }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size} height={size} referrerPolicy="no-referrer" className="admin-avatar" />
  ) : (
    <span className="admin-avatar admin-avatar-initial" style={{ width: size, height: size }}>{name.slice(0, 1).toUpperCase()}</span>
  );
}

/** A single-series daily bar chart. Each bar carries a native hover tooltip. */
export function DailyBars({ title, data, unit }: { title: string; data: { day: string; n: number }[]; unit: string }) {
  const max = Math.max(1, ...data.map((d) => d.n));
  const W = 600, H = 140, gap = 2;
  const bw = W / data.length - gap;
  const total = data.reduce((a, d) => a + d.n, 0);
  return (
    <figure className="card admin-chart">
      <figcaption>
        <span>{title}</span>
        <small>รวม 30 วัน: {total.toLocaleString()} {unit}</small>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H + 18}`} role="img" aria-label={title} preserveAspectRatio="none">
        <line x1="0" x2={W} y1={H} y2={H} stroke="var(--border)" />
        {data.map((d, i) => {
          const h = (d.n / max) * (H - 6);
          const x = i * (bw + gap);
          const label = new Date(d.day).toLocaleDateString("th-TH", { day: "numeric", month: "short" });
          return (
            <g key={d.day} className="admin-bar">
              <rect x={x} y={0} width={bw + gap} height={H} fill="transparent" />
              {d.n > 0 && <rect x={x} y={H - h} width={bw} height={h} rx={Math.min(4, bw / 2)} fill="var(--accent-2)" />}
              <title>{`${label}: ${d.n} ${unit}`}</title>
              {(i === 0 || i === data.length - 1 || i % 7 === 0) && (
                <text x={x + bw / 2} y={H + 14} textAnchor="middle" fontSize="10" fill="var(--ink-3)">{label}</text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="admin-axis-note">สูงสุด {max} {unit}/วัน · ชี้ที่แท่งเพื่อดูค่า</p>
    </figure>
  );
}

export function BlockForm({ id, blocked, compact }: { id: string; blocked: boolean; compact?: boolean }) {
  return (
    <form action={setBlocked} className="admin-block-form">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="block" value={blocked ? "0" : "1"} />
      {!blocked && !compact && <input name="reason" placeholder="เหตุผล (ไม่บังคับ)" maxLength={300} />}
      <button type="submit" className={blocked ? "admin-btn" : "admin-btn admin-btn-danger"}>
        {blocked ? "ปลดบล็อก" : "บล็อก"}
      </button>
    </form>
  );
}

export function AdminNav({ current }: { current: "overview" | "users" }) {
  return (
    <nav className="admin-tabs">
      <Link href="/admin" aria-current={current === "overview" ? "page" : undefined}>ภาพรวม</Link>
      <Link href="/admin?tab=users" aria-current={current === "users" ? "page" : undefined}>ผู้ใช้</Link>
      <a href="/api/admin/export">ดาวน์โหลด CSV</a>
    </nav>
  );
}

const PAGE_NAMES: Record<string, string> = {
  "/": "หน้าหลัก (EN)", "/th": "หน้าหลัก (TH)", "/handbook": "Handbook (EN)", "/th/handbook": "คู่มือฉบับเต็ม",
  "/th/ebook": "ฉบับเล่าสู่กันฟัง", "/principles": "Principles (EN)", "/th/principles": "องค์ความรู้",
  "/examples": "Examples (EN)", "/th/examples": "ตัวอย่างจริง", "/checklist": "Checklist (EN)", "/th/checklist": "เช็กลิสต์",
  "/sources": "Sources (EN)", "/th/sources": "แหล่งข้อมูล", "/downloads": "Downloads (EN)", "/th/downloads": "ดาวน์โหลด",
};
export const pageName = (p: string | null) => (p ? PAGE_NAMES[p] ?? p : "—");

