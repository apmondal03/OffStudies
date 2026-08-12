import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Idioms",
  description: "Browse common English idioms with plain-language meanings and examples.",
};

export default function IdiomsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
