"use client";

import React from "react";
import { motion } from "motion/react";
import { LanguageMeta } from "../../../types/player";
import { AudioMode } from "../hooks/useInteractiveAudio";

interface PlayerTopBarProps {
  currentLang: LanguageMeta;
  audioMode: AudioMode;
  onSetAudioMode: (mode: AudioMode) => void;
}

export function PlayerTopBar({
  currentLang,
  audioMode,
  onSetAudioMode,
}: PlayerTopBarProps) {
  return (
    <div className="bg-surface/80 px-4 py-3.5 sm:px-6 sm:py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 ring-1 ring-primary/20">
          1
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-text-primary truncate">Surah Al-Faatiha</h3>
            <span className="text-xs text-text-tertiary font-serif shrink-0">(The Opening)</span>
          </div>
          <div className="text-[11px] text-text-secondary truncate">
            Arabic: <strong className="font-medium text-text-primary">Mishary Alafasy</strong> • {currentLang.name}: <strong className="font-medium text-text-primary">{currentLang.reciter}</strong>
          </div>
        </div>
      </div>

      {/* Audio Mode Segmented Control with Motion Tap */}
      <div className="grid grid-cols-3 sm:flex items-center bg-white/90 rounded-full p-1 border border-border text-xs w-full sm:w-auto text-center shadow-2xs">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onSetAudioMode("both")}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 text-center cursor-pointer ${
            audioMode === "both"
              ? "bg-primary text-white font-medium shadow-xs"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Arabic + {currentLang.name}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onSetAudioMode("arabic")}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 text-center cursor-pointer ${
            audioMode === "arabic"
              ? "bg-primary text-white font-medium shadow-xs"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Arabic Only
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onSetAudioMode("translation")}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 text-center cursor-pointer ${
            audioMode === "translation"
              ? "bg-primary text-white font-medium shadow-xs"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {currentLang.name} Only
        </motion.button>
      </div>
    </div>
  );
}
