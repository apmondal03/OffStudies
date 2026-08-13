"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface KidsWordCardProps {
  headline: string;
  visual?: string;
  sentence?: string;
  speakText?: string;
  accentColor?: string;
}

export function KidsWordCard({
  headline,
  visual,
  sentence,
  speakText,
  accentColor = "var(--kids-accent)",
}: KidsWordCardProps) {
  const [muted, setMuted] = useState(false);

  function speak(text: string, isMuted: boolean) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    // Audio-first by design: for pre-readers, hearing the word the instant
    // it appears is the core of the experience, not an optional extra —
    // this is the one deliberate exception to the app's "never autoplay"
    // rule elsewhere, matched by an always-visible mute toggle.
    const text = speakText ?? [headline, sentence].filter(Boolean).join(". ");
    const timeout = setTimeout(() => speak(text, muted), 300);
    return () => {
      clearTimeout(timeout);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headline]);

  function handleReplay() {
    const text = speakText ?? [headline, sentence].filter(Boolean).join(". ");
    speak(text, muted);
  }

  return (
    <div className="relative flex flex-col items-center text-center">
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute" : "Mute"}
        aria-pressed={muted}
        className="absolute -top-2 -right-2 rounded-full bg-white p-2.5 shadow-md text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)]"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {visual && (
        <button
          type="button"
          onClick={handleReplay}
          aria-label={`Say ${headline} again`}
          className="text-[7rem] sm:text-[9rem] leading-none mb-4 animate-kids-bounce cursor-pointer select-none"
        >
          {visual}
        </button>
      )}

      <button
        type="button"
        onClick={handleReplay}
        className="kids-display text-5xl sm:text-6xl font-bold tracking-tight cursor-pointer"
        style={{ color: accentColor }}
        aria-label={`Say ${headline} again`}
      >
        {headline}
      </button>

      {sentence && (
        <p className="mt-4 text-xl sm:text-2xl text-[var(--kids-ink-muted)] max-w-md">{sentence}</p>
      )}
    </div>
  );
}
