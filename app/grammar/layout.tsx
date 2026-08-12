import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grammar",
  description: "Browse English grammar points from A1 to C2 — tenses, articles, conditionals, and more.",
};

export default function GrammarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
