"use client";

import { motion } from "motion/react";

export default function ComparisonMatrix() {
  const comparisonRows = [
    {
      dimension: "How You Learn",
      traditional: "Dense pages and heavy multi-volume commentaries",
      socialFeeds: "Short, disconnected video clips algorithmically recommended",
      qurus: "One verse at a time with instant spoken Urdu translation",
    },
    {
      dimension: "Distraction Level",
      traditional: "Hard to maintain a daily habit with busy schedules",
      socialFeeds: "Aggressive ads, comment fights, dopamine notifications",
      qurus: "Zero ads, zero social feeds, zero popups — pure focus",
    },
    {
      dimension: "Audio While Moving",
      traditional: "No audio; requires sitting at a desk with an open book",
      socialFeeds: "Stops playing when you lock your screen or put phone away",
      qurus: "Plays in background with screen locked in your pocket",
    },
    {
      dimension: "Personal Reflections",
      traditional: "Written on loose paper or margins, easily lost",
      socialFeeds: "Public comments where everyone can judge your thoughts",
      qurus: "100% private written notes & voice memos on your device",
    },
    {
      dimension: "Cost & Transparency",
      traditional: "Expensive book sets",
      socialFeeds: "Monetized with annoying banner and video ads",
      qurus: "Free forever, open-source (MIT), zero paywalls or subscriptions",
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-surface/40 border-y border-border-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Clear Comparison
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">
            Why ordinary apps don’t work for most of us.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            Heavy books feel overwhelming, and social media distracts you with notifications and ads. Qurus gives you a simple, clean space that just works.
          </p>
        </motion.div>

        {/* Desktop Comparison Table with Motion Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block doppelrand-shell"
        >
          <div className="doppelrand-core overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface/70 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  <th className="py-4 px-6 w-1/4">Experience</th>
                  <th className="py-4 px-6 w-1/4 text-text-tertiary">Classical Books</th>
                  <th className="py-4 px-6 w-1/4 text-text-tertiary">Video Feeds & Reels</th>
                  <th className="py-4 px-6 w-1/4 bg-primary-light/50 text-primary font-bold">
                    Qurus
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm">
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="hover:bg-surface/50 transition-colors">
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
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span className="font-semibold">{row.qurus}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile View: High-End Mobile Stack with Stagger */}
        <div className="md:hidden space-y-4">
          {comparisonRows.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="doppelrand-shell"
            >
              <div className="doppelrand-core p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-primary">
                    {row.dimension}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-muted text-primary font-semibold">
                    Qurus
                  </span>
                </div>

                {/* Qurus Highlight Card */}
                <div className="p-3.5 rounded-2xl bg-primary-light/60 border border-primary/20 flex items-start gap-2.5 text-xs text-primary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                  <span className="leading-relaxed font-semibold">{row.qurus}</span>
                </div>

                {/* Alternatives */}
                <div className="pt-2 border-t border-border-subtle grid grid-cols-2 gap-3 text-[11px] text-text-secondary">
                  <div>
                    <span className="text-[10px] text-text-tertiary block font-semibold mb-0.5">
                      Classical Books
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
