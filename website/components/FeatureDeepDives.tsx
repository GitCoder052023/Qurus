"use client";

import { motion } from "motion/react";

export default function FeatureDeepDives() {
  const features = [
    {
      title: "One Verse at a Time",
      tag: "Focused Reading",
      description:
        "Qurus keeps the Quran readable and approachable: one verse, its Arabic text, and its Urdu translation in clear focus. Adjust the reading experience, repeat a verse, or save it for later without visual clutter.",
      highlights: ["Adjustable Arabic & Urdu sizes", "One-tap verse repeat loop", "Clean bookmarks & stars"],
      icon: (
        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      title: "Arabic + Urdu Audio in Sync",
      tag: "Understand as You Listen",
      description:
        "Listen to the Arabic recitation, followed naturally by a clear spoken Urdu translation. Qurus keeps the two together so listening becomes a practical way to follow and understand each verse.",
      highlights: ["Mishary Alafasy & Abdul Basit", "Shamshad Ali Khan Urdu", "Speed 0.75x to 1.5x"],
      icon: (
        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ),
    },
    {
      title: "Private Written & Voice Notes",
      tag: "Personal by Design",
      description:
        "When a verse raises a question or stays on your mind, capture the thought beside it. Write a reflection or record a voice memo directly on the verse, with notes kept on your device.",
      highlights: ["Record voice memos", "Zero signups or emails", "Never uploaded to cloud"],
      icon: (
        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      ),
    },
    {
      title: "Screen-Off Pocket Audio",
      tag: "Built for Everyday Life",
      description:
        "Keep listening while you walk, commute, or move through your day. Lock the screen and use your lock-screen or headphone controls to pause, skip, and repeat verses without staying glued to your phone.",
      highlights: ["Lock-screen media controls", "Headphone button support", "Saves phone battery"],
      icon: (
        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 md:py-36 bg-canvas overflow-hidden">
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
            The Qurus Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">
            Everything is designed around understanding.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            Qurus removes friction between you and the Quran, giving you a focused place to read, listen, reflect, and return to the verses that matter to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              className="doppelrand-shell transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="doppelrand-core p-7 sm:p-9 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface border border-border text-text-secondary">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-border-subtle flex flex-wrap gap-2">
                  {feat.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface text-text-secondary border border-border"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
