"use client";

import { motion } from "motion/react";

export default function MotivationEngineSection() {
  return (
    <section
      id="motivation"
      className="py-24 md:py-36 bg-surface/50 border-b border-border-subtle overflow-hidden relative"
    >
      {/* Gentle Atmospheric Twilight Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-r from-amber-200/15 via-primary/5 to-teal-200/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Narrative Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            The Habit of Tadabbur
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-text-primary text-balance">
            Show up consistently. <br className="hidden sm:inline" />
            <span className="font-editorial italic font-normal text-primary">
              Without turning study into a race.
            </span>
          </h2>
          <p className="mt-6 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            Most habit trackers treat consistency like an adrenaline game—spamming notifications, counting arbitrary points, and inducing guilt. In Qurus v2.3.0, the motivation engine is designed for devotion: quiet, mindful, and structured around your actual evening routine.
          </p>
        </motion.div>

        {/* The 3-Act Story of the Motivation Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Act 1: The Evening Guardian (The Problem & The Streak-Saver Solution) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 doppelrand-shell flex flex-col"
          >
            <div className="doppelrand-core p-8 sm:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                    Act I • The Evening Hours
                  </span>
                  <span className="text-xs text-text-tertiary">Real-time awareness</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                  The day gets away from us. Qurus watches over your intention.
                </h3>

                <p className="text-text-secondary text-base leading-relaxed mb-6">
                  We rarely abandon the Quran out of neglect. We lose our habit because the day is demanding. Work spills over, chores multiply, and by late evening, the exhaustion of the day makes it easy to say: <em>“I will read tomorrow.”</em>
                </p>

                <p className="text-text-secondary text-base leading-relaxed mb-8">
                  The v2.3.0 streak-saver acts as a gentle evening companion. It shows exactly how much time remains before midnight, sending progressive, quiet reminders throughout the evening. No guilt. No shrill alarms. And the moment you complete your verses, every remaining reminder for the night automatically dissolves.
                </p>
              </div>

              {/* Editorial Quote Card */}
              <div className="p-5 rounded-2xl bg-surface border border-border border-l-4 border-l-amber-600 space-y-2">
                <p className="font-editorial italic text-text-primary text-base leading-relaxed">
                  “The most beloved of deeds to Allah are those that are most consistent, even if they are small.”
                </p>
                <div className="text-[11px] font-mono text-text-tertiary text-right">
                  — Prophet Muhammad ﷺ (Sahih al-Bukhari 6464)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Act 2: Depth Over Volume (Configurable Targets) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 doppelrand-shell flex flex-col"
          >
            <div className="doppelrand-core p-8 sm:p-10 flex-1 flex flex-col justify-between bg-gradient-to-br from-white via-surface to-amber-50/20">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold px-3 py-1 rounded-full bg-primary-muted border border-primary/20">
                    Act II • Your Pace
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                  Set your target. Honor your capacity.
                </h3>

                <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
                  Spiritual growth is not a high-speed sprint. A reader who deeply ponders three verses with translation and commentary absorbs more than someone who skims twenty pages without presence.
                </p>

                <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
                  Qurus allows you to configure your daily Tadabbur goal to whatever fits your current season of life—whether that is three verses during exams or twenty verses during a peaceful retreat.
                </p>
              </div>

              <div className="pt-6 border-t border-border-subtle flex items-center justify-between text-xs text-text-tertiary">
                <span>Configurable daily goals</span>
                <strong className="text-text-primary font-medium">3, 5, 10, or 20 Ayahs</strong>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Act 3: Meaningful Celebrations (Not Gamified Badges) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="doppelrand-shell max-w-4xl mx-auto"
        >
          <div className="doppelrand-core p-8 sm:p-12 text-center flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold px-3.5 py-1 rounded-full bg-primary-muted border border-primary/20 mb-6">
              Act III • True Reflection
            </span>

            <h3 className="text-2xl sm:text-4xl font-bold text-text-primary tracking-tight max-w-xl text-balance mb-5">
              Milestones rewarded with reflective wisdom, not vanity metrics.
            </h3>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl text-balance mb-8">
              When you complete a Surah or safeguard a consecutive streak milestone, Qurus does not display flashing casino graphics or competitive scoreboards. Instead, it offers a moment of reverence: subtle haptic feedback, graceful particle atmosphere, and a curated gem of Quranic reflection to carry with you through the night.
            </p>

            <div className="p-6 rounded-3xl bg-surface border border-border max-w-lg w-full text-left space-y-2">
              <div className="text-[10px] font-mono uppercase text-primary font-bold tracking-wider">
                Milestone Wisdom
              </div>
              <p className="font-editorial italic text-text-primary text-sm sm:text-base leading-relaxed">
                “A single verse understood deeply is heavier on the scale of character than a chapter read in haste.”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
