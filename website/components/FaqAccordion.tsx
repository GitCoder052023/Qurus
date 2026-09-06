"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Why is Qurus distributed directly as an APK?",
    answer:
      "Direct APK distribution allows Qurus to remain 100% independent, zero-cost, and immediately up to date without Google Play Store commercial restrictions or mandatory in-app purchasing requirements. It takes just 30 seconds to download and install on any Android phone running Android 8.0 or newer.",
  },
  {
    question: "Is Qurus completely free, and does it have ads?",
    answer:
      "Yes, Qurus is 100% free and open-source under the permissive MIT License. There are zero advertisements, zero sponsored feeds, zero paid paywalls, and zero upsells. It is built purely as a focused reading sanctuary for everyday life.",
  },
  {
    question: "How does the synchronized bilingual recitation work?",
    answer:
      "When you play an ayah in Qurus, it plays the original Arabic recitation (from reciters like Mishary Rashid Alafasy or Abdul Basit) followed immediately by Shamshad Ali Khan's clear spoken Urdu translation for that exact verse. You can also toggle playback mode to 'Arabic Only' or 'Urdu Only' depending on your preference.",
  },
  {
    question: "Where are my personal reflection notes and voice memos stored?",
    answer:
      "100% physically on your device. Qurus has no user accounts, no login system, and no remote database for user content. Your private notes, written thoughts, and voice reflections are never uploaded to any cloud server or analyzed by algorithms.",
  },
  {
    question: "Can I listen with my phone screen off or locked while moving?",
    answer:
      "Yes! Qurus features full background playback and persistent lock-screen media controls. You can put your phone in your pocket while lifting weights at the gym, commuting on the train, or taking an evening walk.",
  },
  {
    question: "Can I use Qurus offline without an active internet connection?",
    answer:
      "All Quranic Arabic text and Fateh Muhammad Jalandhry Urdu translation text are bundled locally within the app and work entirely offline. Audio recitations stream over network on demand, with smooth caching.",
  },
  {
    question: "What are the verified scholarly sources used in Qurus?",
    answer:
      "The Arabic text is verified Uthmani script (Hafs). The Urdu translation is the renowned work of Fateh Muhammad Jalandhry. The Urdu spoken audio is recited by Shamshad Ali Khan, and Arabic recitations are sourced via the verified EveryAyah open archive.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-surface/40 border-t border-border-subtle">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-text-secondary text-base leading-relaxed">
            Everything you need to know about privacy, audio, installation, and
            sources.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-border overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-text-primary text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full bg-surface flex items-center justify-center text-text-secondary transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 bg-primary text-white" : ""
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-text-secondary leading-relaxed border-t border-border-subtle animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
