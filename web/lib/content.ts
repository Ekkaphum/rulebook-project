import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import chapterVisuals from "@/data/chapterVisuals.json";
import chapterOpeners from "@/data/chapterOpeners.json";

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

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function chapterFigure(locale: "th" | "en", number: number, kind: "overview" | "recap") {
  const chapter = kind === "overview" ? chapterOpeners[locale][number - 1] : chapterVisuals[locale][number - 1];
  if (!chapter) return "";
  const n = String(number).padStart(2, "0");
  const opener = kind === "overview";
  const folder = opener ? "chapter-openers" : "chapters";
  const summary = opener ? chapterOpeners[locale][number - 1] : null;
  const recap = opener ? null : chapterVisuals[locale][number - 1];
  const alt = summary ? `${summary.focus}: ${summary.topics.join(" • ")}` : recap!.cards.join(" → ");
  const height = opener ? 560 : 420;
  const mobileHeight = opener ? 720 : 520;
  return `<figure class="chapter-visual chapter-${kind}"><picture><source media="(max-width: 620px)" srcset="/images/${folder}/${locale}-${n}-mobile.svg" width="420" height="${mobileHeight}"><img src="/images/${folder}/${locale}-${n}.svg" alt="${escapeHtml(alt)}" width="1000" height="${height}" loading="lazy"></picture><figcaption>${escapeHtml(chapter.caption)}</figcaption></figure>`;
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
    html = html.split(/(?=<h1 id="[^"]+">)/).map((section) => {
      const match = section.match(/^<h1 id="[^"]+">(\d+)\.[\s\S]*?<\/h1>/);
      if (!match) return section;
      const number = Number(match[1]);
      const body = section.slice(match[0].length);
      // Keep the chapter recap inside its chapter, before the Markdown separator.
      const trailingRule = body.match(/((?:\s*<hr\s*\/?>\s*)+)$/i)?.[1] ?? "";
      const content = trailingRule ? body.slice(0, -trailingRule.length) : body;
      return `${match[0]}${chapterFigure(visualLocale, number, "overview")}${content}${chapterFigure(visualLocale, number, "recap")}${trailingRule}`;
    }).join("");
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
