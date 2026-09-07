"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Is Qurus really 100% free? Are there any ads or subscriptions?",
    answer:
      "Yes, Qurus is completely free forever. There are zero ads, zero paid tiers, no subscriptions, and no data tracking. It is open-source and built purely as a sincere tool for reflection.",
  },
  {
    question: "Can I listen with my screen turned off or in my pocket?",
    answer:
      "Yes. Qurus supports background audio and lock-screen controls. You can lock your phone and put it in your pocket while walking, exercising, or commuting.",
  },
  {
    question: "Do I need an active internet connection to use Qurus?",
    answer:
      "All Arabic Quran text and translation text are stored directly inside the app, so reading works completely offline. Audio streams quickly over Wi-Fi or mobile data and caches automatically on your device for smooth listening.",
  },
  {
    question: "Where are my personal reflection notes and voice memos saved?",
    answer:
      "Completely on your own device. Qurus has no user accounts, no passwords, and no cloud servers. Your personal reflections, bookmarks, and voice memos physically never leave your phone.",
  },
  {
    question: "What verified text and translation sources are used?",
    answer:
      "The Arabic text follows the verified Uthmani script (Hafs). All translations and recitations are verified from trusted, scholarly archives (including Fateh Muhammad Jalandhari for Urdu, Sahih International for English, and EveryAyah audio recordings).",
  },
  {
    question: "Which languages are supported?",
    answer:
      "Qurus supports complete verse-by-verse translation and spoken recitation in 5 languages: Urdu, English, Bengali, Turkish, and French. Each language is displayed in its native typography and script direction.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-surface/40 border-t border-border-subtle overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-text-primary text-balance">
            Answers to common questions.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            Everything you need to know about installation, privacy, audio, and offline reading.
          </p>
        </motion.div>

        {/* FAQ Accordion List with Motion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="bg-white rounded-2xl sm:rounded-3xl border border-border overflow-hidden transition-colors shadow-2xs hover:border-primary/30"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-text-primary text-base sm:text-lg tracking-tight">
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0 ${
                      isOpen ? "rotate-180 bg-primary text-white" : "bg-surface text-text-secondary"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-7 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-border-subtle">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
