import type { Metadata } from "next";
import { YoungHeader } from "@/components/youngLearners/YoungHeader";

export const metadata: Metadata = {
  title: {
    default: "Lexicon Learners — English Practice for Young Readers",
    template: "%s | Lexicon Learners",
  },
  description: "Sight words and simple grammar practice for young readers, ages 7-12.",
};

export default function YoungLearnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="young-mode min-h-screen">
      <YoungHeader />
      <main>{children}</main>
    </div>
  );
}
