"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [greeting, setGreeting] = useState("Quiet Contemplation");

  useEffect(() => {
    const computeGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 7) return "Dawn Sanctuary • فجر";
      if (hour >= 7 && hour < 12) return "Morning Contemplation • صباح";
      if (hour >= 12 && hour < 17) return "Midday Respite • ظهر";
      if (hour >= 17 && hour < 21) return "Evening Wind-down • مغرب";
      return "Night Quietude • ليل";
    };

    const timer = setTimeout(() => {
      setGreeting(computeGreeting());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-mesh-glow">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        {/* Dynamic Contextual Greeting Pill */}
        <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-surface border border-border text-[11px] sm:text-xs font-medium text-primary mb-6 sm:mb-8 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="truncate">{greeting}</span>
          <span className="text-border">|</span>
          <span className="text-text-secondary shrink-0">Free & Open Source</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold tracking-tight text-text-primary max-w-4xl leading-[1.15] sm:leading-[1.12]">
          The Quran, verse by verse.{" "}
          <span className="font-editorial italic font-normal text-primary">
            Unobstructed
          </span>
          , in the rhythm of your day.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-normal">
          A calm, intentional reading and listening sanctuary. Hear original
          Arabic recitations followed immediately by line-by-line Urdu
          translations, capture private voice reflections, and listen with your
          screen off while on the move.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          {/* Direct APK Download Button */}
          <a
            href="/api/download"
            className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-medium text-base shadow-[0_8px_20px_rgba(14,107,92,0.22)] transition-all duration-200 active:scale-98"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="font-semibold">Download APK (v2.2.0)</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md font-mono">
              112 MB
            </span>
          </a>

          {/* Interactive Player Anchor */}
          <Link
            href="#experience"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-surface border border-border text-text-primary font-medium text-base shadow-2xs transition-all duration-200 hover:border-primary/40 active:scale-98"
          >
            <svg
              className="w-4 h-4 text-accent-gold"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Try Live Player</span>
          </Link>
        </div>

        {/* Small trust meta under CTAs */}
        <p className="mt-3 text-xs text-text-tertiary">
          Android 8.0+ • Direct download • Instant install in ~30 seconds
        </p>

        {/* Reassurance Badges */}
        <div className="mt-12 pt-8 border-t border-border-subtle grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl text-left">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center shrink-0 text-primary">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-text-primary">
                100% On-Device
              </div>
              <div className="text-[11px] text-text-tertiary">
                Notes never leave your phone
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent-gold-light flex items-center justify-center shrink-0 text-accent-gold">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-text-primary">
                Zero Ads & Feeds
              </div>
              <div className="text-[11px] text-text-tertiary">
                No algorithms or noise
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center shrink-0 text-primary">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-text-primary">
                Bilingual Sync Audio
              </div>
              <div className="text-[11px] text-text-tertiary">
                Arabic + Urdu line-by-line
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-secondary-light flex items-center justify-center shrink-0 text-secondary">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-text-primary">
                MIT Open Source
              </div>
              <div className="text-[11px] text-text-tertiary">
                Built with love by Hamdan
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
