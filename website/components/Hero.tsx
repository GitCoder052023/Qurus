"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[92dvh] flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-sanctuary-glow">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Trust Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-primary/20 text-[11px] font-medium text-primary mb-6 shadow-xs backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
            <span>100% Free</span>
            <span className="text-primary/30">•</span>
            <span>Zero Ads</span>
            <span className="text-primary/30">•</span>
            <span>Works Offline</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-text-primary max-w-4xl leading-[1.08] text-balance"
          >
            Understand the Quran.{" "}
            <span className="font-editorial italic font-normal text-primary pb-1 inline-block">
              Verse by verse
            </span>
          </motion.h1>

          {/* Brand Positioning */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-normal text-balance"
          >
            A calm, ayah-by-ayah way to read, listen to, study, and understand the Quran.
          </motion.p>

          {/* Primary CTA + Secondary Demo */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <motion.a
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href="/api/download"
              className="group relative flex items-center justify-between gap-4 w-full sm:w-auto pl-7 pr-2.5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-base font-semibold shadow-[0_12px_28px_rgba(14,107,92,0.25)] transition-colors active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <span>Download Free APK</span>
                <span className="text-xs font-mono opacity-80 font-normal">112 MB</span>
              </div>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-y-[-1px]">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#experience"
                className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/95 hover:bg-surface border border-primary/20 text-text-primary text-sm font-semibold shadow-xs transition-colors"
              >
                <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Try 1-Minute Live Demo</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-3.5 text-xs text-text-tertiary">
            For Android 8.0+ • Instant download • No email or account needed
          </motion.p>

          {/* Product Preview */}
          <motion.div
            variants={itemVariants}
            className="mt-10 w-full max-w-2xl doppelrand-shell"
          >
            <div className="doppelrand-core p-4 sm:p-5 text-left flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-primary-light flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  ١
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-text-primary truncate">
                      Surah Al-Faatiha (1:1)
                    </span>
                    <span className="text-[10px] text-primary font-medium bg-primary-muted px-2 py-0.5 rounded-full">
                      Arabic + 5 Languages
                    </span>
                  </div>
                  <div className="text-[11px] text-text-secondary truncate font-arabic text-right mt-0.5">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex items-end gap-0.5 h-4 px-2">
                  <span className="w-0.5 h-3.5 bg-primary rounded-full wave-bar-1" />
                  <span className="w-0.5 h-3.5 bg-primary rounded-full wave-bar-2" />
                  <span className="w-0.5 h-3.5 bg-primary rounded-full wave-bar-3" />
                  <span className="w-0.5 h-3.5 bg-primary rounded-full wave-bar-4" />
                </div>
                <Link
                  href="#experience"
                  className="text-xs font-semibold text-primary px-3.5 py-1.5 rounded-full bg-primary-muted hover:bg-primary-light transition-colors"
                >
                  Listen Below ↓
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
