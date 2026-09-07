"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Is Qurus really 100% free? Are there any hidden ads or subscriptions?",
    answer:
      "Yes, Qurus is completely free forever. There are zero ads, zero subscriptions, zero paid tiers, and zero tracking SDKs. It is open source under the permissive MIT License.",
  },
  {
    question: "How do I install the APK file on my Android phone?",
    answer:
      "It takes about 30 seconds: 1) Tap 'Download Free APK' on this page. 2) When the download finishes, tap the downloaded file. 3) If your phone prompts you to allow installs from your browser, tap 'Allow', then tap 'Install'. Open the app and start reading!",
  },
  {
    question: "How does the Arabic and Urdu audio sync work?",
    answer:
      "When you tap play on any verse, Qurus recites the original Arabic text first (recited by Mishary Alafasy or Abdul Basit). As soon as the verse finishes, it immediately plays the spoken Urdu translation (by Shamshad Ali Khan) for that exact verse. You can also toggle to 'Arabic Only' or 'Urdu Only' at any time.",
  },
  {
    question: "Can I listen with my phone screen turned off or in my pocket?",
    answer:
      "Yes! Qurus has full background playback and lock-screen media controls. You can lock your phone and put it in your pocket while at the gym, commuting on the train, or taking a walk.",
  },
  {
    question: "Do I need an internet connection to use Qurus?",
    answer:
      "All Arabic Quran text and Fateh Muhammad Jalandhry Urdu translation text are bundled inside the app and work 100% offline. Audio recitations stream on demand over Wi-Fi or mobile data and cache smoothly on your device.",
  },
  {
    question: "Where are my personal reflection notes and voice memos saved?",
    answer:
      "100% on your own device. Qurus has no user accounts, no passwords, and no cloud servers storing your personal thoughts. Your private reflections and voice notes physically never leave your phone.",
  },
  {
    question: "What verified text and translation sources are used?",
    answer:
      "The Arabic text follows the verified Uthmani script (Hafs). The Urdu translation is the renowned text of Fateh Muhammad Jalandhry. Audio recitations are sourced via the verified EveryAyah archive.",
  },
  {
    question: "How does the new Motivation Engine and Streak-Saver work in v2.3.0?",
    answer:
      "Qurus actively helps you build and protect a daily Tadabbur habit without turning study into a stressful race. Features include a real-time countdown to midnight, gentle progressive evening reminders, configurable daily targets (e.g. 5, 10, or 20 Ayahs), and celebration moments with haptic feedback and reflective wisdom. The moment you complete your daily reflection, all remaining reminders for that evening are automatically dismissed.",
  },
  {
    question: "What is the difference between my structured journey and free exploration?",
    answer:
      "In v2.3.0, Qurus keeps your sequential study path distinct from free browsing. You can resume your sequential reading checkpoint with one tap from the reader or home screen. Meanwhile, you can freely browse, bookmark, annotate, read, or listen to any of the 114 Surahs—or review past verses—without ever resetting or disrupting your forward journey checkpoint.",
  },
  {
    question: "Which 5 languages and translations are supported in Qurus?",
    answer:
      "Qurus supports complete verse-by-verse translation and authentic recitation pairing across 5 languages: Urdu (Fateh Muhammad Jalandhari / Shamshad Ali Khan), English (Sahih International / Ibrahim Walk), Bengali (Muhiuddin Khan / Bangla Quran Audio), Turkish (Diyanet İşleri / Diyanet Vakfı), and French (Muhammad Hamidullah / Youssouf Leclerc). Each language dynamically renders in its authentic typography, text direction (RTL/LTR), and paired audio.",
  },
  {
    question: "How do the smarter notifications and reminder previews work?",
    answer:
      "Daily Reminders and Streak-Savers are configured smoothly during onboarding, requesting system notification permissions at the appropriate moment. Qurus detects real-time permission status with a direct recovery action if notifications were turned off in Android settings. You can also test and preview your notification reminders directly inside Settings before enabling them.",
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
