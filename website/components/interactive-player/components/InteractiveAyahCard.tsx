"use client";

import React from "react";
import { SampleAyah, LanguageKey, LanguageMeta, StudyNoteData } from "../../../types/player";
import { formatDurationMs } from "../../../utils/formatDuration";

export interface InteractiveAyahCardProps {
  ayah: SampleAyah;
  index: number;
  selectedLanguage: LanguageKey;
  currentLang: LanguageMeta;
  isThisAyahActive: boolean;
  isPlaying: boolean;
  playbackPhase: "arabic" | "translation" | "idle";
  isBookmarked: boolean;
  isHighlighted: boolean;
  copiedAyah: number | null;
  ayahNotes: StudyNoteData[];
  isNotesCollapsed: boolean;
  onTogglePlay: (index: number) => void;
  onToggleBookmark: (index: number) => void;
  onToggleHighlight: (index: number) => void;
  onShare: (ayah: SampleAyah) => void;
  onOpenNewNote: (ayah: SampleAyah) => void;
  onOpenViewNote: (ayah: SampleAyah, note: StudyNoteData) => void;
  onToggleNotesCollapsed: (ayahNumber: number) => void;
}

export function InteractiveAyahCard({
  ayah,
  index,
  selectedLanguage,
  currentLang,
  isThisAyahActive,
  isPlaying,
  playbackPhase,
  isBookmarked,
  isHighlighted,
  copiedAyah,
  ayahNotes,
  isNotesCollapsed,
  onTogglePlay,
  onToggleBookmark,
  onToggleHighlight,
  onShare,
  onOpenNewNote,
  onOpenViewNote,
  onToggleNotesCollapsed,
}: InteractiveAyahCardProps) {
  const isThisAyahPlaying = isThisAyahActive && isPlaying;
  const isRecitingArabic = isThisAyahPlaying && playbackPhase === "arabic";
  const isRecitingTranslation = isThisAyahPlaying && playbackPhase === "translation";
  const trans = ayah.translations[selectedLanguage];

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        isThisAyahActive
          ? "bg-[#E8F2EF] border-[#0E6B5C] shadow-xs"
          : isHighlighted
          ? "bg-[#F8ECD8] border-[#C46B1A]"
          : "bg-white border-[#D8E4E0] hover:border-[#0E6B5C]/40"
      }`}
    >
      {/* Top Header: Ayah Number Badge & Status Indicators */}
      <div className="px-4 sm:px-6 pt-3.5 sm:pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
              isThisAyahActive
                ? "bg-[#0E6B5C] text-white"
                : "bg-[#DCE8E4] text-[#122824]"
            }`}
          >
            {ayah.numberInSurah}
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2">
          {isHighlighted && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F8ECD8] border border-[#C46B1A]/30 text-[11px] font-medium text-[#C46B1A]">
              <span>★</span>
              <span className="hidden xs:inline sm:inline">Important</span>
            </div>
          )}
          {isBookmarked && (
            <span className="text-[#C45C56]" title="Bookmarked">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {/* Quranic Arabic Text */}
      <div className="px-4 sm:px-6 py-2.5 sm:py-3 text-right">
        <p
          className={`font-arabic text-xl sm:text-2xl md:text-3xl leading-[2.1] sm:leading-[2.2] tracking-normal transition-all duration-300 ${
            isRecitingArabic
              ? "text-[#0C1C1A] font-bold bg-[#E8F2EF] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl"
              : "text-[#0C1C1A]"
          }`}
        >
          {ayah.arabicText}
        </p>
      </div>

      {/* Active Language Translation Text */}
      <div
        className={`px-4 sm:px-6 pb-3.5 sm:pb-4 ${
          currentLang.isRTL ? "text-right" : "text-left"
        }`}
        dir={currentLang.isRTL ? "rtl" : "ltr"}
      >
        <p
          className={`${
            currentLang.isRTL ? "font-urdu" : "font-sans"
          } text-sm sm:text-base md:text-lg leading-[1.8] sm:leading-[2.0] transition-all duration-300 ${
            isRecitingTranslation
              ? "text-[#2A3E3A] font-semibold bg-[#F8E8EB] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl"
              : "text-[#2A3E3A]"
          }`}
        >
          {trans.text}
        </p>
        <p className="mt-1 text-[10px] sm:text-[11px] text-[#7E9490]">
          — {currentLang.name}: {currentLang.author}
        </p>
      </div>

      {/* Sleek, Compact & Collapsible Personal Reflection Notes (Qurus App Style) */}
      {ayahNotes.length > 0 && (
        <div className="mx-5 sm:mx-6 mb-4 rounded-xl bg-[#EEEAF8] border border-[#D8E4E0] overflow-hidden">
          {/* Header Bar */}
          <div
            onClick={() => onToggleNotesCollapsed(ayah.numberInSurah)}
            className="px-3 py-2 flex items-center justify-between cursor-pointer select-none hover:bg-[#5548A0]/5 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <svg
                className="w-3.5 h-3.5 text-[#5548A0] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span className="text-xs font-bold text-[#5548A0]">
                Reflections
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#5548A0]/15 text-[#5548A0] text-[11px] font-bold">
                {ayahNotes.length}
              </span>
              {isNotesCollapsed && (
                <span className="text-xs text-[#4A605C] truncate max-w-[200px] sm:max-w-[320px]">
                  •{" "}
                  {ayahNotes[0].text
                    ? ayahNotes[0].text.trim()
                    : ayahNotes[0].voiceNote
                    ? `Voice note (${formatDurationMs(ayahNotes[0].voiceNote.durationMillis)})`
                    : "Reflection"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNewNote(ayah);
                }}
                className="px-2 py-0.5 rounded-md bg-white border border-[#D8E4E0] text-xs font-semibold text-[#5548A0] hover:bg-[#5548A0]/10 transition-colors"
              >
                + Add
              </button>
              <svg
                className={`w-3.5 h-3.5 text-[#7E9490] transition-transform duration-200 ${
                  isNotesCollapsed ? "" : "rotate-180"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Expanded Compact Notes List */}
          {!isNotesCollapsed && (
            <div className="p-2 pt-0 space-y-1.5">
              {ayahNotes.map((n) => {
                const isVoice = Boolean(n.voiceNote);
                const isText = Boolean(n.text && n.text.trim());
                const dateStr = new Date(n.updatedAt || n.createdAt).toLocaleDateString(
                  undefined,
                  {
                    month: "short",
                    day: "numeric",
                  }
                );
                const previewSnippet = isText
                  ? n.text.trim()
                  : isVoice
                  ? `Voice note (${formatDurationMs(n.voiceNote?.durationMillis || 0)})`
                  : "Reflection";

                return (
                  <div
                    key={n.id}
                    onClick={() => onOpenViewNote(ayah, n)}
                    className="p-2.5 rounded-lg bg-white border border-[#EEF3F1] flex items-center justify-between gap-3 cursor-pointer hover:border-[#5548A0]/30 transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-[#5548A0]/10 flex items-center justify-center shrink-0">
                        {isVoice && !isText ? (
                          <svg
                            className="w-3.5 h-3.5 text-[#5548A0]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            className="w-3.5 h-3.5 text-[#5548A0]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-[#122824] truncate font-sans">
                        {previewSnippet}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 text-[#7E9490]">
                      <span className="text-[11px]">{dateStr}</span>
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Ayah Actions Toolbar (Mobile-first app navigation bar) */}
      <div className="px-1.5 sm:px-3 py-1.5 sm:py-2 bg-[#F2F7F5]/50 border-t border-[#EEF3F1] grid grid-cols-5 sm:flex sm:items-center sm:justify-between text-xs font-medium gap-0.5 sm:gap-1">
        {/* Play / Pause */}
        <button
          type="button"
          onClick={() => onTogglePlay(index)}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-3 rounded-xl transition-colors min-h-[44px] cursor-pointer ${
            isThisAyahPlaying
              ? "bg-[#0E6B5C]/15 text-[#0E6B5C] font-semibold"
              : "text-[#4A605C] hover:text-[#122824]"
          }`}
        >
          {isThisAyahPlaying ? (
            <>
              <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              <span className="text-[10px] sm:text-xs">Pause</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span className="text-[10px] sm:text-xs">Play</span>
            </>
          )}
        </button>

        {/* Bookmark */}
        <button
          type="button"
          onClick={() => onToggleBookmark(index)}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-3 rounded-xl transition-colors min-h-[44px] cursor-pointer ${
            isBookmarked
              ? "text-[#C4455A] font-semibold"
              : "text-[#4A605C] hover:text-[#122824]"
          }`}
        >
          <svg
            className="w-4 h-4 sm:w-3.5 sm:h-3.5"
            viewBox="0 0 24 24"
            fill={isBookmarked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-[10px] sm:text-xs">{isBookmarked ? "Saved" : "Bookmark"}</span>
        </button>

        {/* Highlight / Mark */}
        <button
          type="button"
          onClick={() => onToggleHighlight(index)}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-3 rounded-xl transition-colors min-h-[44px] cursor-pointer ${
            isHighlighted
              ? "text-[#C46B1A] font-semibold"
              : "text-[#4A605C] hover:text-[#122824]"
          }`}
        >
          <svg
            className="w-4 h-4 sm:w-3.5 sm:h-3.5"
            viewBox="0 0 24 24"
            fill={isHighlighted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-[10px] sm:text-xs">{isHighlighted ? "Marked" : "Mark"}</span>
        </button>

        {/* Note Button */}
        <button
          type="button"
          onClick={() => onOpenNewNote(ayah)}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-3 rounded-xl transition-colors min-h-[44px] cursor-pointer ${
            ayahNotes.length > 0
              ? "text-[#5548A0] font-semibold bg-[#5548A0]/10"
              : "text-[#4A605C] hover:text-[#122824]"
          }`}
        >
          <svg
            className="w-4 h-4 sm:w-3.5 sm:h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span className="text-[10px] sm:text-xs">
            {ayahNotes.length > 0 ? `Notes (${ayahNotes.length})` : "Note"}
          </span>
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={() => onShare(ayah)}
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-2 rounded-xl text-[#7E9490] hover:text-[#122824] transition-colors min-h-[44px] relative cursor-pointer"
          title="Copy verse"
        >
          {copiedAyah === ayah.numberInSurah ? (
            <span className="text-[10px] font-bold text-[#0E6B5C]">Copied!</span>
          ) : (
            <>
              <svg
                className="w-4 h-4 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span className="text-[10px] sm:text-xs">Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
