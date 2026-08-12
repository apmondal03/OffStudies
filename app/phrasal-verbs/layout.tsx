import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phrasal Verbs",
  description: "Browse common English phrasal verbs with meanings, examples, and separability notes.",
};

export default function PhrasalVerbsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
