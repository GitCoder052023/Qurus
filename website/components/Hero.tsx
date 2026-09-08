"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { trackDownload } from "@/utils/analytics";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[78dvh] flex flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-14 overflow-hidden bg-sanctuary-glow">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center w-full">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-primary/20 text-[11px] font-medium text-primary mb-5 shadow-xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Free forever</span><span className="text-primary/30">•</span><span>Completely ad-free</span><span className="text-primary/30">•</span><span>Private by design</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-text-primary max-w-4xl leading-[1.05] text-balance">
            Understand the Quran.{" "}
            <span className="font-editorial italic font-normal text-primary pb-1 inline-block">Verse by verse</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-4 text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-normal text-balance">
            A peaceful way to bring the Quran into your daily life — with clear spoken translations, pocket audio, and quiet space to reflect.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-7 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <motion.a whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} href="/api/download" onClick={() => trackDownload("hero_direct")} className="group relative flex items-center justify-between gap-4 w-full sm:w-auto pl-7 pr-2.5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-base font-semibold shadow-[0_12px_28px_rgba(14,107,92,0.25)] transition-colors">
              <div className="flex items-center gap-2"><span>Download Free APK</span><span className="text-xs font-mono opacity-80 font-normal">112 MB</span></div>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">↓</span>
            </motion.a>
            <Link href="#experience" className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/95 hover:bg-surface border border-primary/20 text-text-primary text-sm font-semibold shadow-xs transition-colors">
              <span className="text-primary">▶</span><span>Try Live Demo</span>
            </Link>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-3 text-xs text-text-tertiary">Instant download for Android • No account or sign-up needed</motion.p>

          <motion.div variants={itemVariants} className="mt-7 w-full max-w-2xl doppelrand-shell">
            <div className="doppelrand-core p-3.5 sm:p-4 text-left flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center text-primary font-bold text-sm shrink-0">١</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2"><span className="text-xs font-semibold text-text-primary truncate">Surah Al-Faatiha (1:1)</span><span className="hidden sm:inline text-[10px] text-primary font-medium bg-primary-muted px-2 py-0.5 rounded-full">Arabic + 5 Languages</span></div>
                  <div className="text-[11px] text-text-secondary truncate font-arabic text-right mt-0.5">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                </div>
              </div>
              <Link href="#experience" className="text-xs font-semibold text-primary px-3.5 py-1.5 rounded-full bg-primary-muted hover:bg-primary-light transition-colors shrink-0">Listen ↓</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
