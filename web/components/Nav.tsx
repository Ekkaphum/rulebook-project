"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DICT } from "@/lib/i18n";

export default function Nav() {
  const pathname = usePathname() || "/";
  const isTh = pathname === "/th" || pathname.startsWith("/th/");
  const locale = isTh ? "th" : "en";
  const t = DICT[locale];
  const b = isTh ? "/th" : "";

  const items = [
    { href: `${b}/handbook`, label: t.nav.handbook },
    { href: `${b}/principles`, label: t.nav.principles },
    { href: `${b}/examples`, label: t.nav.examples },
    { href: `${b}/checklist`, label: t.nav.checklist },
    { href: `${b}/sources`, label: t.nav.sources },
    ...(isTh ? [{ href: "/th/ebook", label: t.nav.ebook as string }] : []),
    { href: `${b}/downloads`, label: t.nav.downloads },
  ];

  // Mirror the current page across locales where a counterpart exists.
  const rest = isTh ? pathname.replace(/^\/th/, "") : pathname;
  const other = isTh ? (rest === "/ebook" ? "/" : rest || "/") : `/th${rest === "/" ? "" : rest}`;

  return (
    <nav
      style={{
        maxWidth: "72rem", margin: "0 auto", padding: ".7rem 1.25rem",
        display: "flex", alignItems: "center", gap: "1.1rem", flexWrap: "wrap",
      }}
    >
      <Link href={b || "/"} style={{ color: "var(--ink)", fontWeight: 700, fontSize: ".98rem", letterSpacing: "-.01em" }}>
        {t.brand}
      </Link>
      <div style={{ display: "flex", gap: "1.05rem", flexWrap: "wrap", fontSize: ".875rem" }}>
        {items.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            style={{ color: pathname === n.href ? "var(--accent-2)" : "var(--ink-2)", fontWeight: pathname === n.href ? 600 : 400 }}
          >
            {n.label}
          </Link>
        ))}
      </div>
      <Link
        href={other}
        style={{
          marginLeft: "auto", fontSize: ".8rem", fontWeight: 600,
          border: "1px solid var(--border)", borderRadius: 999,
          padding: ".22rem .7rem", color: "var(--ink-2)",
        }}
      >
        {isTh ? "English" : "ภาษาไทย"}
      </Link>
    </nav>
  );
}
