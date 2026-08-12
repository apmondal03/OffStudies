import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Words",
  description: "Words you've saved to review later, plus your Core 3000 progress.",
};

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
