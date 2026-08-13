"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { ParentGate } from "@/components/kids/ParentGate";
import { getStars, getSeenSlugs } from "@/lib/kids/storage";
import { KIDS_WORDS } from "@/lib/kids/words";
import { ALPHABET } from "@/lib/kids/alphabet";
import { SIGHT_WORDS } from "@/lib/kids/sightWords";

interface ActivityStat {
  label: string;
  emoji: string;
  seen: number;
  total: number;
  href: string;
  color: string;
}

export default function KidsParentDashboardPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [stats, setStats] = useState<{ stars: number; activities: ActivityStat[] } | null>(null);

  useEffect(() => {
    if (!unlocked) return;
    setStats({
      stars: getStars(),
      activities: [
        {
          label: "First Words",
          emoji: "🐶",
          seen: getSeenSlugs("words").length,
          total: KIDS_WORDS.length,
          href: "/kids/words",
          color: "var(--kids-accent)",
        },
        {
          label: "ABC Letters",
          emoji: "🔤",
          seen: getSeenSlugs("alphabet").length,
          total: ALPHABET.length,
          href: "/kids/alphabet",
          color: "var(--kids-accent-2)",
        },
        {
          label: "Sight Words",
          emoji: "📖",
          seen: getSeenSlugs("sightwords").length,
          total: SIGHT_WORDS.length,
          href: "/kids/sight-words",
          color: "var(--kids-accent-4)",
        },
      ],
    });
  }, [unlocked]);

  if (cancelled) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="kids-display text-xl font-bold text-[var(--kids-ink)]">Come back anytime!</p>
        <Link href="/kids" className="mt-4 inline-block text-[var(--kids-accent)] font-semibold">
          ← Back to Kids Mode
        </Link>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <ParentGate
        onConfirm={() => setUnlocked(true)}
        onCancel={() => setCancelled(true)}
        message="Please solve this to view the parent dashboard."
      />
    );
  }

  const totalSeen = stats?.activities.reduce((sum, a) => sum + a.seen, 0) ?? 0;
  const totalItems = stats?.activities.reduce((sum, a) => sum + a.total, 0) ?? 1;
  const overallPct = Math.round((totalSeen / totalItems) * 100);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href="/kids"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)] mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Kids Mode
      </Link>

      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-1">
          Parent Dashboard
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Your child&apos;s progress</h1>

        <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-5 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--kids-accent-3)]/20">
            <Star className="h-7 w-7 fill-[var(--kids-accent-3)] text-[var(--kids-accent-3)]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stats?.stars ?? 0} stars earned</p>
            <p className="text-sm text-gray-500">
              {overallPct}% of all activities explored ({totalSeen} of {totalItems})
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {stats?.activities.map((activity) => {
            const pct = Math.round((activity.seen / activity.total) * 100);
            return (
              <Link
                key={activity.label}
                href={activity.href}
                className="block rounded-2xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 font-semibold text-gray-800">
                    <span className="text-xl">{activity.emoji}</span>
                    {activity.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {activity.seen} / {activity.total}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: activity.color }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Progress is stored only on this device, in your browser — there&apos;s no account and
          nothing is sent anywhere.
        </p>
      </div>
    </div>
  );
}
