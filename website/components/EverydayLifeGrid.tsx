"use client";

interface Moment {
  iconSvg: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  featureBenefit: string;
}

const MOMENTS: Moment[] = [
  {
    tag: "Physical Training",
    title: "At the Gym Lifting Weights",
    description:
      "When resting between heavy sets or warming up on the treadmill, keep your phone safely in your pocket. Persistent media controls let you play, pause, or loop verses directly from your smartwatch or lock screen.",
    featureBenefit: "Lock-screen audio controls • Screen-off background playback",
    iconSvg: (
      <svg
        className="w-5 h-5 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
      </svg>
    ),
  },
  {
    tag: "Daily Transit",
    title: "Commuting on the Train or Metro",
    description:
      "Instead of reflexively doomscrolling social feeds when waiting for your stop, plug in your earbuds. Hear the original Arabic recitation immediately paired with spoken Urdu translation, one verse at a time.",
    featureBenefit: "Synchronized bilingual audio • 0.75x–1.5x speed options",
    iconSvg: (
      <svg
        className="w-5 h-5 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3M8 15h.01M16 15h.01" />
      </svg>
    ),
  },
  {
    tag: "Fresh Air",
    title: "Evening Walks in the Breeze",
    description:
      "Take an unhurried stroll around your neighborhood after work. Let a single verse repeat gently on a loop so you can ponder its wording, question its context, and let ideas settle naturally.",
    featureBenefit: "Verse loop mode • Zero notifications • Zero ads",
    iconSvg: (
      <svg
        className="w-5 h-5 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M13 4v16M17 8l-4-4-4 4M17 16l-4 4-4-4" />
      </svg>
    ),
  },
  {
    tag: "Quiet Hours",
    title: "Late Night Desk or Bedside Reflection",
    description:
      "When the house is silent, explore without pressure. Attach private questions, doubts, and personal insights right next to the text. Record a quick voice note when typing feels too formal.",
    featureBenefit: "100% on-device private notes • Voice reflections",
    iconSvg: (
      <svg
        className="w-5 h-5 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
];

export default function EverydayLifeGrid() {
  return (
    <section id="everyday-life" className="py-20 md:py-28 bg-canvas">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Everyday Rhythms
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
            Engineered for where life actually happens.
          </h2>
          <p className="mt-3 text-text-secondary text-base leading-relaxed">
            Spiritual exploration shouldn’t require rigid hours at a heavy desk.
            Qurus lives unobtrusively in your pocket, ready whenever you have a
            free moment.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {MOMENTS.map((moment, i) => (
            <div
              key={i}
              className="group p-7 sm:p-8 rounded-3xl bg-surface/80 hover:bg-surface border border-border hover:border-primary/40 transition-all duration-300 shadow-2xs hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-border flex items-center justify-center shadow-xs">
                    {moment.iconSvg}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-border text-text-secondary">
                    {moment.tag}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-text-primary mb-2.5">
                  {moment.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 font-normal">
                  {moment.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center gap-2 text-xs font-medium text-primary">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{moment.featureBenefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
