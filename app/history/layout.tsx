import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
  description: "Words you've recently looked up.",
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
