"use client";
import { useCallback } from "react";
import type { Knowledge } from "@/lib/content";
import { SearchBox, Chips, useFilter } from "@/components/Filterable";

export default function KnowledgeList({ items }: { items: Knowledge[] }) {
  const fields = useCallback((k: Knowledge) => [k.topic, k.principle, k.detail, k.evidence, k.category, k.source], []);
  const categoryOf = useCallback((k: Knowledge) => k.category, []);
  const { q, setQ, cat, setCat, categories, filtered } = useFilter(items, fields, categoryOf);

  return (
    <>
      <div style={{ display: "grid", gap: ".9rem", marginBottom: "1.75rem" }}>
        <SearchBox value={q} onChange={setQ} placeholder="Search findings, evidence, sources…" />
        <Chips options={categories} active={cat} onToggle={setCat} />
        <p style={{ fontSize: ".8rem", color: "var(--ink-3)", margin: 0 }}>
          Showing {filtered.length} of {items.length}
        </p>
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        {filtered.map((k) => (
          <article key={k.id} className="card">
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center", marginBottom: ".5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--ink-3)", fontFamily: "ui-monospace, monospace" }}>{k.id}</span>
              <span
                style={{
                  fontSize: ".7rem", fontWeight: 600, color: "var(--accent-2)",
                  border: "1px solid var(--border)", borderRadius: 999, padding: ".1rem .55rem",
                }}
              >
                {k.category}
              </span>
            </div>
            <h2 style={{ fontSize: "1.02rem", fontWeight: 650, margin: "0 0 .45rem", lineHeight: 1.35 }}>{k.topic}</h2>
            <p style={{ fontSize: ".92rem", color: "var(--ink)", margin: "0 0 .6rem", fontWeight: 500 }}>{k.principle}</p>
            <p style={{ fontSize: ".875rem", color: "var(--ink-2)", margin: "0 0 .75rem" }}>{k.detail}</p>
            <p
              style={{
                fontSize: ".85rem", color: "var(--ink)", margin: "0 0 .75rem",
                borderLeft: "3px solid var(--accent)", paddingLeft: ".75rem", fontStyle: "italic",
              }}
            >
              {k.evidence}
            </p>
            <p style={{ fontSize: ".78rem", color: "var(--ink-3)", margin: 0 }}>
              Source:{" "}
              {k.url ? (
                <a href={k.url} target="_blank" rel="noreferrer">
                  {k.source}
                </a>
              ) : (
                k.source
              )}
            </p>
          </article>
        ))}
        {filtered.length === 0 && <p style={{ color: "var(--ink-3)" }}>No findings match that search.</p>}
      </div>
    </>
  );
}
