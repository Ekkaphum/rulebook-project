import type { Metadata } from "next";
import RoleForm from "@/components/RoleForm";

export const metadata: Metadata = { title: "Welcome", robots: { index: false } };

export default function OnboardingPage() {
  return <RoleForm locale="en" />;
}
