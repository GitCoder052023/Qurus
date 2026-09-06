"use client";

import { useState } from "react";

export default function ApkDownloadSection() {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <section id="download" className="py-20 md:py-32 bg-canvas">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Direct Installation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary">
            Install Qurus on your Android phone.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg leading-relaxed">
            No app store accounts. No tracking. Download the official APK and start
            exploring in less than one minute.
          </p>
        </div>

        {/* Main Download Card */}
        <div className="bg-gradient-to-b from-surface to-white rounded-3xl p-6 sm:p-12 border border-border shadow-[0_16px_50px_rgba(18,40,36,0.07)] text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            {/* Version & OS Tag */}
            <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-semibold text-text-secondary mb-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-border shadow-2xs">
                <svg
                  className="w-3.5 h-3.5 text-primary"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1568-.2716.064-.6178-.2077-.7746-.2715-.1567-.6177-.064-.7745.2077L16.828 8.8718C15.385 8.2132 13.757 7.844 12 7.844c-1.7569 0-3.3849.3692-4.828 1.0278L5.1047 5.3173c-.1569-.2717-.503-.3644-.7746-.2077-.2716.1568-.3645.503-.2076.7746l1.996 3.4572C2.795 11.2331.5 15.2081.5 19.822h23c0-4.6139-2.295-8.5889-5.6185-10.5006" />
                </svg>
                <span>Android 8.0+</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-border shadow-2xs">
                Version 2.2.0
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-border shadow-2xs font-mono">
                ~112 MB
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              Qurus for Android
            </h3>
            <p className="text-text-secondary text-sm sm:text-base max-w-lg mb-8">
              Full offline capability, verified bilingual audio, and persistent lock-screen
              controls. MIT Licensed open-source software.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="/api/download"
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white text-base font-semibold shadow-[0_10px_25px_rgba(14,107,92,0.25)] transition-all duration-200 active:scale-98"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Direct APK Download</span>
              </a>

              <a
                href="https://github.com/GitCoder052023/Qurus/releases/tag/v2.2.0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-surface border border-border text-text-primary text-sm font-semibold shadow-2xs transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 text-text-secondary"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>GitHub Releases Mirror</span>
              </a>
            </div>

            {/* Technical Verification Toggle */}
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="mt-6 text-xs text-text-tertiary hover:text-text-primary underline cursor-pointer transition-colors"
            >
              {showTechnicalDetails
                ? "Hide Package & Integrity Details"
                : "View Package, Permissions & Integrity"}
            </button>

            {showTechnicalDetails && (
              <div className="mt-5 p-4 rounded-xl bg-white border border-border text-left w-full max-w-lg text-xs space-y-2 animate-in fade-in">
                <div className="flex justify-between">
                  <span className="text-text-tertiary">Package Name:</span>
                  <span className="font-mono text-text-primary">
                    com.hamdan_khubaib.Qurus
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-tertiary">Current Build:</span>
                  <span className="font-mono text-text-primary">v2.2.0 (Release)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-tertiary">Required Android:</span>
                  <span className="text-text-primary">Android 8.0 (API 26) or newer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-tertiary">Permissions:</span>
                  <span className="text-text-primary">Microphone (for local voice notes), Audio playback</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-tertiary">License:</span>
                  <span className="text-text-primary font-medium">MIT Open Source</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
