"use client";

import React, { useState } from "react";
import { VoiceNoteData } from "../../../types/player";
import { VoiceNoteComposer } from "./VoiceNoteComposer";

export interface NoteEditorModalProps {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText?: string;
  translationText?: string;
  isRTL?: boolean;
  initialNote?: string;
  initialVoiceNote?: VoiceNoteData | null;
  noteId?: string;
  onSave: (text: string, voiceNote: VoiceNoteData | null) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export function NoteEditorModal({
  surahName,
  surahNumber,
  ayahNumber,
  arabicText,
  translationText,
  isRTL = true,
  initialNote = "",
  initialVoiceNote = null,
  noteId,
  onSave,
  onDelete,
  onClose,
}: NoteEditorModalProps) {
  const [noteText, setNoteText] = useState(initialNote);
  const [voiceNote, setVoiceNote] = useState<VoiceNoteData | null>(initialVoiceNote);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  const canSave = Boolean(noteText.trim() || voiceNote);
  const isEditing = Boolean(noteId || initialNote.trim() || initialVoiceNote);

  const handleSave = () => {
    if (!canSave || isRecordingVoice) return;
    onSave(noteText, voiceNote);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[28px] sm:rounded-3xl border-t sm:border border-[#D8E4E0] shadow-2xl max-w-lg w-full max-h-[88vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 duration-200">
        {/* Mobile drag handle indicator */}
        <div className="w-10 h-1 rounded-full bg-[#D8E4E0] mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />
        {/* Header matching NoteEditorModal.tsx */}
        <div className="px-5 py-3.5 border-b border-[#D8E4E0] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-[#4A605C] hover:text-[#122824] text-sm font-medium py-1 px-2 -ml-2 rounded-lg"
          >
            Cancel
          </button>

          <div className="text-center">
            <h3 className="text-base font-bold text-[#122824]">
              {noteId ? "Edit Reflection" : "New Reflection"}
            </h3>
            <div className="text-xs font-semibold text-[#0E6B5C]">
              {surahName} {surahNumber}:{ayahNumber}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isRecordingVoice || (!canSave && !isEditing)}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              !isRecordingVoice && (canSave || isEditing)
                ? "bg-[#0E6B5C] text-white hover:bg-[#0A5347] shadow-xs cursor-pointer"
                : "bg-[#0E6B5C]/40 text-white/70 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Verse Snippet Preview */}
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

          {/* Written Reflection Section */}
          <div>
            <label className="block text-xs font-semibold text-[#4A605C] mb-2">
              Written reflection
            </label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="What thoughts, questions, or insights did this verse spark? Write here, or record a voice note below."
              rows={4}
              className="w-full text-sm text-[#122824] bg-white border border-[#D8E4E0] rounded-2xl p-4 focus:outline-hidden focus:border-[#0E6B5C] transition-colors leading-relaxed placeholder:text-[#7E9490] resize-y"
            />
          </div>

          {/* VoiceNoteComposer Section (Replicating VoiceNoteComposer.tsx) */}
          <VoiceNoteComposer
            value={voiceNote}
            onChange={setVoiceNote}
            onRecordingChange={setIsRecordingVoice}
          />

          {/* Delete Button if editing */}
          {isEditing && onDelete && (
            <div className="pt-2 border-t border-[#EEF3F1]">
              <button
                type="button"
                onClick={onDelete}
                className="w-full py-3 rounded-xl border border-[#C45C56]/30 text-[#C45C56] hover:bg-[#C45C56]/5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Delete this note</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
