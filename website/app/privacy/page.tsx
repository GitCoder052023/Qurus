import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Qurus privacy-first architecture: 100% on-device study content, zero user accounts, zero advertisements, and transparent anonymous analytics.",
  alternates: {
    canonical: "https://qurus.app/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
              Legal & Privacy
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary">
              Qurus Privacy Policy
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
                className="w-5 h-5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Our Privacy-First Commitment at a Glance</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-text-secondary">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>
                  <strong>Zero User Accounts:</strong> No sign-up, email, passwords,
                  or social logins required.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>
                  <strong>100% On-Device Study:</strong> Notes, highlights, bookmarks,
                  and voice memos stay physically on your device.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>
                  <strong>Zero Advertisements:</strong> No ad networks, no trackers,
                  and no selling of user profiles.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>
                  <strong>Microphone Only on Demand:</strong> Microphone access is used
                  strictly when you record a spoken reflection.
                </span>
              </div>
            </div>
          </div>

          {/* Main Legal Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-border shadow-xs space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">
            <section className="space-y-4">
              <p>
                Qurus (“Qurus,” “we,” “us,” or “our”) is a Quran reading, listening,
                and personal reflection application created by Hamdan Khubaib.
              </p>
              <p>
                This Privacy Policy explains what information Qurus handles, what is
                stored on your device, what limited analytics and feedback information
                is transmitted to third-party services, and how those services are used.
              </p>
              <p>
                Our approach is privacy-first: personal study content is kept on-device,
                while the analytics system is intentionally limited to anonymous
                identifiers and sanitized product-usage information. User-generated Quran
                reflections and voice recordings are not sent to our analytics service.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                1. Information We Do Not Require
              </h2>
              <p>
                Qurus does not require you to create an account. We do not require your
                name, password, phone number, social-media account, or profile information
                in order to use the core application.
              </p>
              <p>
                Qurus does not provide a social feed, public profile, comments system, or
                user-to-user messaging service.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                2. Personal Study Data Stored on Your Device
              </h2>
              <p>
                Qurus allows you to create and maintain personal study information,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Bookmarks and verse highlights</li>
                <li>Written reflection notes and spoken voice notes</li>
                <li>Recently studied verses and last studied location</li>
                <li>Daily Tadabbur goals and reading streak information</li>
                <li>Structured journey checkpoints</li>
                <li>Reading and audio preferences</li>
                <li>Onboarding state and notification reminder settings</li>
              </ul>
              <p>
                The current Qurus application stores this information locally on your
                device using on-device storage. Qurus does not provide a server-side
                account or cloud synchronization system for this personal study
                information.
              </p>
              <p>
                Your written reflections and voice recordings remain on the device on
                which you created them. They are not uploaded to Qurus or third parties.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                3. Voice Notes and Microphone Access
              </h2>
              <p>
                Qurus includes an optional voice-note feature. When you choose to record a
                voice note, Qurus requests permission to use your device microphone. The
                microphone is used solely to create the recording you explicitly request.
              </p>
              <p>
                Voice recordings are associated with the relevant verse and stored
                locally on your device. Qurus does not operate a server that receives or
                stores your voice-note recordings as part of the current application
                architecture.
              </p>
              <p>
                Qurus analytics may record the duration, in seconds, of a completed
                voice-note recording solely to understand feature usage. The recording
                itself, its binary data, and any transcript are never transmitted.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                4. Anonymous Analytics and Product Usage
              </h2>
              <p>
                Qurus uses <strong>PostHog</strong> for lightweight product analytics. The
                purpose is to understand high-level application health and feature adoption,
                such as active-user counts and app stability.
              </p>
              <h3 className="text-base font-semibold text-text-primary">
                Anonymous Identifier
              </h3>
              <p>
                On first use, Qurus generates a random UUID v4 identifier locally. It is
                not derived from your name, email address, phone number, contacts,
                advertising ID, or hardware identifier.
              </p>
              <h3 className="text-base font-semibold text-text-primary">
                What We Intentionally Do NOT Send
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Written reflection or journal text</li>
                <li>Voice recordings or audio binaries</li>
                <li>Voice-note transcripts</li>
                <li>Quran verse text or search query strings</li>
                <li>Passwords, contacts, or personal credentials</li>
              </ul>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                5. Contact Us and In-App Feedback
              </h2>
              <p>
                Qurus provides a native Contact Us & Feedback feature within the app.
                A feedback submission may include a category, the message you write, app
                version, platform, and an optional email address if you voluntarily provide
                one to receive a reply.
              </p>
              <p>
                For support requests, questions, or privacy concerns, you may contact the
                creator directly:
              </p>
              <div className="p-4 rounded-xl bg-surface border border-border text-sm">
                <p className="font-semibold text-text-primary">Hamdan Khubaib</p>
                <p className="text-text-secondary">Creator & Maintainer of Qurus</p>
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
                  Repository:{" "}
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

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                6. Third-Party Infrastructure
              </h2>
              <p>
                Qurus utilizes verified external infrastructure to stream audio and deliver
                content:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>
                  <strong>EveryAyah CDN:</strong> Provides public Quran recitation audio
                  streams.
                </li>
                <li>
                  <strong>PostHog:</strong> Ingests anonymous app reliability metrics.
                </li>
                <li>
                  <strong>Expo / EAS:</strong> Handles application build and runtime
                  updates.
                </li>
              </ul>
            </section>

            <section className="space-y-4 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-semibold text-text-primary">
                7. Security and Data Retention
              </h2>
              <p>
                Because personal study content is stored strictly on your local device,
                deleting the app or clearing device data will permanently remove that
                information. We encourage keeping standard device backups.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
