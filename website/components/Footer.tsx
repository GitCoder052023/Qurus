"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-20 text-xs text-text-secondary">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Col 1: Brand & Bio (2 cols wide on desktop) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-primary/20 shadow-xs flex items-center justify-center bg-surface">
                <Image
                  src="/images/icon.png"
                  alt="Qurus Logo"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-base text-text-primary">
                Qurus
              </span>
              <span className="font-arabic text-primary text-base select-none">
                (قُرُوص)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-primary-muted text-primary border border-primary/20">
                v2.3.0
              </span>
            </div>

            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              A free, simple Quran reading and listening app built for everyday life. Verse-by-verse Arabic paired with clear Urdu translation, 100% private notes, and screen-off audio.
            </p>

            <p className="font-editorial text-sm italic text-text-tertiary max-w-sm leading-relaxed pt-2">
              “If Qurus helps even one person discover a verse that brings peace and honest understanding, every line of code has done its job.”
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-primary uppercase tracking-wider text-[11px] font-mono">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#experience" className="hover:text-primary transition-colors">
                  Try Live Demo
                </Link>
              </li>
              <li>
                <Link href="/#everyday-life" className="hover:text-primary transition-colors">
                  Daily Routine
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#story" className="hover:text-primary transition-colors">
                  Why I Built It
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  Common Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Distribution & Open Source */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-primary uppercase tracking-wider text-[11px] font-mono">
              Code & Distribution
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/api/download" className="text-primary font-semibold hover:underline flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download APK (v2.3.0)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/GitCoder052023/Qurus/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub Releases Mirror
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/GitCoder052023/Qurus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Source Code (MIT)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/GitCoder052023/Qurus/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  MIT Permissive License
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-primary uppercase tracking-wider text-[11px] font-mono">
              Legal & Direct Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li className="pt-2">
                <div className="text-[10px] font-mono uppercase text-text-tertiary mb-1">
                  Founder & Support
                </div>
                <a
                  href="mailto:hamdankhubaib959@gmail.com"
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline break-all"
                  title="Send email to Hamdan Khubaib"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>hamdankhubaib959@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credential Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-tertiary">
          <div>
            © {new Date().getFullYear()} Qurus. Created with intention by{" "}
            <strong className="text-text-primary font-medium">Hamdan Khubaib</strong>.
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <span>Uthmani Script</span>
            <span>•</span>
            <span>Fateh Muhammad Jalandhry</span>
            <span>•</span>
            <span>EveryAyah Archive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
