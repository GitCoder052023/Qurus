"use client";

import React from "react";

export function PlayerAppInvitationFooter() {
  return (
    <div className="bg-surface/90 p-5 sm:p-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          Want all 114 Surahs, background audio, and offline reflections?
        </h4>
        <p className="text-xs text-text-secondary mt-0.5">
          Install the complete Qurus sanctuary on your Android phone in 30 seconds.
        </p>
      </div>

      <a
        href="#download"
        className="group inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-xs transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shrink-0"
      >
        <span>Get for Android</span>
        <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-[-1px]">
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
      </a>
    </div>
  );
}
