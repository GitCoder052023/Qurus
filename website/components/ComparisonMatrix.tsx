"use client";

import { motion } from "motion/react";

export default function ComparisonMatrix() {
  const comparisonRows = [
    { dimension: "How You Learn", traditional: "A slower, deeper format that can be difficult to fit into a busy routine", socialFeeds: "Short, disconnected clips designed around the feed", qurus: "One verse at a time, with Arabic and Urdu together" },
    { dimension: "Daily Consistency", traditional: "Easy to lose momentum when daily life gets demanding", socialFeeds: "Engineered around algorithmic notifications and dopamine loops", qurus: "Daily Tadabbur goals, streak countdown, and gentle evening streak-savers" },
    { dimension: "Structured Journey", traditional: "Relying on physical markers or remembering where you stopped", socialFeeds: "Random disconnected clips with no continuous reading sequence", qurus: "Sequential journey with one-tap resume, plus total freedom to explore any Ayah" },
    { dimension: "Global Languages", traditional: "Requires acquiring separate multi-volume translation books", socialFeeds: "Machine-translated captions or unverified voiceovers", qurus: "5 verified languages with paired authentic verse-by-verse recitation" },
    { dimension: "Your Attention", traditional: "Requires setting aside dedicated time and space", socialFeeds: "Ads, notifications, comments, and endless recommendations compete for attention", qurus: "A quiet interface with no ads, feeds, or distracting popups" },
    { dimension: "While Moving", traditional: "Primarily designed around sitting down to read", socialFeeds: "Often tied to an active screen and scrolling", qurus: "Background audio keeps the Quran with you when the screen is locked" },
    { dimension: "Personal Reflection", traditional: "Notes can live separately from the verse", socialFeeds: "Thoughts are often public or tied to a social profile", qurus: "Private written notes and voice memos stay on your device" },
    { dimension: "Access", traditional: "Physical books and established study resources", socialFeeds: "Free to enter, but attention is part of the business model", qurus: "Free, open-source, and built without subscriptions or paywalls" },
  ];

  return (
    <section className="py-24 md:py-36 bg-surface/40 border-y border-border-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4"><span className="w-1.5 h-1.5 rounded-full bg-primary" />A Different Approach</div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">Less friction between you and the Quran.</h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">Qurus is not trying to replace traditional study. It creates a calm, practical starting point for reading, listening, understanding, and reflecting in everyday life.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="hidden md:block doppelrand-shell">
          <div className="doppelrand-core overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-border bg-surface/70 text-xs font-semibold uppercase tracking-wider text-text-secondary"><th className="py-4 px-6 w-1/4">Experience</th><th className="py-4 px-6 w-1/4 text-text-tertiary">Traditional Study</th><th className="py-4 px-6 w-1/4 text-text-tertiary">Social & Video Feeds</th><th className="py-4 px-6 w-1/4 bg-primary-light/50 text-primary font-bold">Qurus</th></tr></thead>
              <tbody className="divide-y divide-border-subtle text-sm">{comparisonRows.map((row, index) => <tr key={index} className="hover:bg-surface/50 transition-colors"><td className="py-4 px-6 font-semibold text-text-primary">{row.dimension}</td><td className="py-4 px-6 text-text-secondary">{row.traditional}</td><td className="py-4 px-6 text-text-secondary">{row.socialFeeds}</td><td className="py-4 px-6 bg-primary-light/30 font-medium text-primary"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary shrink-0" /><span className="font-semibold">{row.qurus}</span></div></td></tr>)}</tbody>
            </table>
          </div>
        </motion.div>

        <div className="md:hidden space-y-4">{comparisonRows.map((row, index) => <motion.div key={index} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.06 }} className="doppelrand-shell"><div className="doppelrand-core p-5 space-y-3"><div className="flex items-center justify-between"><h3 className="text-sm font-bold text-text-primary">{row.dimension}</h3><span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-muted text-primary font-semibold">Qurus</span></div><div className="p-3.5 rounded-2xl bg-primary-light/60 border border-primary/20 flex items-start gap-2.5 text-xs text-primary font-medium"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" /><span className="leading-relaxed font-semibold">{row.qurus}</span></div><div className="pt-2 border-t border-border-subtle grid grid-cols-2 gap-3 text-[11px] text-text-secondary"><div><span className="text-[10px] text-text-tertiary block font-semibold mb-0.5">Traditional Study</span><span className="leading-snug block">{row.traditional}</span></div><div><span className="text-[10px] text-text-tertiary block font-semibold mb-0.5">Social & Video</span><span className="leading-snug block">{row.socialFeeds}</span></div></div></div></motion.div>)}</div>
      </div>
    </section>
  );
}
