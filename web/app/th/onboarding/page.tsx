import type { Metadata } from "next";
import RoleForm from "@/components/RoleForm";

export const metadata: Metadata = { title: "ยินดีต้อนรับ", robots: { index: false } };

export default function Page() {
  return <RoleForm locale="th" />;
}
