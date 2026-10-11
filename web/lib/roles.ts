/** The reader roles asked for once, after the first sign-in. */
export const ROLES = [
  { id: "designer", en: "Game designer", th: "นักออกแบบเกม", hint: { en: "Designing my own game", th: "กำลังออกแบบเกมของตัวเอง" } },
  { id: "publisher", en: "Publisher / producer", th: "สำนักพิมพ์ / ผู้ผลิตเกม", hint: { en: "Bringing games to market", th: "ผลิตและจัดจำหน่ายเกม" } },
  { id: "editor", en: "Rules writer / editor", th: "นักเขียนหรือบรรณาธิการกฎ", hint: { en: "Writing, editing or translating rules", th: "เขียน ตรวจ หรือแปลกฎเกม" } },
  { id: "graphic", en: "Graphic designer / illustrator", th: "กราฟิกดีไซเนอร์ / นักวาด", hint: { en: "Layout, icons and art", th: "จัดหน้า ไอคอน และภาพประกอบ" } },
  { id: "player", en: "Player / reviewer", th: "ผู้เล่น / รีวิวเวอร์", hint: { en: "I play, teach or review games", th: "เล่น สอน หรือรีวิวเกม" } },
  { id: "education", en: "Teacher / student / researcher", th: "ครู / นักเรียน / นักวิจัย", hint: { en: "Learning or teaching game design", th: "เรียนหรือสอนการออกแบบเกม" } },
  { id: "other", en: "Something else", th: "อื่นๆ", hint: { en: "Tell us in a few words", th: "บอกเราสั้นๆ" } },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];

export const isRole = (v: unknown): v is RoleId => ROLES.some((r) => r.id === v);

export function roleLabel(id: string | null, locale: "en" | "th" = "th") {
  return ROLES.find((r) => r.id === id)?.[locale] ?? "—";
}
