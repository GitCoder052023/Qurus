"use client";

import { motion } from "motion/react";

export default function EverydayLifeGrid() {
  return (
    <section id="everyday-life" className="py-24 md:py-36 bg-canvas overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header with Simple, Converting Language */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Everyday Routine
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">
            Made for the moments you already have.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            You do not need hours of free time or a quiet library. Qurus fits naturally into the small gaps in your normal day.
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid with Motion Stagger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Bento Tile 1: Gym - Wide 7-col Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="lg:col-span-7 doppelrand-shell transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">
                    At the Gym
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">
                  Listen between sets with your screen locked
                </h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                  Keep your phone safely in your pocket or gym bag. Advance, pause, or repeat verses straight from your smartwatch or bluetooth headphones while resting.
                </p>
              </div>

              {/* Tactile Media Status */}
              <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                  <span className="text-xs font-medium text-text-primary truncate">
                    Plays smoothly in your pocket
                  </span>
                </div>
                <span className="text-xs font-mono text-primary font-semibold shrink-0">
                  Screen-Off Audio
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bento Tile 2: Commuting - 5-col Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="lg:col-span-5 doppelrand-shell transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between bg-gradient-to-br from-white to-surface">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="3" width="16" height="16" rx="2" />
                      <path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3M8 15h.01M16 15h.01" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">
                    Daily Commute
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">
                  Understand on the bus or metro
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Instead of endless mindless scrolling, hear the Arabic recitation immediately followed by clear spoken Urdu. You always know what is being said.
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center gap-2 text-xs font-semibold text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Arabic + Urdu in natural sync</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Tile 3: Evening Walk - 5-col Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="lg:col-span-5 doppelrand-shell transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 4v16M17 8l-4-4-4 4M17 16l-4 4-4-4" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">
                    Evening Walk
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">
                  Repeat any verse as many times as you like
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Put a single verse on loop while walking outside. Let the words and translation settle into your memory at an easy, relaxing pace.
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center gap-2 text-xs font-semibold text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>One-tap repeat loop</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Tile 4: Bedside - Wide 7-col Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="lg:col-span-7 doppelrand-shell transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">
                    Before Sleeping
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">
                  Save private written or voice reflections
                </h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                  Have a question, doubt, or personal thought? Type it or record a quick voice memo directly onto the verse. Everything stays 100% on your device, with no user accounts and no cloud tracking.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                  </svg>
                  <span className="text-xs font-medium text-text-primary">100% On-Device Notes & Voice Memos</span>
                </div>
                <span className="text-xs font-mono text-primary font-medium">Zero Accounts Needed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
