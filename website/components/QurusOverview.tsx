"use client";

import { motion } from "motion/react";

const capabilities = [
  ["01", "Verse-first reading", "Arabic, translation, repeat, bookmark, and highlight without clutter."],
  ["02", "Arabic + translation audio", "Listen to the verse and its spoken meaning together, across five languages."],
  ["03", "Private reflection", "Keep written notes and voice memos beside the verse, stored on your device."],
  ["04", "Background listening", "Put Qurus in your pocket and keep listening with the screen locked."],
  ["05", "Structured journey", "Resume your sequential checkpoint in one tap without losing freedom to explore."],
  ["06", "Gentle consistency", "Daily targets, an evening streak-saver, and reflective milestone moments."],
];

const languages = [
  ["Urdu", "اردو"],
  ["English", "English"],
  ["Bengali", "বাংলা"],
  ["Turkish", "Türkçe"],
  ["French", "Français"],
];

export default function QurusOverview() {
  return (
    <section id="overview" className="bg-canvas border-y border-border-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-[11px] font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              The Qurus experience
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-text-primary text-balance leading-[1.05]">
              Everything around the verse.
              <span className="font-editorial italic font-normal text-primary"> Nothing in the way.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-text-secondary lg:pb-1">
            Read, listen, understand, reflect, and return. Qurus brings the essential parts of a Quran study session into one quiet place.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 doppelrand-shell"
          >
            <div className="doppelrand-core p-6 sm:p-8 h-full">
              <div className="flex items-center justify-between gap-4 mb-7">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary">Core capabilities</p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mt-1">A complete study loop</h3>
                </div>
                <span className="text-xs font-mono text-primary font-semibold">06 essentials</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-7 gap-y-6">
                {capabilities.map(([number, title, body]) => (
                  <div key={number} className="flex gap-3.5">
                    <span className="w-7 h-7 rounded-lg bg-primary-muted text-primary text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {number}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">{title}</h4>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-text-secondary">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 doppelrand-shell"
          >
            <div className="doppelrand-core p-6 sm:p-8 h-full flex flex-col justify-between bg-gradient-to-br from-white via-surface to-primary-light/20">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">Global understanding</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mt-1">Five languages. One verse.</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Verse-by-verse translation and paired recitation, with native typography and writing direction for each language.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-8">
                {languages.map(([name, native]) => (
                  <div key={name} className="rounded-xl bg-white/80 border border-border px-3.5 py-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-text-primary">{name}</span>
                    <span className="text-xs text-primary font-medium" dir={name === "Urdu" ? "rtl" : "ltr"}>{native}</span>
                  </div>
                ))}
                <div className="rounded-xl bg-primary text-white px-3.5 py-3 flex items-center justify-between gap-2 col-span-2">
                  <span className="text-xs font-semibold">Arabic stays at the center</span>
                  <span className="font-arabic text-sm">العربية</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 doppelrand-shell"
          >
            <div className="doppelrand-core p-6 sm:p-8 grid md:grid-cols-2 gap-6 md:gap-10 items-center bg-surface/60">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">Structured, never restrictive</p>
                <h3 className="text-xl sm:text-3xl font-semibold text-text-primary tracking-tight mt-2">Know where to continue. Wander whenever you need.</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white border border-border p-4">
                  <div className="text-xs font-semibold text-text-primary">Sequential journey</div>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">One-tap resume and safe checkpoints keep your daily path intact.</p>
                </div>
                <div className="rounded-2xl bg-white border border-border p-4">
                  <div className="text-xs font-semibold text-text-primary">Free exploration</div>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">Browse any of 114 Surahs without disrupting your forward progress.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
