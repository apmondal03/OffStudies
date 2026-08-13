import type { Metadata } from "next";
import { KidsHeader } from "@/components/kids/KidsHeader";

export const metadata: Metadata = {
  title: {
    default: "Lexicon Kids — Learn to Read and Speak",
    template: "%s | Lexicon Kids",
  },
  description: "A fun, audio-first way for young children to learn first words, letters, and sight words.",
};

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="kids-mode min-h-screen">
      <KidsHeader />
      <main>{children}</main>
    </div>
  );
}
