import type { Locale } from "./content";

export type Dict = {
  nav: { handbook: string; principles: string; examples: string; checklist: string; sources: string; downloads: string; ebook?: string };
  brand: string;
  footerA: string;
  footerB: string;
  footerPrivacy: [string, string, string];
  search: { findings: string; games: string; sources: string };
  showing: (a: number, b: number) => string;
  all: string;
  none: string;
  source: string;
  open: string;
};

export const DICT: Record<Locale, Dict> = {
  en: {
    nav: { handbook: "Handbook", principles: "Principles", examples: "Examples", checklist: "Checklist", sources: "Sources", downloads: "Downloads" },
    brand: "The Rulebook Project",
    footerA:
      "Synthesised from 106 primary sources — BoardGameGeek forums and blogs, publisher style guides, professional rules editors, and the accessibility literature. Every claim on this site links back to its source.",
    footerB:
      "Michael “Curby” Lee’s Board Game Editing Style Guide is CC BY-NC-SA; material derived from it is attributed throughout. All other sources are summarised and attributed, not reproduced.",
    footerPrivacy: ["This site uses privacy-friendly, cookie-free audience analytics. See our ", "privacy notice", "."],
    search: { findings: "Search findings, evidence, sources…", games: "Search games, failure modes, sources…", sources: "Search titles and URLs…" },
    showing: (a, b) => `Showing ${a} of ${b}`,
    all: "All",
    none: "Nothing matches that search.",
    source: "Source",
    open: "Open",
  },
  th: {
    nav: { handbook: "คู่มือ", principles: "องค์ความรู้", examples: "ตัวอย่างจริง", checklist: "เช็กลิสต์", sources: "แหล่งข้อมูล", downloads: "ดาวน์โหลด", ebook: "ฉบับเล่าสู่กันฟัง" },
    brand: "โปรเจกต์ Rulebook",
    footerA:
      "สังเคราะห์จากแหล่งข้อมูลปฐมภูมิ 106 แหล่ง — ฟอรั่มและบล็อกบน BoardGameGeek, style guide ของสำนักพิมพ์, บรรณาธิการ rulebook อาชีพ และงานเขียนด้านการเข้าถึง ทุกข้อความบนเว็บนี้มีลิงก์กลับไปหาต้นทาง",
    footerB:
      "Board Game Editing Style Guide ของ Michael “Curby” Lee ใช้สัญญาอนุญาต CC BY-NC-SA เนื้อหาที่ต่อยอดจากมันถูกอ้างอิงไว้ตลอดทั้งเว็บ แหล่งอื่นทั้งหมดถูกสรุปและอ้างอิง ไม่ได้คัดลอกมาทั้งชิ้น",
    footerPrivacy: ["เว็บนี้ใช้ระบบวิเคราะห์ผู้เข้าชมที่เป็นมิตรกับความเป็นส่วนตัวและไม่ใช้คุกกี้ ดูรายละเอียดได้ที่", "ประกาศความเป็นส่วนตัว", ""],
    search: { findings: "ค้นหาองค์ความรู้ หลักฐาน แหล่งที่มา…", games: "ค้นหาเกม รูปแบบความล้มเหลว แหล่งที่มา…", sources: "ค้นหาชื่อเอกสารและ URL…" },
    showing: (a, b) => `แสดง ${a} จาก ${b}`,
    all: "ทั้งหมด",
    none: "ไม่พบรายการที่ตรงกับคำค้น",
    source: "แหล่งที่มา",
    open: "เปิด",
  },
};

export function base(locale: Locale) {
  return locale === "th" ? "/th" : "";
}
