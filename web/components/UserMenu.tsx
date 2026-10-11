"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Me = { user: { name: string; email: string; picture: string; admin: boolean } | null; gate: boolean };

export default function UserMenu({ isTh }: { isTh: boolean }) {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    fetch("/api/me", { cache: "no-store" }).then((r) => r.json()).then(setMe).catch(() => {});
  }, []);

  if (!me || !me.gate) return null;

  if (!me.user) {
    return (
      <Link
        href={isTh ? "/th/welcome" : "/welcome"}
        style={{ fontSize: ".8rem", fontWeight: 600, background: "var(--accent)", color: "#fff", borderRadius: 999, padding: ".25rem .8rem" }}
      >
        {isTh ? "เข้าสู่ระบบ" : "Sign in"}
      </Link>
    );
  }

  const u = me.user;
  return (
    <details className="user-menu">
      <summary aria-label={isTh ? "บัญชีของคุณ" : "Your account"}>
        {u.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={u.picture} alt="" width={28} height={28} referrerPolicy="no-referrer" />
        ) : (
          <span className="user-initial">{(u.name || u.email).slice(0, 1).toUpperCase()}</span>
        )}
      </summary>
      <div className="user-menu-panel">
        <div style={{ fontWeight: 600, color: "var(--ink)" }}>{u.name || u.email}</div>
        <div style={{ color: "var(--ink-3)", fontSize: ".78rem", marginBottom: ".5rem", wordBreak: "break-all" }}>{u.email}</div>
        {u.admin && (
          <Link href="/admin" style={{ display: "block", padding: ".3rem 0" }}>
            {isTh ? "แดชบอร์ดผู้ดูแล" : "Admin dashboard"}
          </Link>
        )}
        <form action="/api/auth/logout" method="post">
          <button type="submit">{isTh ? "ออกจากระบบ" : "Sign out"}</button>
        </form>
        <form
          action="/api/account/delete"
          method="post"
          onSubmit={(e) => {
            const msg = isTh
              ? "ลบบัญชีและประวัติการอ่านทั้งหมดถาวร?"
              : "Permanently delete your account and reading history?";
            if (!confirm(msg)) e.preventDefault();
          }}
        >
          <button type="submit" style={{ color: "var(--ink-3)", fontSize: ".78rem" }}>
            {isTh ? "ลบบัญชีของฉัน" : "Delete my account"}
          </button>
        </form>
      </div>
    </details>
  );
}
