import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import chapterVisuals from "@/data/chapterVisuals.json";

export type Heading = { id: string; text: string; level: number };

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

/** Render a markdown file, injecting stable ids on headings and collecting h1/h2 for a TOC. */
export function renderMarkdown(file: string, visualLocale?: "th" | "en"): { html: string; headings: Heading[] } {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
  const rendered = marked.parse(raw, { gfm: true, async: false }) as string;

  const headings: Heading[] = [];
  const used = new Map<string, number>();

  let html = rendered.replace(
    /<h([1-6])>([\s\S]*?)<\/h\1>/g,
    (_m, lvlStr: string, inner: string) => {
      const level = Number(lvlStr);
      const plain = inner.replace(/<[^>]*>/g, "").trim();
      let id = slugify(plain) || `section-${headings.length}`;
      const n = used.get(id) ?? 0;
      used.set(id, n + 1);
      if (n > 0) id = `${id}-${n}`;
      if (level <= 2) headings.push({ id, text: plain, level });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    }
  );

  if (visualLocale) {
    const visuals = chapterVisuals[visualLocale];
    html = html.replace(/(<h1 id="[^"]+">(\d+)\.[\s\S]*?<\/h1>)/g, (heading, _full, number: string) => {
      const chapter = visuals[Number(number) - 1];
      if (!chapter) return heading;
      const n = number.padStart(2, "0");
      const alt = chapter.cards.join(" → ").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
      return `${heading}<figure class="chapter-visual"><picture><source media="(max-width: 620px)" srcset="/images/chapters/${visualLocale}-${n}-mobile.svg" width="420" height="520"><img src="/images/chapters/${visualLocale}-${n}.svg" alt="${alt}" width="1000" height="420" loading="lazy"></picture><figcaption>${chapter.caption}</figcaption></figure>`;
    });
  }

  return { html, headings };
}

export type Locale = "en" | "th";

export function loadJson<T>(name: string, locale: Locale = "en"): T {
  const dir = locale === "th" ? path.join("data", "th") : "data";
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), dir, `${name}.json`), "utf8"));
}

export type Knowledge = { id: string; category: string; topic: string; principle: string; detail: string; evidence: string; source: string; url: string };
export type GameEntry = { game: string; aspect: string; detail: string; source: string; url: string };
export type SourceRow = { id: string; type: string; title: string; url: string; years: string };
export type CheckItem = { phase: string; item: string; why: string };
export type StyleRule = { area: string; rule: string; do: string; dont: string; source: string; url: string };
export type Metric = { metric: string; value: string; context: string; source: string; url: string };
export type TemplateRow = { source: string; sections: string[] };
