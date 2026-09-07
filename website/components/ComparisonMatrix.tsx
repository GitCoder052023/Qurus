"use client";

import { motion } from "motion/react";

const comparisonRows = [
  { dimension: "Understanding", traditional: "Deep, but harder to fit into a busy day", socialFeeds: "Disconnected clips and captions", qurus: "One verse with recitation + spoken meaning" },
  { dimension: "Daily Habit", traditional: "Easy to lose your place", socialFeeds: "Addictive notification loops", qurus: "Gentle, respectful evening reminders" },
  { dimension: "Reading Path", traditional: "Physical markers and memory", socialFeeds: "No continuous reading flow", qurus: "Saved checkpoints with total freedom to browse" },
  { dimension: "Languages", traditional: "Separate books or translation apps", socialFeeds: "Unverified automatic subtitles", qurus: "5 verified languages with paired audio" },
  { dimension: "Your Attention", traditional: "Requires dedicated quiet hours", socialFeeds: "Ads, comments, and distractions", qurus: "A completely quiet, ad-free sanctuary" },
  { dimension: "Reflections", traditional: "Notes kept separately elsewhere", socialFeeds: "Public social media posts", qurus: "Private notes and voice memos on your phone" },
  { dimension: "Access", traditional: "Physical resources", socialFeeds: "Free, but your attention is monetized", qurus: "100% free forever, open source, no paywalls" },
];

export default function ComparisonMatrix() {
  return (
    <section id="comparison" className="py-20 md:py-24 bg-surface/40 border-y border-border-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-[11px] font-semibold uppercase tracking-wider mb-4"><span className="w-1.5 h-1.5 rounded-full bg-primary" />A Different Approach</div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">Designed for peace of mind, not screen time.</h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">Qurus keeps the depth of Quran study while making it effortless to fit into real, everyday moments.</p>
        </motion.div>

        {/* Desktop Table View (md and up) */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="hidden md:block doppelrand-shell">
          <div className="doppelrand-core overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-border bg-surface/70 text-xs font-semibold uppercase tracking-wider text-text-secondary"><th className="py-3.5 px-6 w-1/4">Experience</th><th className="py-3.5 px-6 w-1/4 text-text-tertiary">Traditional Study</th><th className="py-3.5 px-6 w-1/4 text-text-tertiary">Social Media</th><th className="py-3.5 px-6 w-1/4 bg-primary-light/50 text-primary font-bold">Qurus</th></tr></thead>
              <tbody className="divide-y border-subtle text-sm">
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="hover:bg-surface/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-text-primary">{row.dimension}</td>
                    <td className="py-3.5 px-6 text-text-secondary">{row.traditional}</td>
                    <td className="py-3.5 px-6 text-text-secondary">{row.socialFeeds}</td>
                    <td className="py-3.5 px-6 bg-primary-light/30 font-semibold text-primary"><span className="inline-flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{row.qurus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Contrast Cards View (below md) */}
        <div className="md:hidden space-y-4">
          {comparisonRows.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.99 }}
              className="rounded-[22px] bg-[#EEF4F1]/60 p-1.5 border border-black/[0.05] shadow-[0_4px_24px_rgba(14,107,92,0.04)]"
            >
              <div className="rounded-[18px] bg-white p-4 space-y-3.5 border border-white/60">
                {/* Header with Number Pill and Dimension Title */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border-subtle">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-primary-muted text-primary text-[11px] font-mono font-bold flex items-center justify-center shadow-2xs">
                      0{index + 1}
                    </span>
                    <h3 className="text-sm font-bold text-text-primary tracking-tight">
                      {row.dimension}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">
                    Experience
                  </span>
                </div>

                {/* The Friction Layer (Muted Grey Atmosphere) */}
                <div className="p-3 rounded-xl bg-surface/80 border border-border/60 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-text-tertiary">
                    <span className="flex items-center gap-1.5 font-semibold text-rose-500/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      The Friction
                    </span>
                    <span>Before Qurus</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-text-secondary pl-0.5">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-text-tertiary font-mono shrink-0 mt-0.5">Trad.</span>
                      <p className="leading-snug">{row.traditional}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-text-tertiary font-mono shrink-0 mt-0.5">Feeds</span>
                      <p className="leading-snug">{row.socialFeeds}</p>
                    </div>
                  </div>
                </div>

                {/* The Qurus Way (Elevated Emerald Sanctuary) */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-primary-light/40 via-primary-muted/30 to-white/90 border border-primary/25 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 text-primary text-[10px] font-mono font-bold uppercase tracking-wider shadow-2xs border border-primary/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      The Qurus Way
                    </span>
                    <span className="text-[10px] font-mono text-primary font-semibold">Calm & Focused</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-text-primary leading-relaxed pl-1 pt-0.5">
                    {row.qurus}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
