export const metadata = {
  title: "Downloads",
  description: "Download the handbook, the Thai ebook and the full research database.",
};

const FILES = [
  {
    href: "/downloads/how-to-create-a-good-rulebook.docx",
    title: "How to Create a Good Rulebook",
    sub: "Word document · ~17,000 words",
    desc: "The full practitioner’s handbook: seven parts covering foundations, architecture, craft, production, process, evidence and templates. Includes the master rulebook skeleton, a style-guide worksheet, a blind-playtest protocol and the pre-print checklist.",
  },
  {
    href: "/downloads/rulebook-ebook-th.docx",
    title: "เขียน Rulebook ให้คนอยากอ่าน",
    sub: "Word document · ฉบับภาษาไทย",
    desc: "เวอร์ชันภาษาไทย เขียนแบบไม่เป็นทางการ เหมือนแชร์ความรู้กันมากกว่าเป็นตำรา สำหรับนักออกแบบทั้งมือใหม่และมือเก๋า มีทั้งหลักการ ตัวอย่างจริง แบบฟอร์ม และเช็กลิสต์",
  },
  {
    href: "/downloads/rulebook-research-database.xlsx",
    title: "Rulebook Research Database",
    sub: "Excel workbook · 10 sheets",
    desc: "The complete research data: 106 sources with clickable URLs, 127 findings with citations, 68 rulebooks praised and criticised, 10 section templates, 26 style rules, the 46-item checklist, 16 quantitative reference points, and the failure taxonomy.",
  },
];

export default function DownloadsPage() {
  return (
    <>
      <header style={{ maxWidth: "46rem", marginBottom: "2.5rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
          Take it with you
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 .75rem" }}>
          Downloads
        </h1>
        <p style={{ color: "var(--ink-2)", margin: 0 }}>
          Everything on this site, as files you can keep, edit and hand to a collaborator.
        </p>
      </header>

      <div style={{ display: "grid", gap: "1rem", maxWidth: "50rem" }}>
        {FILES.map((f) => (
          <a
            key={f.href}
            href={f.href}
            download
            className="card"
            style={{ display: "block", color: "inherit", textDecoration: "none" }}
          >
            <h2 style={{ fontSize: "1.05rem", fontWeight: 650, margin: "0 0 .25rem", color: "var(--accent-2)" }}>{f.title} ↓</h2>
            <div style={{ fontSize: ".78rem", color: "var(--ink-3)", marginBottom: ".6rem" }}>{f.sub}</div>
            <p style={{ fontSize: ".88rem", color: "var(--ink-2)", margin: 0 }}>{f.desc}</p>
          </a>
        ))}
      </div>

      <section className="card" style={{ marginTop: "2.5rem", maxWidth: "50rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 650, margin: "0 0 .6rem" }}>Reuse</h2>
        <p style={{ fontSize: ".86rem", color: "var(--ink-2)", margin: "0 0 .5rem" }}>
          These documents summarise and attribute their sources rather than reproducing them. Michael “Curby” Lee’s{" "}
          <a href="https://cur.by/styleguide">Board Game Editing Style Guide</a> is licensed CC&nbsp;BY-NC-SA, and the
          material derived from it is attributed throughout.
        </p>
        <p style={{ fontSize: ".86rem", color: "var(--ink-2)", margin: 0 }}>
          If you use this material in your own work, please link back to the original sources — they did the hard
          part.
        </p>
      </section>
    </>
  );
}
