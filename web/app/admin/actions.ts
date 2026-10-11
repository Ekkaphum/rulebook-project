"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function setBlocked(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id"));
  const block = formData.get("block") === "1";
  const reason = String(formData.get("reason") ?? "").slice(0, 300) || null;
  if (id === admin.sub) return; // never lock yourself out
  if (block) {
    await db()`update users set blocked = true, blocked_at = now(), blocked_reason = ${reason} where id = ${id}`;
  } else {
    await db()`update users set blocked = false, blocked_at = null, blocked_reason = null where id = ${id}`;
  }
  revalidatePath("/admin");
  revalidatePath(`/admin/users/${id}`);
}
