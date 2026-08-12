import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore the Core 3000",
  description: "Browse the 3,000 most essential English words, filterable by CEFR level and part of speech.",
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
