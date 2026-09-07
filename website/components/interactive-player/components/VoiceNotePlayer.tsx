"use client";

import React, { useState, useRef, useEffect } from "react";
import { VoiceNoteData } from "../../../types/player";
import { formatDurationMs } from "../../../utils/formatDuration";

export interface VoiceNotePlayerProps {
  voiceNote: VoiceNoteData;
  compact?: boolean;
  onRemove?: () => void;
}

export function VoiceNotePlayer({ voiceNote, compact = false, onRemove }: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalMs = voiceNote.durationMillis || 1000;
  const progress = Math.min(1, currentTimeMs / totalMs);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(voiceNote.uri);
    }
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio.src !== voiceNote.uri) {
        audio.src = voiceNote.uri;
        audio.load();
      }
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.warn);

      audio.ontimeupdate = () => {
        setCurrentTimeMs(audio.currentTime * 1000);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTimeMs(0);
      };
    }
  };

  return (
    <div
      className={`rounded-2xl border border-[#EEF3F1] bg-[#EEEAF8] flex items-center gap-3 transition-all ${
        compact ? "p-2 min-h-11" : "p-3 sm:p-3.5 min-h-14"
      }`}
    >
      {/* Play / Pause Circular Button */}
      <button
        type="button"
        onClick={togglePlayback}
        className="w-9 h-9 rounded-full bg-[#5548A0] text-white flex items-center justify-center shadow-2xs hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
        title={isPlaying ? "Pause voice note" : "Play voice note"}
      >
        {isPlaying ? (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>

      {/* Track & Time */}
      <div className="flex-1 min-w-0 space-y-1">
        {!compact && (
          <div className="text-[11px] font-bold text-[#5548A0]">Voice note</div>
        )}
        <div className="h-1.5 rounded-full bg-[#D8E4E0] overflow-hidden">
          <div
            className="h-full bg-[#5548A0] transition-all duration-100"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <div className="text-[11px] text-[#4A605C] font-mono">
          {isPlaying || currentTimeMs > 400
            ? `${formatDurationMs(currentTimeMs)} / ${formatDurationMs(totalMs)}`
            : formatDurationMs(totalMs)}
        </div>
      </div>

      {/* Remove Button */}
      {onRemove && (
        <button
          type="button"
          onClick={() => {
            if (audioRef.current) audioRef.current.pause();
            onRemove();
          }}
          className="p-1.5 rounded-full text-[#7E9490] hover:text-[#C45C56] transition-colors"
          title="Remove voice note"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
      )}
    </div>
  );
}
