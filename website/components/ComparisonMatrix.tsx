"use client";

import { motion } from "motion/react";

const comparisonRows = [
  { dimension: "Learning", traditional: "Deep but harder to fit into a busy routine", socialFeeds: "Short, disconnected feed content", qurus: "One verse with Arabic + translation" },
  { dimension: "Consistency", traditional: "Easy to lose your place", socialFeeds: "Notifications and dopamine loops", qurus: "Daily goals + gentle streak protection" },
  { dimension: "Journey", traditional: "Physical markers or memory", socialFeeds: "No continuous reading path", qurus: "Sequential checkpoint + free exploration" },
  { dimension: "Languages", traditional: "Separate translation resources", socialFeeds: "Captions of varying quality", qurus: "5 paired languages + recitation" },
  { dimension: "Attention", traditional: "Requires dedicated time", socialFeeds: "Ads, comments and recommendations", qurus: "Quiet interface, no feed or ads" },
  { dimension: "Reflection", traditional: "Notes live separately", socialFeeds: "Often public or social", qurus: "Private notes + voice memos" },
  { dimension: "Access", traditional: "Physical resources", socialFeeds: "Free, but attention is the product", qurus: "Free, open-source, no paywall" },
];

export default function ComparisonMatrix() {
  return (
    <section id="comparison" className="py-20 md:py-24 bg-surface/40 border-y border-border-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-[11px] font-semibold uppercase tracking-wider mb-4"><span className="w-1.5 h-1.5 rounded-full bg-primary" />A different approach</div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">Less friction between you and the Quran.</h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">Qurus keeps the calm and depth of study while making the first few minutes easier to fit into real life.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="doppelrand-shell">
          <div className="doppelrand-core overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-border bg-surface/70 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-text-secondary"><th className="py-3.5 px-4 sm:px-6 w-1/4">Experience</th><th className="hidden md:table-cell py-3.5 px-6 w-1/4 text-text-tertiary">Traditional</th><th className="hidden md:table-cell py-3.5 px-6 w-1/4 text-text-tertiary">Feeds</th><th className="py-3.5 px-4 sm:px-6 w-1/2 md:w-1/4 bg-primary-light/50 text-primary font-bold">Qurus</th></tr></thead>
              <tbody className="divide-y divide-border-subtle text-xs sm:text-sm">
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="hover:bg-surface/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary">{row.dimension}</td>
                    <td className="hidden md:table-cell py-3.5 px-6 text-text-secondary">{row.traditional}</td>
                    <td className="hidden md:table-cell py-3.5 px-6 text-text-secondary">{row.socialFeeds}</td>
                    <td className="py-3.5 px-4 sm:px-6 bg-primary-light/30 font-semibold text-primary"><span className="inline-flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{row.qurus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
