import Link from "next/link";

const ACTIVITIES = [
  {
    href: "/kids/words",
    emoji: "🐶",
    title: "First Words",
    description: "Animals, colors, numbers, and more!",
    color: "var(--kids-accent)",
  },
  {
    href: "/kids/alphabet",
    emoji: "🔤",
    title: "ABC Letters",
    description: "Learn the sound of every letter.",
    color: "var(--kids-accent-2)",
  },
  {
    href: "/kids/sight-words",
    emoji: "📖",
    title: "Sight Words",
    description: "The first words to know by heart.",
    color: "var(--kids-accent-4)",
  },
];

export default function KidsHomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16 text-center">
      <p className="text-5xl mb-3">👋</p>
      <h1 className="kids-display text-4xl sm:text-5xl font-bold text-[var(--kids-ink)] mb-3">
        Hi there! What do you want to learn today?
      </h1>
      <p className="text-lg text-[var(--kids-ink-muted)] mb-12">
        Tap a picture to start!
      </p>

      <div className="grid sm:grid-cols-3 gap-6">
        {ACTIVITIES.map((activity) => (
          <Link
            key={activity.href}
            href={activity.href}
            className="animate-kids-pop group flex flex-col items-center gap-3 rounded-[2rem] bg-white p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <span className="text-7xl group-hover:animate-kids-bounce">{activity.emoji}</span>
            <h2 className="kids-display text-2xl font-bold" style={{ color: activity.color }}>
              {activity.title}
            </h2>
            <p className="text-sm text-[var(--kids-ink-muted)]">{activity.description}</p>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm text-[var(--kids-ink-muted)]">
        Are you a bit older?{" "}
        <Link href="/young-learners" className="font-semibold text-[var(--kids-accent-2)] hover:underline">
          Try Young Learners →
        </Link>
      </p>
    </div>
  );
}
