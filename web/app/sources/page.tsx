import { loadJson, type SourceRow } from "@/lib/content";
import SourcesTable from "./SourcesTable";

export const metadata = {
  title: "Sources",
  description: "All 106 primary sources harvested for this project, with clickable URLs.",
};

export default function SourcesPage() {
  const sources = loadJson<SourceRow[]>("sources");
  return (
    <>
      <header style={{ maxWidth: "46rem", marginBottom: "2rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
          Provenance
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 .75rem" }}>
          {sources.length} sources
        </h1>
        <p style={{ color: "var(--ink-2)", margin: "0 0 .5rem" }}>
          Everything harvested for this project. BoardGameGeek pages were retrieved through a text-extraction proxy,
          because BGG serves a Cloudflare challenge to automated clients and its XML API now returns 401 for
          anonymous forum and geeklist requests.
        </p>
        <p style={{ color: "var(--ink-3)", fontSize: ".85rem", margin: 0 }}>
          Reddit is absent because it blocks automated access. The “years” column shows post dates found inside each
          thread, which is a rough guide to when the discussion happened.
        </p>
      </header>
      <SourcesTable rows={sources} />
    </>
  );
}
