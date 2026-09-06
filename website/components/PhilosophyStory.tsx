"use client";

import { motion } from "motion/react";

export default function PhilosophyStory() {
  return (
    <section id="story" className="py-24 md:py-36 bg-surface/40 border-t border-border-subtle overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Creator’s Story
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">
            Why I built Qurus.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg">
            By <strong className="font-medium text-text-primary">Hamdan Khubaib</strong> • Creator of Qurus
          </p>
        </motion.div>

        {/* Editorial Body with Motion Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="doppelrand-shell"
        >
          <div className="doppelrand-core p-8 sm:p-12 md:p-16 space-y-8 text-text-primary">
            <p className="text-xl sm:text-2xl font-normal leading-relaxed text-text-primary font-editorial italic text-balance">
              “To be completely honest with you, I was looking for a simple way to understand the Quran directly from its source through translation. But every time I tried, something stood in the way.”
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
              Traditional study methods felt overwhelming. Sitting down with rigid expectations, opening heavy multi-volume commentaries, and trying to digest dense text after a long day at school or work felt impossible to sustain. Frustration and guilt would slowly take over.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
              Meanwhile, look at our daily habits. Whenever we have two free minutes waiting in line, sitting on the bus, or waiting for a friend, we effortlessly pull out our phones. I asked myself: why can’t reading the Quran be just as natural and frictionless?
            </p>

            {/* Brother's Advice Block with Motion Highlight */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="my-10 p-7 sm:p-10 rounded-2xl bg-surface border-l-4 border-l-primary border border-border relative"
            >
              <div className="text-xs uppercase font-mono font-medium tracking-wider text-primary mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>The Advice That Changed Everything</span>
              </div>

              <blockquote className="font-editorial text-xl sm:text-2xl text-text-primary leading-[1.3] pb-1 italic text-balance">
                “Don’t overcomplicate anything. Just read the verses with their translation.
                Whatever framework you use to make sense of the world—common sense, philosophy, history, or your own life experience—you will find verses that stick with you like a hook in your mind.”
              </blockquote>
              <p className="mt-5 text-xs font-mono text-text-tertiary text-right">
                — My brother’s words to me
              </p>
            </motion.div>

            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
              That advice hit me with immediate clarity. You don’t need to be a scholar before words can move you. When you approach a verse with an honest, inquiring mind, it sparks curiosity that stays with you all day.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
              I built Qurus so anyone can experience that same clarity: whether you are wrestling with doubts, have a packed schedule, or just want to know what the Quran actually says. No ads, no fees, no accounts, and no algorithmic noise. Just you and the words.
            </p>

            {/* Author Signature Line */}
            <div className="pt-10 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg ring-2 ring-primary/20 shadow-xs">
                  H
                </div>
                <div>
                  <div className="text-base font-semibold text-text-primary">
                    Hamdan Khubaib
                  </div>
                  <div className="text-xs text-text-tertiary">
                    Developer & Creator of Qurus
                  </div>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="https://github.com/GitCoder052023"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-2 py-2 px-4 rounded-full bg-primary-muted hover:bg-primary-light transition-all"
              >
                <span>Follow updates on GitHub</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
