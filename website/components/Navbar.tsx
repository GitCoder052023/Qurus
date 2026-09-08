"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackDownload, trackGitHub } from "@/utils/analytics";

const NAV_LINKS = [
  { href: "/#experience", label: "Demo" },
  { href: "/#overview", label: "Experience" },
  { href: "/#comparison", label: "Why Qurus" },
  { href: "/#story", label: "Story" },
  { href: "/#faq", label: "Questions" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 pt-3 sm:pt-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto mx-auto max-w-5xl transition-all duration-300 ${
            mobileMenuOpen
              ? "bg-[#FAFCFA] border border-primary/15 shadow-[0_20px_50px_rgba(14,107,92,0.16)] rounded-[26px] p-4 sm:p-5"
              : scrolled
              ? "bg-white/95 backdrop-blur-xl border border-black/8 shadow-[0_12px_36px_rgba(14,107,92,0.08)] rounded-full py-2.5 px-3.5 sm:px-6"
              : "bg-white/90 backdrop-blur-lg border border-black/5 shadow-[0_4px_24px_rgba(14,107,92,0.03)] rounded-full py-2.5 sm:py-3 px-3.5 sm:px-6"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center gap-2 sm:gap-2.5 rounded-full shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-1 ring-primary/25 shadow-xs bg-surface shrink-0"
              >
                <Image src="/images/icon.png" alt="Qurus App Icon" width={32} height={32} className="object-cover" priority />
              </motion.div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-text-primary">Qurus</span>
                <span className="font-arabic text-primary text-xs sm:text-sm opacity-90">(قُرُوص)</span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-primary-muted text-primary border border-primary/15">v2.3.0</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-5 text-[13px] font-medium text-text-secondary">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-primary py-1 px-1">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href="https://github.com/GitCoder052023/Qurus"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGitHub("navbar", { destination: "repository" })}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-colors"
              >
                GitHub
              </a>
              <Link
                href="/#download"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackDownload("navbar_desktop");
                }}
                className="hidden sm:inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-xs transition-all"
              >
                Download APK
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">↓</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-colors"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                <span className="text-lg leading-none">{mobileMenuOpen ? "×" : "☰"}</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden pt-4 mt-4 border-t border-border-subtle"
              >
                <div className="grid gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-primary-muted hover:text-primary">
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/#download"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      trackDownload("navbar_mobile");
                    }}
                    className="mt-2 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold text-center"
                  >
                    Download Free APK
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
}
