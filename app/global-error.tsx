"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#f5f4ef] text-[#1a1e1b]">
        <div className="mx-auto max-w-md px-6 text-center">
          <AlertTriangle className="mx-auto h-9 w-9 text-[#9c4646]" strokeWidth={1.5} />
          <h1 className="mt-5 text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-[#5c6560]">
            We hit an unexpected error. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-[#2f5d46] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#234433] transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
