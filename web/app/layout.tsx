import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Rulebook Project — how to write board game rules people can actually use",
    template: "%s · The Rulebook Project",
  },
  description:
    "A researched, source-linked handbook on writing board game rulebooks: structure, language, examples, layout, blind playtesting, and 68 real rulebooks studied as models and as warnings. Available in English and Thai.",
  keywords: ["board game", "rulebook", "rules writing", "game design", "technical writing", "blind playtest", "บอร์ดเกม", "คู่มือเกม", "ออกแบบบอร์ดเกม"],
  openGraph: {
    title: "The Rulebook Project",
    description: "How to write board game rules people can actually use — synthesised from 106 primary sources.",
    type: "website",
  },
};

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
          <Nav />
        </header>

        <main style={{ maxWidth: "72rem", margin: "0 auto", padding: "2.5rem 1.25rem 4rem" }}>{children}</main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
