"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DICT } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = pathname === "/th" || pathname.startsWith("/th/") ? "th" : "en";
  const t = DICT[locale];
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div
        style={{
          maxWidth: "72rem", margin: "0 auto", padding: "2rem 1.25rem",
          fontSize: ".82rem", color: "var(--ink-3)", display: "grid", gap: ".5rem",
        }}
      >
        <p style={{ margin: 0 }}>{t.footerA}</p>
        <p style={{ margin: 0 }}>
          {t.footerB.split("Board Game Editing Style Guide")[0]}
          <a href="https://cur.by/styleguide">Board Game Editing Style Guide</a>
          {t.footerB.split("Board Game Editing Style Guide")[1]}
        </p>
        <p style={{ margin: 0 }}>
          {t.footerPrivacy[0]}
          <Link href={locale === "th" ? "/th/privacy" : "/privacy"}>{t.footerPrivacy[1]}</Link>
          {t.footerPrivacy[2]}
        </p>
      </div>
    </footer>
  );
}
