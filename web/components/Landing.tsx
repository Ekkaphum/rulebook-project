import Link from "next/link";
import { handbookSample, loadJson, type Locale, type Knowledge, type GameEntry, type SourceRow } from "@/lib/content";
import SignInButton from "@/components/SignInButton";

const COPY = {
  en: {
    eyebrow: "Board game rulebooks",
    title: "How to write rules people can actually use",
    lede: (n: number) =>
      `Everyone complains about rulebooks. Almost nobody teaches how to write one. This is a handbook synthesised from ${n} primary sources, with every claim linked back to where it came from.`,
    cta: "Continue with Google",
    free: "Free, always. Sign in once to unlock the full handbook, the research database, the checklist and every download.",
    consent: ["By signing in you agree that we keep your name, email and what you read on this site, as described in our ", "privacy notice", "."],
    stats: ["primary sources", "findings, each with a citation", "rulebooks studied", "topic areas"],
    unlockTitle: "What you unlock",
    unlock: (k: number, g: number, s: number) => [
      { t: "The full handbook", d: "17,000 words across seven parts — foundations, architecture, craft, production, process, evidence and templates." },
      { t: `All ${k} findings`, d: "The research database, filterable and searchable, with a source link on every row." },
      { t: `${g} real rulebooks`, d: "What the community praises and condemns — named games, specific reasons, linked sources." },
      { t: "Pre-print checklist", d: "46 checks across 8 phases, plus style rules, metrics and structure templates." },
      { t: `${s} sources`, d: "Every document harvested for the project, with clickable URLs." },
      { t: "Word & Excel downloads", d: "The handbook as .docx and the 10-sheet research database as .xlsx, in English and Thai." },
    ],
    sampleEyebrow: "Free sample",
    sampleTitle: "Chapter 1 — Why the rulebook is not paperwork",
    sampleMore: "Sign in to keep reading — it’s free",
    pillarsTitle: "Eight things that matter most",
    pillarsLede: (n: number) => `Distilled from all ${n} findings. The handbook explains each one, with sources.`,
    pillars: [
      ["State the goal before the rules", "Readers who know the objective can attach every later rule to a purpose."],
      ["Never use a term before you define it", "The single most-cited reader irritation across fifteen years of forum threads."],
      ["One concept, one word, forever", "Synonyms make readers hunt for differences that don’t exist."],
      ["Conditions before effects", "“If you roll a 5 or higher, draw a card” — skimmers skip effects whose condition isn’t met."],
      ["Examples resolve ambiguity, not the obvious", "Illustrate the move that would otherwise become a forum thread."],
      ["Never hide a rule in an example", "Re-readers skip examples by design. A rule placed there is invisible."],
      ["Put rules where a confused player will look", "Organisation is a retrieval problem, not only a teaching one."],
      ["Blind test — and do not help them", "Intervening trains testers to look at you instead of the page."],
    ],
    examplesTitle: "Rulebooks the community praises",
    examplesMore: (n: number) => `+ ${n} more praised and criticised rulebooks after you sign in`,
    faqTitle: "Questions",
    faq: [
      ["Does it cost anything?", "No. Signing in is free and there is no paid tier. We ask you to sign in so we know who the material is reaching and which parts are useful."],
      ["What do you keep?", "Your Google name, email and profile picture, your approximate country, and which pages and chapters you open. Nothing is sold or shared with advertisers."],
      ["Can I delete my account?", "Yes — from the account menu, at any time. Your account and reading history are erased immediately."],
    ],
    finalTitle: "Ready to read the whole thing?",
    privacy: "/privacy",
  },
  th: {
    eyebrow: "rulebook บอร์ดเกม",
    title: "เขียนกฎให้คนใช้งานได้จริง",
    lede: (n: number) =>
      `ทุกคนบ่นเรื่อง rulebook แต่แทบไม่มีใครสอนว่าเขียนยังไง นี่คือคู่มือที่สังเคราะห์จากแหล่งข้อมูลปฐมภูมิ ${n} แหล่ง ทุกข้อความมีลิงก์กลับไปหาต้นทาง`,
    cta: "เข้าสู่ระบบด้วย Google",
    free: "ฟรีตลอด ล็อกอินครั้งเดียวเพื่อปลดล็อกคู่มือฉบับเต็ม ฉบับเล่าสู่กันฟัง ฐานข้อมูลงานวิจัย เช็กลิสต์ และไฟล์ดาวน์โหลดทั้งหมด",
    consent: ["เมื่อเข้าสู่ระบบ คุณยินยอมให้เราเก็บชื่อ อีเมล และหน้าที่คุณอ่านบนเว็บนี้ ตามที่อธิบายไว้ใน", "ประกาศความเป็นส่วนตัว", ""],
    stats: ["แหล่งข้อมูลปฐมภูมิ", "องค์ความรู้ พร้อมการอ้างอิง", "rulebook ที่ศึกษา", "หมวดหัวข้อ"],
    unlockTitle: "สิ่งที่คุณจะได้อ่าน",
    unlock: (k: number, g: number, s: number) => [
      { t: "คู่มือฉบับเต็ม + ฉบับเล่าสู่กันฟัง", d: "เจ็ดภาค ตั้งแต่พื้นฐานถึง template ที่ใช้ได้ทันที และฉบับเขียนแบบสบายๆ อ่านรวดเดียวจบ" },
      { t: `องค์ความรู้ทั้ง ${k} ข้อ`, d: "ฐานข้อมูลงานวิจัย กรองตามหมวดและค้นหาได้ พร้อมลิงก์แหล่งที่มาทุกแถว" },
      { t: `rulebook จริง ${g} เล่ม`, d: "อะไรที่ชุมชนชื่นชมและวิจารณ์ — ชื่อเกมจริง เหตุผลเจาะจง ลิงก์แหล่งที่มา" },
      { t: "เช็กลิสต์ก่อนพิมพ์", d: "46 ข้อใน 8 ระยะ พร้อมกฎการเขียน ตัวเลขอ้างอิง และ template โครงสร้าง" },
      { t: `แหล่งข้อมูล ${s} ชิ้น`, d: "เอกสารทุกชิ้นที่เก็บมาสำหรับโปรเจกต์นี้ พร้อม URL ที่คลิกได้" },
      { t: "ไฟล์ Word และ Excel", d: "คู่มือเป็น .docx และฐานข้อมูล 10 ชีตเป็น .xlsx ทั้งภาษาไทยและอังกฤษ" },
    ],
    sampleEyebrow: "ทดลองอ่านฟรี",
    sampleTitle: "บทที่ 1 — ทำไม rulebook ไม่ใช่งานเอกสาร",
    sampleMore: "ล็อกอินเพื่ออ่านต่อ — ฟรี",
    pillarsTitle: "แปดเรื่องที่สำคัญที่สุด",
    pillarsLede: (n: number) => `กลั่นจากองค์ความรู้ทั้ง ${n} ข้อ คู่มือฉบับเต็มอธิบายทุกข้อพร้อมแหล่งที่มา`,
    pillars: [
      ["บอกเป้าหมายก่อนบอกกฎ", "ผู้อ่านที่รู้เป้าหมายจะผูกกฎทุกข้อเข้ากับจุดประสงค์ได้"],
      ["ห้ามใช้คำก่อนนิยามคำนั้น", "สิ่งที่ผู้อ่านบ่นบ่อยที่สุดตลอดสิบห้าปีของเธรดในฟอรั่ม"],
      ["หนึ่งแนวคิด หนึ่งคำ ตลอดไป", "คำพ้องบังคับให้คนค้นหาความต่างที่ไม่มีอยู่จริง"],
      ["เงื่อนไขมาก่อนผลลัพธ์", "“ถ้าคุณทอยได้ 5 ขึ้นไป จั่วการ์ด” — คนอ่านผ่านๆ ข้ามผลที่เงื่อนไขไม่เข้าได้"],
      ["ตัวอย่างมีไว้แก้ความกำกวม", "ให้แสดงการเล่นที่ไม่งั้นจะกลายเป็นกระทู้ในฟอรั่ม"],
      ["ห้ามซ่อนกฎในตัวอย่าง", "คนอ่านซ้ำข้ามตัวอย่างโดยธรรมชาติ กฎที่วางตรงนั้นจึงล่องหน"],
      ["วางกฎไว้ที่คนงงจะเปิดหา", "การจัดโครงสร้างคือปัญหาการค้นหา ไม่ใช่แค่การสอน"],
      ["Blind test — แล้วห้ามช่วยเขา", "การเข้าไปแทรกฝึกให้ผู้ทดสอบมองหน้าคุณแทนกระดาษ"],
    ],
    examplesTitle: "rulebook ที่ชุมชนชื่นชม",
    examplesMore: (n: number) => `+ อีก ${n} เล่ม ทั้งที่ถูกชมและถูกวิจารณ์ หลังล็อกอิน`,
    faqTitle: "คำถามที่พบบ่อย",
    faq: [
      ["เสียเงินไหม?", "ไม่เสีย การล็อกอินฟรีและไม่มีแพ็กเกจเสียเงิน เราขอให้ล็อกอินเพื่อรู้ว่าเนื้อหาไปถึงใคร และส่วนไหนมีประโยชน์จริง"],
      ["เก็บข้อมูลอะไรบ้าง?", "ชื่อ อีเมล และรูปโปรไฟล์จาก Google ประเทศโดยประมาณ และหน้ากับบทที่คุณเปิดอ่าน ไม่มีการขายหรือแชร์ให้ผู้โฆษณา"],
      ["ลบบัญชีได้ไหม?", "ได้ — จากเมนูบัญชีได้ทุกเมื่อ บัญชีและประวัติการอ่านของคุณจะถูกลบทันที"],
    ],
    finalTitle: "พร้อมอ่านฉบับเต็มแล้วหรือยัง?",
    privacy: "/th/privacy",
  },
};

