"use client";

import { motion } from "motion/react";

const LANGUAGES_DATA = [
  {
    flag: "🇵🇰",
    name: "Urdu",
    nativeName: "اردو",
    translator: "Fateh Muhammad Jalandhari",
    reciter: "Shamshad Ali Khan",
    story:
      "A revered classical translation renowned across the subcontinent for its poetic sobriety, paired with the solemn, measured cadence of Shamshad Ali Khan.",
    verseArabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    verseTranslation: "شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے",
    isRTL: true,
  },
  {
    flag: "🇬🇧",
    name: "English",
    nativeName: "English",
    translator: "Sahih International",
    reciter: "Ibrahim Walk",
    story:
      "The benchmark contemporary English rendering, known for doctrinal precision and clear prose, paired with Ibrahim Walk’s warm, articulate narration.",
    verseArabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
    verseTranslation: "[All] praise is [due] to Allah, Lord of the worlds —",
    isRTL: false,
  },
  {
    flag: "🇧🇩",
    name: "Bengali",
    nativeName: "বাংলা",
    translator: "Muhiuddin Khan",
    reciter: "Bangla Quran Audio",
    story:
      "The definitive Bengali translation that shaped generations of readers in Bangladesh and Bengal, paired with melodic, reverent recitation.",
    verseArabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    verseTranslation: "যিনি পরম করুণাময় ও অতি দয়ালু।",
    isRTL: false,
  },
  {
    flag: "🇹🇷",
    name: "Turkish",
    nativeName: "Türkçe",
    translator: "Diyanet İşleri Başkanlığı",
    reciter: "Diyanet Vakfı",
    story:
      "The trusted official translation of Turkey’s Presidency of Religious Affairs, rendered with clarity and paired with authentic studio recitation.",
    verseArabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
    verseTranslation: "Hesap ve ceza gününün (âhiret gününün) mâlikidir.",
    isRTL: false,
  },
  {
    flag: "🇫🇷",
    name: "French",
    nativeName: "Français",
    translator: "Dr. Muhammad Hamidullah",
    reciter: "Youssouf Leclerc",
    story:
      "The celebrated academic translation by one of the 20th century’s greatest Islamic scholars, celebrated for its linguistic fidelity and depth.",
    verseArabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    verseTranslation: "C'est Toi [Seul] que nous adorons, et c'est Toi [Seul] dont nous implorons secours.",
    isRTL: false,
  },
];

export default function SupportedLanguages() {
  return (
    <section id="languages" className="py-24 md:py-36 bg-canvas border-b border-border-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Narrative Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Speaking to the Heart
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-text-primary text-balance">
            The ear hears the Arabic. <br className="hidden sm:inline" />
            <span className="font-editorial italic font-normal text-primary">
              The heart understands in its own tongue.
            </span>
          </h2>
          <p className="mt-6 text-text-secondary text-base sm:text-lg leading-relaxed text-balance">
            For millions, studying the Quran has meant juggling a physical book in one hand and an audio player in the other, or watching disconnected video subtitles drift past. Qurus v2.3.0 unites Arabic recitation with line-by-line spoken translations across five languages—so the meaning is never detached from the verse.
          </p>
        </motion.div>

        {/* The 5-Language Editorial Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LANGUAGES_DATA.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="doppelrand-shell flex flex-col"
            >
              <div className="doppelrand-core p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Flag & Language Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl">{lang.flag}</span>
                      <div>
                        <h3 className="text-lg font-bold text-text-primary tracking-tight">
                          {lang.name}
                        </h3>
                        <span className="text-xs font-arabic text-primary font-medium">
                          {lang.nativeName}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface border border-border">
                      {lang.isRTL ? "RTL Script" : "LTR Script"}
                    </span>
                  </div>

                  {/* Story behind the scholar & voice */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {lang.story}
                  </p>

                  {/* Verse Excerpt Showcase */}
                  <div className="p-4 rounded-2xl bg-surface/80 border border-border space-y-3">
                    <p className="font-arabic text-xl sm:text-2xl text-right text-text-primary leading-loose">
                      {lang.verseArabic}
                    </p>
                    <p
                      className={`${
                        lang.isRTL ? "font-urdu text-right" : "font-sans text-left"
                      } text-xs sm:text-sm text-text-secondary pt-2 border-t border-border-subtle leading-relaxed`}
                      dir={lang.isRTL ? "rtl" : "ltr"}
                    >
                      {lang.verseTranslation}
                    </p>
                  </div>
                </div>

                {/* Scholar & Reciter Signature Credits */}
                <div className="mt-6 pt-5 border-t border-border-subtle space-y-1.5 text-xs text-text-tertiary">
                  <div className="flex items-center justify-between">
                    <span>Translation:</span>
                    <strong className="text-text-primary font-medium truncate max-w-[170px]">
                      {lang.translator}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Recitation Voice:</span>
                    <strong className="text-text-primary font-medium truncate max-w-[170px]">
                      {lang.reciter}
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* 6th Complementary Editorial Tile: The Engineering Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="doppelrand-shell flex flex-col md:col-span-2 lg:col-span-1"
          >
            <div className="doppelrand-core p-7 sm:p-8 flex-1 flex flex-col justify-between bg-gradient-to-br from-white via-surface to-primary-light/30">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center font-bold text-base mb-5 shadow-2xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-text-primary tracking-tight mb-2">
                  Zero Mechanical Friction
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  Switching languages inside Qurus dynamically reconfigures the entire reading sanctuary: native typography, proportional font scaling, writing direction, and matched high-fidelity audio streams.
                </p>

                <p className="text-text-secondary text-xs leading-relaxed">
                  All translations are bundled offline. Recitation audios are cached seamlessly so you can study uninterrupted, whether you are on a flight or in the quiet of dawn.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between text-xs text-primary font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Verse by verse pairing</span>
                </span>
                <span className="font-mono text-[11px] text-text-tertiary">v2.3.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
