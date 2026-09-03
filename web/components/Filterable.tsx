"use client";
import { useMemo, useState } from "react";

export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      style={{
        width: "100%", maxWidth: "26rem", padding: ".6rem .85rem",
        border: "1px solid var(--border)", borderRadius: 8,
        background: "var(--bg)", color: "var(--ink)", fontSize: ".9rem",
      }}
    />
  );
}

export function Chips({ options, active, onToggle, allLabel = "All" }: { options: string[]; active: string | null; onToggle: (v: string | null) => void; allLabel?: string }) {
  return (
    <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
      <button
        onClick={() => onToggle(null)}
        style={{
          padding: ".3rem .7rem", borderRadius: 999, fontSize: ".8rem", cursor: "pointer",
          border: "1px solid var(--border)",
          background: active === null ? "var(--accent)" : "transparent",
          color: active === null ? "#fff" : "var(--ink-2)",
        }}
      >
        {allLabel}
      </button>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onToggle(o)}
          style={{
            padding: ".3rem .7rem", borderRadius: 999, fontSize: ".8rem", cursor: "pointer",
            border: "1px solid var(--border)",
            background: active === o ? "var(--accent)" : "transparent",
            color: active === o ? "#fff" : "var(--ink-2)",
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function useFilter<T>(items: T[], fields: (i: T) => string[], categoryOf?: (i: T) => string) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const categories = useMemo(
    () => (categoryOf ? Array.from(new Set(items.map(categoryOf))) : []),
    [items, categoryOf]
  );
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((i) => {
      if (cat && categoryOf && categoryOf(i) !== cat) return false;
      if (!needle) return true;
      return fields(i).some((f) => f.toLowerCase().includes(needle));
    });
  }, [items, q, cat, fields, categoryOf]);
  return { q, setQ, cat, setCat, categories, filtered };
}
