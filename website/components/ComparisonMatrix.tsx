"use client";

export default function ComparisonMatrix() {
  const comparisonRows = [
    {
      dimension: "Structure & Pacing",
      traditional: "Dense multi-volume texts, heavy commentaries",
      socialFeeds: "Algorithmic recommendations, continuous short clips",
      qurus: "Granular Ayah-by-Ayah interface, take 1 verse at a time",
    },
    {
      dimension: "Distraction Level",
      traditional: "Hard to maintain discipline amidst daily hustle",
      socialFeeds: "Aggressive ads, public comments, dopamine notifications",
      qurus: "Zero ads, zero social feeds, zero algorithmic noise",
    },
    {
      dimension: "Audio Experience",
      traditional: "Audio separate from text, difficult to sync",
      socialFeeds: "Requires phone screen active, battery drain",
      qurus: "Line-by-line Arabic + Urdu sync with screen locked",
    },
    {
      dimension: "Personal Reflection",
      traditional: "Margin notes lost on desk paper or easily misplaced",
      socialFeeds: "Public comments, fear of judgment, performative",
      qurus: "100% private written & voice notes stored on your device",
    },
    {
      dimension: "Everyday Mobility",
      traditional: "Requires quiet desk and dedicated study setup",
      socialFeeds: "Requires visual attention and active tapping",
      qurus: "Pocket playback for gym, transit, walking, or bedtime",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-surface/40 border-y border-border-subtle">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            The Alternative Path
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
            Why Qurus is different.
          </h2>
          <p className="mt-3 text-text-secondary text-base leading-relaxed">
            Neither an intimidating 10-volume scholarly syllabus nor a chaotic
            social media feed. A calm, personal third space.
          </p>
        </div>

        {/* Desktop Comparison Table (hidden on mobile, unchanged for desktop) */}
        <div className="hidden md:block overflow-x-auto rounded-3xl border border-border bg-white shadow-2xs">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-border bg-surface text-xs uppercase tracking-wider font-semibold text-text-secondary">
                <th className="py-4 px-6 w-1/4">Experience</th>
                <th className="py-4 px-6 w-1/4 text-text-tertiary">
                  Traditional Study Books
                </th>
                <th className="py-4 px-6 w-1/4 text-text-tertiary">
                  Video Feeds & YouTube
                </th>
                <th className="py-4 px-6 w-1/4 bg-primary-light/60 text-primary font-bold">
                  Qurus Sanctuary
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm">
              {comparisonRows.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-surface/50 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-text-primary">
                    {row.dimension}
                  </td>
                  <td className="py-4 px-6 text-text-secondary">
                    {row.traditional}
                  </td>
                  <td className="py-4 px-6 text-text-secondary">
                    {row.socialFeeds}
                  </td>
                  <td className="py-4 px-6 bg-primary-light/30 font-medium text-primary">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{row.qurus}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Sleek Mobile Cards (md:hidden) */}
        <div className="md:hidden space-y-4">
          {comparisonRows.map((row, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white border border-border shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-text-primary">
                  {row.dimension}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-primary-muted text-primary">
                  Qurus
                </span>
              </div>

              {/* Qurus Highlight Card */}
              <div className="p-3.5 rounded-xl bg-primary-light/70 border border-primary/20 flex items-start gap-2.5 text-xs text-primary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span className="leading-relaxed">{row.qurus}</span>
              </div>

              {/* Alternatives in muted mobile layout */}
              <div className="pt-2 border-t border-border-subtle grid grid-cols-2 gap-3 text-[11px] text-text-secondary">
                <div>
                  <span className="text-[10px] text-text-tertiary block font-semibold mb-0.5">
                    Traditional Books
                  </span>
                  <span className="leading-snug block">{row.traditional}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-tertiary block font-semibold mb-0.5">
                    Social & Video
                  </span>
                  <span className="leading-snug block">{row.socialFeeds}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
