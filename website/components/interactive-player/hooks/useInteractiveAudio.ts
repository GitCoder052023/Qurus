"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LanguageKey } from "../../../types/player";
import { SAMPLE_AYAHS } from "../../../data/sampleAyahs";

export type AudioMode = "both" | "arabic" | "translation";
export type PlaybackPhase = "arabic" | "translation" | "idle";

export function useInteractiveAudio() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>("urdu");
  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackPhase, setPlaybackPhase] = useState<PlaybackPhase>("idle");
  const [audioMode, setAudioMode] = useState<AudioMode>("both");

  const recitationAudioRef = useRef<HTMLAudioElement | null>(null);
  const playPhaseRef = useRef<(phase: "arabic" | "translation", ayahIdx: number) => void>(() => {});

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recitationAudioRef.current) {
        recitationAudioRef.current.pause();
      }
    };
  }, []);

  const playPhase = useCallback(
    (phase: "arabic" | "translation", ayahIdx: number) => {
      const ayah = SAMPLE_AYAHS[ayahIdx];
      const src =
        phase === "arabic"
          ? ayah.arabicAudio
          : ayah.translations[selectedLanguage].audio;

      if (!recitationAudioRef.current) {
        recitationAudioRef.current = new Audio();
      }

      const audio = recitationAudioRef.current;
      audio.src = src;
      audio.load();

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setPlaybackPhase(phase);
          setActiveAyahIndex(ayahIdx);
        })
        .catch((e) => {
          console.warn("Playback interrupted:", e);
          setIsPlaying(false);
          setPlaybackPhase("idle");
        });

      audio.onended = () => {
        if (phase === "arabic" && audioMode === "both") {
          playPhaseRef.current("translation", ayahIdx);
        } else if (audioMode === "both" && phase === "translation" && ayahIdx === 0) {
          playPhaseRef.current("arabic", 1);
        } else {
          setIsPlaying(false);
          setPlaybackPhase("idle");
        }
      };
    },
    [audioMode, selectedLanguage]
  );

  useEffect(() => {
    playPhaseRef.current = playPhase;
  }, [playPhase]);

  const handleTogglePlay = (index: number) => {
    if (activeAyahIndex === index && isPlaying) {
      if (recitationAudioRef.current) {
        recitationAudioRef.current.pause();
      }
      setIsPlaying(false);
      setPlaybackPhase("idle");
    } else {
      const startPhase = audioMode === "translation" ? "translation" : "arabic";
      playPhase(startPhase, index);
    }
  };

  const handleLanguageChange = (lang: LanguageKey) => {
    if (isPlaying && recitationAudioRef.current) {
      recitationAudioRef.current.pause();
      setIsPlaying(false);
      setPlaybackPhase("idle");
    }
    setSelectedLanguage(lang);
  };

  const stopPlayback = () => {
    if (recitationAudioRef.current && isPlaying) {
      recitationAudioRef.current.pause();
      setIsPlaying(false);
      setPlaybackPhase("idle");
    }
  };

  return {
    selectedLanguage,
    setSelectedLanguage,
    activeAyahIndex,
    setActiveAyahIndex,
    isPlaying,
    playbackPhase,
    audioMode,
    setAudioMode,
    handleTogglePlay,
    handleLanguageChange,
    stopPlayback,
  };
}
