import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use governing the open-source Qurus application, disclaimers, MIT licensing, content availability, and user responsibilities.",
  alternates: {
    canonical: "https://qurus.app/terms",
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              <span>←</span>
              <span>Back to Sanctuary</span>
            </Link>
          </div>

          {/* Document Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Legal & Terms
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary">
              Qurus Terms of Use
            </h1>
            <p className="mt-3 text-sm text-text-secondary">
              <strong>Effective Date:</strong> September 6, 2026 •{" "}
              <strong>Last Updated:</strong> September 6, 2026
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-2xs">
            <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent-gold"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Terms of Use Summary</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-text-secondary">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent-gold mt-1.5 shrink-0" />
                <span>
                  <strong>Open Source Software:</strong> Qurus source code is licensed
                  under the permissive MIT License.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent-gold mt-1.5 shrink-0" />
                <span>
                  <strong>Study & Reflection Tool:</strong> Qurus is designed for
                  individual reading and does not replace qualified scholars.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent-gold mt-1.5 shrink-0" />
                <span>
                  <strong>Content Ownership:</strong> You retain complete ownership of
                  your private written and spoken reflections.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accent-gold mt-1.5 shrink-0" />
                <span>
                  <strong>No Account Liability:</strong> As a client-only app, you are
                  responsible for maintaining backups of your local notes.
                </span>
              </div>
            </div>
          </div>

          {/* Main Legal Body */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-border shadow-xs space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">
            <section className="space-y-4">
              <p>Welcome to Qurus.</p>
              <p>
                These Terms of Use (“Terms”) govern your use of the Qurus application
                and related project materials operated or maintained by Hamdan Khubaib
                (“Qurus,” “we,” “us,” or “our”).
              </p>
              <p>
                By installing, accessing, or using Qurus, you agree to these Terms. If
                you do not agree with them, do not use the application.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                1. What Qurus Is
              </h2>
              <p>
                Qurus is a reading, listening, and personal reflection application
                intended to make Quran study more accessible, quiet, and focused in
                everyday life. Features include:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Verse-by-verse Quran reading and audio synchronization</li>
                <li>Original Arabic recitation and spoken Urdu translation</li>
                <li>Verse search, bookmarks, and color highlights</li>
                <li>Private written reflection notes and spoken voice memos</li>
                <li>Reading streaks, time-aware check-ins, and audio controls</li>
              </ul>
              <p>
                Qurus is a software tool for personal reading and reflection. It is not
                intended to replace qualified scholars, teachers, translators, or
                academic institutions.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                2. Open-Source Software & MIT License
              </h2>
              <p>
                Qurus is open-source software. The underlying source code is
                distributed under the MIT License. The MIT License governs your rights
                to use, copy, modify, distribute, and sublicense the source code.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                3. Religious and Interpretive Disclaimer
              </h2>
              <p>
                Qurus presents Quranic Arabic text, translations, and recitation audio
                resources. Translations and explanatory notes are interpretations of the
                Arabic original.
              </p>
              <p>
                Qurus does not claim that every translation, transcription, metadata
                field, or categorization is perfect or suitable as the sole authority for
                religious rulings. Qurus is not a fatwa service.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                4. Your Personal Content
              </h2>
              <p>
                You retain ownership of the personal reflections and voice notes you
                create in Qurus. Because the application stores study content locally on
                your device, you are responsible for maintaining any backups you
                consider necessary.
              </p>
              <p>
                You must not use Qurus to create, store, or distribute content in a
                manner that violates applicable law or infringes upon the rights of
                others.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                5. Acceptable Use
              </h2>
              <p>
                You may use Qurus for lawful personal, educational, scholarly, and
                reflective purposes. You agree not to interfere with the application,
                introduce malicious code, or abuse external CDN infrastructure.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                6. Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Qurus is provided on an “AS IS”
                and “AS AVAILABLE” basis. We disclaim warranties of merchantability,
                fitness for a particular purpose, and uninterrupted availability.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                7. Contact Information
              </h2>
              <p>
                For questions regarding these Terms or project matters, please contact:
              </p>
              <div className="p-4 rounded-xl bg-surface border border-border text-sm">
                <p className="font-semibold text-text-primary">Hamdan Khubaib</p>
                <p className="text-text-secondary">Creator of Qurus</p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:hamdankhubaib959@gmail.com"
                    className="text-primary font-semibold hover:underline"
                  >
                    hamdankhubaib959@gmail.com
                  </a>
                </p>
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/GitCoder052023/Qurus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    github.com/GitCoder052023/Qurus
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
