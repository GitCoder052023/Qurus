"use client";

import { motion } from "motion/react";

const capabilities = [
  ["01", "One Verse at a Time", "Clear Arabic and translation side by side, with zero clutter to distract you."],
  ["02", "Listen & Understand", "Hear the Arabic recitation and spoken translation together in your native language."],
  ["03", "Capture Your Thoughts", "Keep private written reflections and voice memos attached right to the verse."],
  ["04", "Pocket Audio", "Lock your screen and keep listening during your daily walk or commute."],
  ["05", "Never Lose Your Place", "Pick up right where you left off with a single tap, anytime."],
  ["06", "Gentle Consistency", "Build a daily habit at your own pace with quiet, respectful evening reminders."],
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
              The Qurus Experience
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-text-primary text-balance leading-[1.05]">
              Everything around the verse.
              <span className="font-editorial italic font-normal text-primary"> Nothing in the way.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-text-secondary lg:pb-1">
            Read, listen, understand, and reflect. Qurus brings every essential part of your Quran study into one peaceful space.
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
                  <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary">How Qurus Works For You</p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mt-1">A quiet study loop</h3>
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
                <p className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">In Your Language</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mt-1">Five languages. One verse.</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Spoken translations paired seamlessly with Arabic recitation, rendered in authentic scripts for a natural reading flow.
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
                  <span className="text-xs font-semibold">Arabic always at the heart</span>
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
                <h3 className="text-xl sm:text-3xl font-semibold text-text-primary tracking-tight mt-2">Always know where you are. Explore whenever you want.</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white border border-border p-4">
                  <div className="text-xs font-semibold text-text-primary">Your Daily Path</div>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">One-tap resume keeps your main study checkpoint safe and ready.</p>
                </div>
                <div className="rounded-2xl bg-white border border-border p-4">
                  <div className="text-xs font-semibold text-text-primary">Free Exploration</div>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">Read or listen to any of the 114 Surahs without disrupting your saved place.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
