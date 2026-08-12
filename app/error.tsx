"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <AlertTriangle className="mx-auto h-9 w-9 text-danger" strokeWidth={1.5} />
      <h1 className="mt-5 font-display text-2xl">Something went wrong</h1>
      <p className="mt-2 text-ink-muted">We hit an unexpected error loading this page.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-contrast hover:bg-accent-strong transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
