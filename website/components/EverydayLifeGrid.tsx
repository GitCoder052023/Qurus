"use client";

import { motion } from "motion/react";

export default function EverydayLifeGrid() {
  return (
    <section id="everyday-life" className="py-24 md:py-36 bg-canvas overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Everyday Life
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">
            A Quran habit that fits real life.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            Qurus is designed for the moments you already have, making it easier to return to the Quran without turning every session into a project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -3 }} className="lg:col-span-7 doppelrand-shell transition-shadow duration-300 hover:shadow-lg">
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" /></svg></div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">While Moving</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">Listen without keeping your screen on</h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mb-8">Keep Qurus in your pocket during a walk, workout, or commute. Background playback lets you stay with the recitation without staying on your phone.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center justify-between gap-3"><div className="flex items-center gap-2.5 min-w-0"><span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" /><span className="text-xs font-medium text-text-primary truncate">The Quran can stay with you</span></div><span className="text-xs font-mono text-primary font-semibold shrink-0">Background Audio</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -3 }} className="lg:col-span-5 doppelrand-shell transition-shadow duration-300 hover:shadow-lg">
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between bg-gradient-to-br from-white to-surface">
              <div>
                <div className="flex items-center justify-between mb-6"><div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="3" width="16" height="16" rx="2" /><path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3M8 15h.01M16 15h.01" /></svg></div><span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">On the Commute</span></div>
                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">Follow Arabic with its Urdu meaning</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">Listen to the Arabic recitation and then the spoken Urdu translation, keeping the meaning close to the verse instead of separating reading from understanding.</p>
              </div>
              <div className="pt-4 border-t border-border-subtle flex items-center gap-2 text-xs font-semibold text-primary"><span className="w-1.5 h-1.5 rounded-full bg-primary" /><span>Arabic + Urdu, verse by verse</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -3 }} className="lg:col-span-5 doppelrand-shell transition-shadow duration-300 hover:shadow-lg">
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6"><div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 4v16M17 8l-4-4-4 4M17 16l-4 4-4-4" /></svg></div><span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">A Single Verse</span></div>
                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">Stay with a verse until it clicks</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">Repeat a verse whenever you want. Give a line more time, revisit its meaning, and let your attention stay where you chose to put it.</p>
              </div>
              <div className="pt-4 border-t border-border-subtle flex items-center gap-2 text-xs font-semibold text-primary"><span className="w-1.5 h-1.5 rounded-full bg-primary" /><span>One-tap verse repeat</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -3 }} className="lg:col-span-7 doppelrand-shell transition-shadow duration-300 hover:shadow-lg">
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6"><div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg></div><span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">When Something Stays With You</span></div>
                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">Keep your reflections beside the verse</h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mb-8">A question or thought can be worth keeping. Add a private written note or voice memo to the verse and return to it later, with your reflections kept on your device.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center justify-between gap-3"><div className="flex items-center gap-2"><svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /></svg><span className="text-xs font-medium text-text-primary">Private notes & voice memos</span></div><span className="text-xs font-mono text-primary font-medium">On Your Device</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -3 }} className="lg:col-span-7 doppelrand-shell transition-shadow duration-300 hover:shadow-lg">
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-base">🔥</div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800">When The Day Gets Busy</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">Protect your streak without the pressure</h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mb-8">A real-time countdown shows exactly how much time is left before midnight. Gentle evening streak-saver reminders give you a quiet nudge and automatically dismiss the moment your reflection is complete.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                  <span className="text-xs font-medium text-text-primary truncate">Configurable daily Tadabbur target</span>
                </div>
                <span className="text-xs font-mono text-amber-800 font-semibold shrink-0">Evening Streak-Saver</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -3 }} className="lg:col-span-5 doppelrand-shell transition-shadow duration-300 hover:shadow-lg">
            <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between bg-gradient-to-br from-white to-surface">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg></div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">Pick Up In One Tap</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">Resume your journey where you paused</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">Resume your sequential reading journey with a single tap from the reader. Reviewing past verses or browsing favorite chapters never disrupts your forward checkpoint.</p>
              </div>
              <div className="pt-4 border-t border-border-subtle flex items-center gap-2 text-xs font-semibold text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Sequential path + Free exploration</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
