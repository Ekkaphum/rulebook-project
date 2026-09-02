import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Rulebook Project — how to write board game rules people can actually use",
    template: "%s · The Rulebook Project",
  },
  description:
    "A researched, source-linked handbook on writing board game rulebooks: structure, language, examples, layout, blind playtesting, and 68 real rulebooks studied as models and as warnings.",
  keywords: ["board game", "rulebook", "rules writing", "game design", "technical writing", "blind playtest"],
  openGraph: {
    title: "The Rulebook Project",
    description: "How to write board game rules people can actually use — synthesised from 106 primary sources.",
    type: "website",
  },
};

const NAV = [
  { href: "/handbook", label: "Handbook" },
  { href: "/principles", label: "Principles" },
  { href: "/examples", label: "Examples" },
  { href: "/checklist", label: "Checklist" },
  { href: "/sources", label: "Sources" },
  { href: "/thai", label: "ภาษาไทย" },
  { href: "/downloads", label: "Downloads" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            position: "sticky", top: 0, zIndex: 50,
            background: "color-mix(in srgb, var(--bg) 88%, transparent)",
            backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)",
          }}
        >
          <nav
            style={{
              maxWidth: "72rem", margin: "0 auto", padding: ".7rem 1.25rem",
              display: "flex", alignItems: "center", gap: "1.1rem", flexWrap: "wrap",
            }}
          >
            <Link href="/" style={{ color: "var(--ink)", fontWeight: 700, fontSize: ".98rem", letterSpacing: "-.01em" }}>
              The Rulebook Project
            </Link>
            <div style={{ display: "flex", gap: "1.05rem", flexWrap: "wrap", fontSize: ".875rem" }}>
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} style={{ color: "var(--ink-2)" }}>
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main style={{ maxWidth: "72rem", margin: "0 auto", padding: "2.5rem 1.25rem 4rem" }}>{children}</main>

        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <div
            style={{
              maxWidth: "72rem", margin: "0 auto", padding: "2rem 1.25rem",
              fontSize: ".82rem", color: "var(--ink-3)", display: "grid", gap: ".5rem",
            }}
          >
            <p style={{ margin: 0 }}>
              Synthesised from 106 primary sources — BoardGameGeek forums and blogs, publisher style guides,
              professional rules editors, and the accessibility literature. Every claim on this site links back to
              its source.
            </p>
            <p style={{ margin: 0 }}>
              Michael “Curby” Lee’s <a href="https://cur.by/styleguide">Board Game Editing Style Guide</a> is
              CC&nbsp;BY-NC-SA; material derived from it is attributed throughout. All other sources are summarised
              and attributed, not reproduced.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
