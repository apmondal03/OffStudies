import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Stream",
  description: "An ambient way to learn vocabulary — a new word arrives automatically, on your schedule.",
};

export default function StreamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
