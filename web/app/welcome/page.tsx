import type { Metadata } from "next";
import Landing from "@/components/Landing";

export const metadata: Metadata = {
  title: { absolute: "The Rulebook Project — how to write board game rules people can actually use" },
};

export default function WelcomePage() {
  return <Landing locale="en" />;
}
