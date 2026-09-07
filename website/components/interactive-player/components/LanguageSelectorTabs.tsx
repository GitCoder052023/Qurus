"use client";

import React from "react";
import { LanguageKey } from "../../../types/player";
import { LANGUAGES } from "../../../data/languages";

interface LanguageSelectorTabsProps {
  selectedLanguage: LanguageKey;
  onSelectLanguage: (key: LanguageKey) => void;
}

export function LanguageSelectorTabs({
  selectedLanguage,
  onSelectLanguage,
}: LanguageSelectorTabsProps) {
  return (
    <div className="bg-surface/90 px-4 py-3 sm:px-6 border-b border-border flex items-center justify-between gap-2 overflow-x-auto">
      <span className="text-[11px] font-mono uppercase text-text-tertiary tracking-wider shrink-0 hidden sm:inline">
        Language:
      </span>
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {(Object.keys(LANGUAGES) as LanguageKey[]).map((key) => {
          const lang = LANGUAGES[key];
          const isSelected = selectedLanguage === key;
          return (
            <button
              key={key}
              onClick={() => onSelectLanguage(key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-white shadow-xs font-semibold"
                  : "bg-white text-text-secondary hover:text-text-primary hover:bg-surface border border-border"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