export default function Landing({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const knowledge = loadJson<Knowledge[]>("knowledge", locale);
  const praised = loadJson<GameEntry[]>("praised", locale);
  const criticised = loadJson<GameEntry[]>("criticised", locale);
  const sources = loadJson<SourceRow[]>("sources", locale);
  const categories = new Set(knowledge.map((k) => k.category)).size;
  const games = praised.length + criticised.length;
  const stats = [sources.length, knowledge.length, games, categories];
  const sample = handbookSample(locale);
  const n = String(1).padStart(2, "0");

  return (
    <div className="landing">
      <section className="landing-hero">
        <div>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p className="landing-lede">{c.lede(sources.length)}</p>
          <SignInButton locale={locale} label={c.cta} large showError />
          <p className="landing-free">{c.free}</p>
          <p className="landing-consent">
            {c.consent[0]}<Link href={c.privacy}>{c.consent[1]}</Link>{c.consent[2]}
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="landing-art" src={`/images/chapter-scenes/${locale}-${n}.jpg`} alt="" />
      </section>

      <section className="landing-stats">
        {stats.map((v, i) => (
          <div key={c.stats[i]}>
            <strong>{v}</strong>
            <span>{c.stats[i]}</span>
          </div>
        ))}
      </section>

      <section className="landing-section">
        <h2>{c.unlockTitle}</h2>
        <div className="landing-grid">
          {c.unlock(knowledge.length, games, sources.length).map((u) => (
            <div key={u.t} className="card landing-locked">
              <h3><span aria-hidden="true">🔒</span> {u.t}</h3>
              <p>{u.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <p className="eyebrow">{c.sampleEyebrow}</p>
        <h2>{c.sampleTitle}</h2>
        <div className="landing-sample">
          <div className="prose" dangerouslySetInnerHTML={{ __html: sample }} />
          <div className="landing-sample-fade">
            <SignInButton locale={locale} label={c.sampleMore} />
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2>{c.pillarsTitle}</h2>
        <p className="landing-sub">{c.pillarsLede(knowledge.length)}</p>
        <div className="landing-grid">
          {c.pillars.map(([t, d], i) => (
            <div key={t} className="card">
              <div className="landing-num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <h2>{c.examplesTitle}</h2>
        <div className="landing-grid">
          {praised.slice(0, 3).map((g) => (
            <div key={g.game} className="card">
              <h3>{g.game}</h3>
              <p style={{ color: "var(--good)", fontWeight: 600, fontSize: ".8rem", margin: "0 0 .35rem" }}>{g.aspect}</p>
              <p>{g.detail}</p>
            </div>
          ))}
        </div>
        <p className="landing-sub" style={{ marginTop: "1rem" }}>{c.examplesMore(games - 3)}</p>
      </section>

      <section className="landing-section" style={{ maxWidth: "46rem" }}>
        <h2>{c.faqTitle}</h2>
        {c.faq.map(([q, a]) => (
          <details key={q} className="landing-faq">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      <section className="card landing-final">
        <h2>{c.finalTitle}</h2>
        <SignInButton locale={locale} label={c.cta} large />
      </section>
    </div>
  );
}
