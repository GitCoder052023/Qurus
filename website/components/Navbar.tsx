"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-6 pt-3 sm:pt-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto mx-auto max-w-5xl rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border border-black/8 shadow-[0_12px_36px_rgba(14,107,92,0.08)] py-2.5 px-4 sm:px-6"
            : "bg-white/80 backdrop-blur-lg border border-black/5 shadow-[0_4px_24px_rgba(14,107,92,0.03)] py-3 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Mark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-2"
          >
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-primary/25 shadow-xs flex items-center justify-center bg-surface"
            >
              <Image
                src="/images/icon.png"
                alt="Qurus App Icon"
                width={32}
                height={32}
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-tight text-text-primary">
                Qurus
              </span>
              <span className="font-arabic text-primary text-sm select-none opacity-90">
                (قُرُوص)
              </span>
              <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-primary-muted text-primary border border-primary/15">
                v2.2.0
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-text-secondary">
            <Link
              href="#experience"
              className="transition-colors duration-150 hover:text-primary py-1 px-1"
            >
              Try Live Demo
            </Link>
            <Link
              href="#everyday-life"
              className="transition-colors duration-150 hover:text-primary py-1 px-1"
            >
              Daily Routine
            </Link>
            <Link
              href="#features"
              className="transition-colors duration-150 hover:text-primary py-1 px-1"
            >
              Features
            </Link>
            <Link
              href="#story"
              className="transition-colors duration-150 hover:text-primary py-1 px-1"
            >
              Why I Built It
            </Link>
            <Link
              href="#faq"
              className="transition-colors duration-150 hover:text-primary py-1 px-1"
            >
              Questions
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/GitCoder052023/Qurus"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-colors"
              title="View Qurus on GitHub (Free & Open Source)"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#download"
              className="group inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-sm transition-all"
            >
              <span>Download APK</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-y-[-1px]">
                <svg
                  className="w-3 h-3"
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

            {/* Mobile Hamburger Morph */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <div className="w-4 h-3.5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden mt-3 pt-3 border-t border-black/8 flex flex-col gap-1 text-sm font-medium text-text-secondary"
            >
              <Link
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-surface hover:text-primary transition-colors"
              >
                <span>Try Live Demo</span>
                <span className="text-xs font-mono text-text-tertiary">01</span>
              </Link>
              <Link
                href="#everyday-life"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-surface hover:text-primary transition-colors"
              >
                <span>Daily Routine</span>
                <span className="text-xs font-mono text-text-tertiary">02</span>
              </Link>
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-surface hover:text-primary transition-colors"
              >
                <span>Features</span>
                <span className="text-xs font-mono text-text-tertiary">03</span>
              </Link>
              <Link
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-surface hover:text-primary transition-colors"
              >
                <span>Why I Built It</span>
                <span className="text-xs font-mono text-text-tertiary">04</span>
              </Link>
              <Link
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-surface hover:text-primary transition-colors"
              >
                <span>Common Questions</span>
                <span className="text-xs font-mono text-text-tertiary">05</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
