"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#experience", label: "Try Live Demo", index: "01" },
  { href: "/#everyday-life", label: "Daily Routine", index: "02" },
  { href: "/#features", label: "Features", index: "03" },
  { href: "/#story", label: "Why I Built It", index: "04" },
  { href: "/#faq", label: "Questions", index: "05" },
];

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

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.05 + i * 0.04,
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-xs md:hidden"
            aria-hidden="true"
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
          <div className="flex items-center justify-between gap-2">
            {/* Brand Mark */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center gap-2 sm:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-1 shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-1 ring-primary/25 shadow-xs flex items-center justify-center bg-surface shrink-0"
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
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-text-primary whitespace-nowrap">
                  Qurus
                </span>
                <span className="font-arabic text-primary text-xs sm:text-sm select-none opacity-90 whitespace-nowrap">
                  (قُرُوص)
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-primary-muted text-primary border border-primary/15">
                  v2.3.0
                </span>
              </div>
            </Link>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-text-secondary">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-150 hover:text-primary py-1 px-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action CTAs */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
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

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/#download"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group hidden xs:inline-flex sm:inline-flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 pr-1.5 sm:pr-2 py-1.5 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-xs transition-all"
                >
                  <span className="whitespace-nowrap">Download APK</span>
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-y-[-1px] shrink-0">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
                </Link>
              </motion.div>

              {/* Mobile Hamburger / Close Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-4 h-3.5 relative flex flex-col justify-between items-center">
                  <span
                    className={`w-full h-0.5 bg-current rounded-full origin-center transition-all duration-300 ease-out ${
                      mobileMenuOpen ? "rotate-45 translate-y-[5.5px]" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current rounded-full origin-center transition-all duration-300 ease-out ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-[5.5px]" : ""
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden md:hidden"
              >
                <div className="mt-3 pt-3 border-t border-black/8 flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-muted/60 active:bg-primary-muted transition-colors"
                      >
                        <span className="text-[14px]">{link.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-text-tertiary">
                            {link.index}
                          </span>
                          <svg
                            className="w-3.5 h-3.5 text-text-tertiary opacity-70"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Action Section Inside Mobile Menu */}
                  <motion.div
                    custom={NAV_LINKS.length}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-3 pt-3 border-t border-black/8 flex flex-col gap-2"
                  >
                    <Link
                      href="/#download"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-primary text-white font-semibold text-xs shadow-xs hover:bg-primary-hover active:scale-[0.99] transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Download Free APK (112 MB)</span>
                      </div>
                      <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full">
                        v2.3.0
                      </span>
                    </Link>

                    <a
                      href="https://github.com/GitCoder052023/Qurus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-surface border border-black/5 text-text-secondary font-medium text-xs hover:text-text-primary hover:bg-surface-hover transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span>View Source on GitHub</span>
                    </a>
                  </motion.div>

                  {/* Micro Footer Tag */}
                  <div className="pt-2 pb-1 text-center">
                    <p className="text-[11px] text-text-tertiary">
                      100% Free • No Ads • Works Offline
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
}

