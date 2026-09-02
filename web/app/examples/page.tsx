import { loadJson, type GameEntry } from "@/lib/content";
import ExamplesView from "./ExamplesView";

export const metadata = {
  title: "Rulebooks studied",
  description: "35 rulebooks named as exemplary and 33 named as problematic — with the specific reason and source for each.",
};

export default function ExamplesPage() {
  const praised = loadJson<GameEntry[]>("praised");
  const criticised = loadJson<GameEntry[]>("criticised");
  return (
    <>
      <header style={{ maxWidth: "46rem", marginBottom: "2rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
          Evidence
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 .75rem" }}>
          {praised.length + criticised.length} rulebooks studied
        </h1>
        <p style={{ color: "var(--ink-2)", margin: "0 0 .5rem" }}>
          Named games, the specific thing that was praised or criticised, and a link to whoever said it.
        </p>
        <p style={{ color: "var(--ink-3)", fontSize: ".85rem", margin: 0 }}>
          These are records of what named sources said, not verdicts. A few games appear on both lists — that is not
          an error, it is the state of the argument.
        </p>
      </header>
      <ExamplesView praised={praised} criticised={criticised} />
    </>
  );
}
