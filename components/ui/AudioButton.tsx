"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";

interface AudioButtonProps {
  word: string;
  audioUrl?: string;
  variant?: "US" | "UK";
  label?: string;
}

/**
 * Plays provider-supplied audio when available; otherwise falls back to the
 * browser's SpeechSynthesis API where supported. Never autoplays — always
 * triggered by explicit user action.
 */
export function AudioButton({ word, audioUrl, variant, label }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    if (playing) return;
    setPlaying(true);

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.addEventListener("ended", () => setPlaying(false));
      audio.addEventListener("error", () => {
        setPlaying(false);
        speakFallback();
      });
      audio.play().catch(() => {
        setPlaying(false);
        speakFallback();
      });
      return;
    }

    speakFallback();
  }

  function speakFallback() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = variant === "UK" ? "en-GB" : "en-US";
    utterance.rate = 0.95;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  }

  const accessibleLabel = label ?? `Play ${variant ? variant + " " : ""}pronunciation of ${word}`;

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={accessibleLabel}
      aria-pressed={playing}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 ${
        playing ? "text-accent border-accent" : "text-ink-muted"
      }`}
    >
      <Volume2 className={`h-4 w-4 ${playing ? "animate-pulse" : ""}`} strokeWidth={1.75} aria-hidden="true" />
      {variant && <span className="font-mono text-xs">{variant}</span>}
    </button>
  );
}
