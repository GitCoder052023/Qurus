"use client";

export default function FeatureDeepDives() {
  const features = [
    {
      title: "Granular Ayah-by-Ayah Interface",
      subtitle: "Every verse is its own space.",
      description:
        "Instead of feeling intimidated by an entire chapter, every single verse stands independently. Tap any ayah to inspect its translation, repeat it on a loop, highlight it with gentle amber tones, or bookmark it for future contemplation.",
      badge: "Focused Reading",
      icon: (
        <svg
          className="w-6 h-6 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      bullets: [
        "Isolate individual verses to eliminate visual clutter",
        "Adjustable Arabic font sizes (22pt to 34pt)",
        "Adjustable Urdu font sizes (13pt to 19pt)",
      ],
    },
    {
      title: "Synchronized Bilingual Recitation",
      subtitle: "Hear the meaning right after the word.",
      description:
        "Qurus pairs the original Arabic recitation with line-by-line spoken Urdu translation. When an ayah finishes recitation, Shamshad Ali Khan's clear Urdu translation recites immediately before moving to the next verse.",
      badge: "Bilingual Audio",
      icon: (
        <svg
          className="w-6 h-6 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ),
      bullets: [
        "Multiple renowned reciters: Mishary Alafasy, Abdul Basit, Al-Husary, Al-Shatri, Al-Ghamdi",
        "Three playback modes: Arabic + Urdu, Arabic Only, or Urdu Only",
        "Speed controls: 0.75x, 1.0x, 1.25x, and 1.5x",
      ],
    },
    {
      title: "Private Written & Spoken Voice Notes",
      subtitle: "100% on your device. Never uploaded.",
      description:
        "Your questions, reflections, and deepest thoughts belong to you. Attach written notes or speak a quick voice reflection right next to any verse. Because Qurus has no user accounts, your notes physically never leave your device.",
      badge: "Absolute Privacy",
      icon: (
        <svg
          className="w-6 h-6 text-note"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      ),
      bullets: [
        "Record spoken voice reflections when typing is inconvenient",
        "Zero account creation required — no email, no password",
        "No cloud synchronization or data harvesting",
      ],
    },
    {
      title: "Quiet Daily Consistency",
      subtitle: "Building habits without pressure or guilt.",
      description:
        "Qurus welcomes you with time-aware greetings that softly shift throughout the day. A gentle streak tracker reminds you of your consistency without aggressive streaks or gamified punishment.",
      badge: "Mindful Rhythm",
      icon: (
        <svg
          className="w-6 h-6 text-accent-gold"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      bullets: [
        "Contextual greetings: Dawn, Morning, Midday, Evening, and Night",
        "One-tap resume to jump back to where you left off",
        "Zero notification spam or guilt-inducing alerts",
      ],
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-canvas">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Designed With Intention
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
            Thoughtful details. Honest craft.
          </h2>
          <p className="mt-3 text-text-secondary text-base leading-relaxed">
            Every screen and interaction was built to remove friction between you
            and the words.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-border shadow-2xs hover:shadow-xs hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-text-primary mb-1">
                  {feat.title}
                </h3>
                <h4 className="text-sm font-medium text-primary mb-3.5">
                  {feat.subtitle}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {feat.description}
                </p>
              </div>

              <ul className="space-y-2.5 pt-6 border-t border-border-subtle">
                {feat.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-center gap-2.5 text-xs text-text-secondary font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
