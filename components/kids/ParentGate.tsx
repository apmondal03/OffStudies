"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ParentGateProps {
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ParentGate({ onConfirm, onCancel, message = "Please solve this to leave Kids Mode." }: ParentGateProps) {
  const [a] = useState(() => randomInt(3, 9));
  const [b] = useState(() => randomInt(2, 8));
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (Number(answer) === a + b) {
      onConfirm();
    } else {
      setError(true);
      setAnswer("");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="parent-gate-title"
    >
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <h2 id="parent-gate-title" className="kids-display text-xl font-bold text-[#2b2540]">
            Grown-ups only
          </h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel"
            className="rounded-full p-1 text-[#6b6485] hover:bg-[#fef6e4]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-sm text-[#6b6485]">
          {message}
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="parent-gate-answer" className="block text-center text-2xl font-semibold text-[#2b2540] mb-4">
            {a} + {b} = ?
          </label>
          <input
            id="parent-gate-answer"
            type="number"
            inputMode="numeric"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError(false);
            }}
            autoFocus
            className={`w-full rounded-2xl border-2 px-4 py-3 text-center text-xl outline-none ${
              error ? "border-[#ff6b6b]" : "border-[#f3d9a8] focus:border-[#4ecdc4]"
            }`}
          />
          {error && <p className="mt-2 text-center text-sm text-[#ff6b6b]">Not quite — try again.</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-[#4ecdc4] py-3 text-lg font-bold text-white hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
