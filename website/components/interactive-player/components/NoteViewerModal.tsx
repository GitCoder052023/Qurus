"use client";

import React from "react";
import { StudyNoteData } from "../../../types/player";
import { VoiceNotePlayer } from "./VoiceNotePlayer";

export interface NoteViewerModalProps {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText?: string;
  translationText?: string;
  isRTL?: boolean;
  note: StudyNoteData;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function NoteViewerModal({
  surahName,
  surahNumber,
  ayahNumber,
  arabicText,
  translationText,
  isRTL = true,
  note,
  onClose,
  onEdit,
  onDelete,
}: NoteViewerModalProps) {
  const isVoice = Boolean(note.voiceNote);
  const isText = Boolean(note.text && note.text.trim());

  const dateStr = new Date(note.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[28px] sm:rounded-3xl border-t sm:border border-[#D8E4E0] shadow-2xl max-w-lg w-full max-h-[88vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 duration-200">
        {/* Mobile drag handle indicator */}
        <div className="w-10 h-1 rounded-full bg-[#D8E4E0] mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#D8E4E0] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-[#4A605C] hover:text-[#122824] text-sm font-medium py-1 px-2 -ml-2 rounded-lg"
          >
            Done
          </button>

          <div className="text-center">
            <h3 className="text-base font-bold text-[#122824]">Reflection</h3>
            <div className="text-xs font-semibold text-[#0E6B5C]">
              {surahName} {surahNumber}:{ayahNumber}
            </div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="text-[#0E6B5C] hover:text-[#0A5347] p-1.5 rounded-lg"
            title="Edit reflection"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Verse Context Box */}
          <div className="p-3.5 rounded-2xl bg-[#F2F7F5] border border-[#D8E4E0] space-y-2">
            {arabicText && (
              <p className="font-arabic text-lg sm:text-xl text-right text-[#0C1C1A] leading-relaxed">
                {arabicText}
              </p>
            )}
            {translationText && (
              <p
                className={`${
                  isRTL ? "font-urdu text-right" : "font-sans text-left"
                } text-xs sm:text-sm text-[#2A3E3A] leading-relaxed`}
                dir={isRTL ? "rtl" : "ltr"}
              >
                {translationText}
              </p>
            )}
          </div>

          {/* Written reflection */}
          {isText && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#4A605C]">Written reflection</span>
              <p className="text-sm text-[#122824] whitespace-pre-wrap leading-relaxed bg-[#F2F7F5]/50 p-4 rounded-2xl border border-[#EEF3F1]">
                {note.text}
              </p>
            </div>
          )}

          {/* Voice reflection */}
          {isVoice && note.voiceNote && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#4A605C]">Voice reflection</span>
              <VoiceNotePlayer voiceNote={note.voiceNote} />
            </div>
          )}

          {/* Footer Metadata & Actions */}
          <div className="pt-4 border-t border-[#EEF3F1] flex items-center justify-between text-xs text-[#7E9490]">
            <span>{dateStr} • 100% On-Device</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onEdit}
                className="px-3 py-1.5 rounded-xl border border-[#D8E4E0] text-[#122824] hover:bg-[#F2F7F5] font-medium transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="px-3 py-1.5 rounded-xl text-[#C45C56] hover:bg-[#C45C56]/10 font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
