"use client";
import { useState, useSyncExternalStore } from "react";
import { ROLES } from "@/lib/roles";

const noop = () => () => {};

const COPY = {
  en: {
    eyebrow: "One quick question",
    title: "What best describes you?",
    lede: "It helps us understand who the handbook is reaching and what to write next. You’ll only be asked once.",
    other: "What do you do?",
    submit: "Continue to the handbook",
    error: "Please choose one option.",
  },
  th: {
    eyebrow: "ขอถามสั้นๆ หนึ่งข้อ",
    title: "คุณคือใครในวงการบอร์ดเกม?",
    lede: "ช่วยให้เรารู้ว่าคู่มือนี้ไปถึงใคร และควรเขียนอะไรต่อ ถามครั้งเดียวเท่านั้น",
    other: "คุณทำอะไร?",
    submit: "ไปอ่านคู่มือกันเลย",
    error: "กรุณาเลือกหนึ่งข้อ",
  },
};

export default function RoleForm({ locale }: { locale: "en" | "th" }) {
  const c = COPY[locale];
  const search = useSyncExternalStore(noop, () => location.search, () => "");
  const params = new URLSearchParams(search);
  const [role, setRole] = useState<string>("");

  return (
    <form action="/api/account/role" method="post" className="role-form">
      <p className="eyebrow">{c.eyebrow}</p>
      <h1>{c.title}</h1>
      <p className="role-lede">{c.lede}</p>
      <input type="hidden" name="next" value={params.get("next") ?? (locale === "th" ? "/th" : "/")} />
      <fieldset>
        <legend className="sr-only">{c.title}</legend>
        {ROLES.map((r) => (
          <label key={r.id} className={role === r.id ? "role-option is-checked" : "role-option"}>
            <input type="radio" name="role" value={r.id} required checked={role === r.id} onChange={() => setRole(r.id)} />
            <span>
              <strong>{r[locale]}</strong>
              <small>{r.hint[locale]}</small>
            </span>
          </label>
        ))}
      </fieldset>
      {role === "other" && (
        <input className="role-other" name="other" maxLength={120} placeholder={c.other} aria-label={c.other} autoFocus />
      )}
      {params.get("error") && <p role="alert" style={{ color: "var(--bad)", fontSize: ".85rem" }}>{c.error}</p>}
      <button type="submit" className="google-btn google-btn-lg" disabled={!role}>{c.submit} →</button>
    </form>
  );
}
