import type { Metadata } from "next";
import Landing from "@/components/Landing";

export const metadata: Metadata = {
  title: "เขียนกฎบอร์ดเกมให้คนใช้งานได้จริง",
  description: "คู่มือเรื่องการเขียน rulebook บอร์ดเกม สังเคราะห์จากแหล่งข้อมูลปฐมภูมิ 106 แหล่ง พร้อมลิงก์แหล่งที่มาทุกข้อความ",
};

export default function Page() {
  return <Landing locale="th" />;
}
