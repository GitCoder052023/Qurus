"use client";

import { motion } from "motion/react";

export default function PhilosophyStory() {
  return (
    <section id="story" className="py-24 md:py-36 bg-surface/40 border-t border-border-subtle overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4"><span className="w-1.5 h-1.5 rounded-full bg-primary" />The Idea Behind Qurus</div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">Built around a simple belief.</h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg">By <strong className="font-medium text-text-primary">Hamdan Khubaib</strong> • Creator of Qurus</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="doppelrand-shell">
          <div className="doppelrand-core p-8 sm:p-12 md:p-16 space-y-8 text-text-primary">
            <p className="text-xl sm:text-2xl font-normal leading-relaxed text-text-primary font-editorial italic text-balance">“I wanted a simple way to understand the Quran directly through its verses and translation. But every time I tried, the process felt harder to sustain than it needed to be.”</p>
            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">Traditional study has enormous value, but not everyone begins with hours of uninterrupted time or the same level of familiarity with classical resources. For me, the challenge was simply getting close enough to the text consistently to let understanding grow.</p>
            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">At the same time, our phones have become remarkably good at filling every spare moment. A few minutes waiting for a bus, walking outside, or winding down at night can disappear into an endless feed. I kept wondering why returning to the Quran could not feel just as natural.</p>

            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }} className="my-10 p-7 sm:p-10 rounded-2xl bg-surface border-l-4 border-l-primary border border-border relative">
              <div className="text-xs uppercase font-mono font-medium tracking-wider text-primary mb-4 flex items-center gap-2"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg><span>The Principle</span></div>
              <blockquote className="font-editorial text-xl sm:text-2xl text-text-primary leading-[1.3] pb-1 italic text-balance">“Don’t overcomplicate the beginning. Read the verses with their translation, stay curious, and give the words enough space to stay with you.”</blockquote>
              <p className="mt-5 text-xs font-mono text-text-tertiary text-right">— Advice from my brother</p>
            </motion.div>

            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">That idea became the foundation of Qurus. You do not have to turn every session into a study plan. You can start with one verse, understand what it says, listen to it again, and return whenever you have a few quiet minutes.</p>
            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">Qurus is built to make that first step easier: a calm interface, Arabic alongside Urdu translation, background listening, and private space for the thoughts that a verse leaves with you. No ads, no accounts, and no algorithmic feed competing for your attention.</p>

            <div className="pt-10 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg ring-2 ring-primary/20 shadow-xs">H</div><div><div className="text-base font-semibold text-text-primary">Hamdan Khubaib</div><div className="text-xs text-text-tertiary">Developer & Creator of Qurus</div></div></div>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="https://github.com/GitCoder052023" target="_blank" rel="noopener noreferrer" className="group text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-2 py-2 px-4 rounded-full bg-primary-muted hover:bg-primary-light transition-all"><span>Follow Qurus on GitHub</span><span className="transition-transform group-hover:translate-x-0.5">→</span></motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
