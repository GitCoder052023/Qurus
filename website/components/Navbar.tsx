"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(18,40,36,0.06)] border-b border-border-subtle py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Link */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-border flex items-center justify-center bg-surface transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/images/icon.png"
              alt="Qurus App Icon"
              width={36}
              height={36}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-tight text-text-primary">
              Qurus
            </span>
            <span className="font-arabic text-primary text-base select-none">
              (قُرُوص)
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary-muted text-primary border border-primary/20">
              v2.2.0
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-text-secondary">
          <Link
            href="#experience"
            className="transition-colors duration-150 hover:text-primary"
          >
            Live Sanctuary
          </Link>
          <Link
            href="#everyday-life"
            className="transition-colors duration-150 hover:text-primary"
          >
            In Daily Motion
          </Link>
          <Link
            href="#features"
            className="transition-colors duration-150 hover:text-primary"
          >
            Crafted Features
          </Link>
          <Link
            href="#story"
            className="transition-colors duration-150 hover:text-primary"
          >
            Founder’s Story
          </Link>
          <Link
            href="#faq"
            className="transition-colors duration-150 hover:text-primary"
          >
            FAQ
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/GitCoder052023/Qurus"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
            title="View Qurus on GitHub (MIT Licensed)"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href="#download"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary-hover shadow-xs transition-all duration-200 active:scale-98"
          >
            <svg
              className="w-4 h-4"
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
            <span>Install APK</span>
          </a>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-border shadow-lg px-5 py-4 flex flex-col gap-1 text-sm font-medium text-text-secondary animate-in fade-in slide-in-from-top-2">
          <Link
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-surface hover:text-primary transition-colors active:bg-surface"
          >
            <span>Live Sanctuary</span>
            <span className="text-text-tertiary text-xs">01</span>
          </Link>
          <Link
            href="#everyday-life"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-surface hover:text-primary transition-colors active:bg-surface"
          >
            <span>In Daily Motion</span>
            <span className="text-text-tertiary text-xs">02</span>
          </Link>
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-surface hover:text-primary transition-colors active:bg-surface"
          >
            <span>Crafted Features</span>
            <span className="text-text-tertiary text-xs">03</span>
          </Link>
          <Link
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-surface hover:text-primary transition-colors active:bg-surface"
          >
            <span>Founder’s Story</span>
            <span className="text-text-tertiary text-xs">04</span>
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-surface hover:text-primary transition-colors active:bg-surface"
          >
            <span>FAQ</span>
            <span className="text-text-tertiary text-xs">05</span>
          </Link>
          <div className="mt-2 pt-3 border-t border-border-subtle flex items-center justify-between px-2">
            <a
              href="https://github.com/GitCoder052023/Qurus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-text-secondary hover:text-primary py-1"
            >
              GitHub (MIT License)
            </a>
            <span className="text-xs text-text-tertiary font-mono">v2.2.0 • Android 8+</span>
          </div>
        </div>
      )}
    </header>
  );
}
