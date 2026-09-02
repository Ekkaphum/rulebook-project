"use client";
import { useEffect, useState } from "react";
import type { Heading } from "@/lib/content";

export default function TocSidebar({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  return (
    <nav
      aria-label="Table of contents"
      style={{ position: "sticky", top: "5rem", maxHeight: "calc(100vh - 7rem)", overflowY: "auto", fontSize: ".82rem", paddingRight: ".5rem" }}
    >
      <p style={{ fontWeight: 650, color: "var(--ink)", margin: "0 0 .6rem", fontSize: ".78rem", letterSpacing: ".06em", textTransform: "uppercase" }}>
        Contents
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: ".2rem" }}>
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 2 ? ".75rem" : 0 }}>
            <a
              href={`#${h.id}`}
              style={{
                color: active === h.id ? "var(--accent-2)" : "var(--ink-3)",
                fontWeight: active === h.id ? 600 : 400,
                display: "block", padding: ".13rem 0", lineHeight: 1.35,
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
