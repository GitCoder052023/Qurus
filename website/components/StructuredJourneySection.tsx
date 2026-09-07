"use client";

import { motion } from "motion/react";

export default function StructuredJourneySection() {
  return (
    <section
      id="journey"
      className="py-24 md:py-36 bg-canvas border-b border-border-subtle overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Narrative Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            The Traveler and The Explorer
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-text-primary text-balance">
            A faithful path forward. <br className="hidden sm:inline" />
            <span className="font-editorial italic font-normal text-primary">
              Total freedom to wander.
            </span>
          </h2>
          <p className="mt-6 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            The Quran is both a lifelong journey to be completed verse by verse, and an open sanctuary you seek whenever life calls for it. Qurus v2.3.0 reconciles the two: keeping your sequential study checkpoint sacred while giving you unrestricted freedom to explore.
          </p>
        </motion.div>

        {/* The Two Halves of a Reader's Life: Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Side A: The Structured Journey */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 doppelrand-shell flex flex-col"
          >
            <div className="doppelrand-core p-8 sm:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold px-3 py-1 rounded-full bg-primary-muted border border-primary/20">
                    The Structured Path
                  </span>
                  <span className="text-xs text-text-tertiary">Sequential Continuity</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                  Always know where you belong.
                </h3>

                <p className="text-text-secondary text-base leading-relaxed mb-6">
                  When you sit down to study each day, you shouldn’t have to remember which chapter you were reading, shuffle through bookmarks, or wonder what comes next.
                </p>

                <p className="text-text-secondary text-base leading-relaxed mb-8">
                  Qurus maintains your sequential journey automatically. One tap from the home screen or reader instantly picks up where you left off. You can set any Ayah as your starting point, and reviewing previously finished verses never resets your forward milestone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface border border-border flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    🧭
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-text-primary">One-Tap Resume</div>
                    <div className="text-[11px] text-text-secondary truncate">Your journey checkpoint waits quietly for you</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-primary font-semibold shrink-0">Safe Checkpoint</span>
              </div>
            </div>
          </motion.div>

          {/* Side B: Unrestricted Exploration */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 doppelrand-shell flex flex-col"
          >
            <div className="doppelrand-core p-8 sm:p-10 flex-1 flex flex-col justify-between bg-gradient-to-br from-white to-surface">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold px-3 py-1 rounded-full bg-surface border border-border">
                    Unrestricted Exploration
                  </span>
                  <span className="text-xs text-text-tertiary">Spontaneous Reflection</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                  Never hesitate to wander.
                </h3>

                <p className="text-text-secondary text-base leading-relaxed mb-6">
                  Life brings moments that demand immediate solace. On a Friday morning, you want to read Surah Al-Kahf. In a season of grief or anxiety, you reach for Surah Ad-Duha. Or a friend asks about an Ayah, and you want to look it up and attach a voice reflection.
                </p>

                <p className="text-text-secondary text-base leading-relaxed mb-8">
                  In other apps, doing this overwrites your place. In Qurus, exploration is completely decoupled from your journey. Read, listen, bookmark, annotate, and ponder any of the 114 Surahs—your primary study sequence remains untouched.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface border border-border flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/60 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                    📖
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-text-primary">114 Surahs Open</div>
                    <div className="text-[11px] text-text-secondary truncate">Listen, bookmark, and annotate anywhere</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-800 font-semibold shrink-0">Zero Lock-in</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Motto Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center p-6 sm:p-8 rounded-3xl bg-surface border border-border max-w-2xl mx-auto"
        >
          <blockquote className="font-editorial text-lg sm:text-xl text-text-primary italic leading-relaxed">
            “Your journey stays structured without taking away your freedom to explore.”
          </blockquote>
          <p className="text-xs text-text-tertiary mt-2">
            The core design principle of Qurus v2.3.0
          </p>
        </motion.div>
      </div>
    </section>
  );
}
