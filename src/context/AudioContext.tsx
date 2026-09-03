import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Platform } from 'react-native';
import { createAudioPlayer, setAudioModeAsync, AudioPlayer, AudioStatus } from 'expo-audio';
import { RECITERS, getAudioUrl, SURAHS } from '../data/surahs';
import { Reciter, SurahMetadata } from '../types';
import { useStudyState } from './StudyContext';

interface AudioContextType {
  // Playback State
  currentSurahNumber: number | null;
  currentAyahNumber: number | null;
  currentSurah: SurahMetadata | null;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  reciter: Reciter;
  isFullPlayerVisible: boolean;

  // Controls
  playAyah: (surahNumber: number, ayahNumber: number) => void;
  pause: () => void;
  resume: () => void;
  togglePlayPause: () => void;
  nextAyah: () => void;
  previousAyah: () => void;
  seekTo: (seconds: number) => void;
  setSpeed: (speed: number) => void;
  setReciter: (reciter: Reciter) => void;
  openFullPlayer: () => void;
  closeFullPlayer: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const { updateLastStudied, preferences, updatePreferences } = useStudyState();

  const [currentSurahNumber, setCurrentSurahNumber] = useState<number | null>(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] = useState(preferences.playbackSpeed || 1.0);
  const [isFullPlayerVisible, setIsFullPlayerVisible] = useState(false);

  // Reciter
  const activeReciter = RECITERS.find((r) => r.id === preferences.reciterId) || RECITERS[0];
  const [reciter, setReciterState] = useState<Reciter>(activeReciter);

  // AudioPlayer instance reference
  const playerRef = useRef<AudioPlayer | null>(null);
  const lastFinishedAyahKeyRef = useRef<string>('');
  const currentSurahNumberRef = useRef<number | null>(null);
  const currentAyahNumberRef = useRef<number | null>(null);
  const reciterRef = useRef<Reciter>(activeReciter);
  const playbackSpeedRef = useRef<number>(playbackSpeed);

  currentSurahNumberRef.current = currentSurahNumber;
  currentAyahNumberRef.current = currentAyahNumber;
  reciterRef.current = reciter;
  playbackSpeedRef.current = playbackSpeed;

  // Setup Audio Session for background playback
  useEffect(() => {
    async function configureAudio() {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          interruptionMode: 'doNotMix',
        });
      } catch (err) {
        console.warn('Could not set audio mode:', err);
      }
    }
    configureAudio();

    // Create persistent player
    try {
      const player = createAudioPlayer(null, { updateInterval: 250 });
      playerRef.current = player;

      const subscription = player.addListener('playbackStatusUpdate', (status: AudioStatus) => {
        setIsPlaying(status.playing);
        setIsBuffering(status.isBuffering);
        setCurrentTime(status.currentTime || 0);
        if (status.duration && status.duration > 0) {
          setDuration(status.duration);
        }

        // Auto-advance to next ayah when current finishes
        if (status.didJustFinish) {
          const sNum = currentSurahNumberRef.current;
          const aNum = currentAyahNumberRef.current;
          if (sNum !== null && aNum !== null) {
            const key = `${sNum}:${aNum}`;
            if (lastFinishedAyahKeyRef.current !== key) {
              lastFinishedAyahKeyRef.current = key;
              handleAutoAdvance(sNum, aNum);
            }
          }
        }
      });

      return () => {
        subscription?.remove();
        player.remove();
      };
    } catch (err) {
      console.warn('AudioPlayer creation error:', err);
    }
  }, []);

  // Update lockscreen metadata
  const updateLockScreen = (surahNum: number, ayahNum: number, reciterObj: Reciter) => {
    const player = playerRef.current;
    if (!player) return;

    const surah = SURAHS.find((s) => s.number === surahNum);
    const surahName = surah ? surah.englishName : `Surah ${surahNum}`;

    try {
      player.setActiveForLockScreen(true, {
        title: `${surahName} (${surahNum}:${ayahNum})`,
        artist: reciterObj.name,
        albumTitle: 'Qurus Quran Study',
      });
    } catch (e) {
      // May not be supported on all environments
    }
  };

  // Auto Advance Logic
  const handleAutoAdvance = (surahNum: number, ayahNum: number) => {
    const surah = SURAHS.find((s) => s.number === surahNum);
    if (!surah) return;

    if (ayahNum < surah.numberOfAyahs) {
      // Next ayah in current surah
      playAyahInternal(surahNum, ayahNum + 1);
    } else if (surahNum < 114) {
      // Next surah, ayah 1
      playAyahInternal(surahNum + 1, 1);
    } else {
      // Reached the end of the Quran
      setIsPlaying(false);
    }
  };

  // Internal Play Method
  const playAyahInternal = (surahNum: number, ayahNum: number) => {
    const player = playerRef.current;
    if (!player) return;

    setCurrentSurahNumber(surahNum);
    setCurrentAyahNumber(ayahNum);
    updateLastStudied(surahNum, ayahNum);

    const url = getAudioUrl(reciterRef.current.subfolder, surahNum, ayahNum);

    try {
      player.replace(url);
      player.setPlaybackRate(playbackSpeedRef.current);
      player.play();
      updateLockScreen(surahNum, ayahNum, reciterRef.current);
    } catch (err) {
      console.error('Error starting audio playback:', err);
    }
  };

  // Public Play Ayah
  const playAyah = (surahNum: number, ayahNum: number) => {
    lastFinishedAyahKeyRef.current = '';
    playAyahInternal(surahNum, ayahNum);
  };

  const pause = () => {
    if (playerRef.current) {
      try {
        playerRef.current.pause();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const resume = () => {
    if (playerRef.current) {
      try {
        playerRef.current.play();
      } catch (e) {
        console.warn(e);
      }
    } else if (currentSurahNumber && currentAyahNumber) {
      playAyah(currentSurahNumber, currentAyahNumber);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const nextAyah = () => {
    if (currentSurahNumber === null || currentAyahNumber === null) return;
    const surah = SURAHS.find((s) => s.number === currentSurahNumber);
    if (!surah) return;

    if (currentAyahNumber < surah.numberOfAyahs) {
      playAyah(currentSurahNumber, currentAyahNumber + 1);
    } else if (currentSurahNumber < 114) {
      playAyah(currentSurahNumber + 1, 1);
    }
  };

  const previousAyah = () => {
    if (currentSurahNumber === null || currentAyahNumber === null) return;

    if (currentAyahNumber > 1) {
      playAyah(currentSurahNumber, currentAyahNumber - 1);
    } else if (currentSurahNumber > 1) {
      const prevSurah = SURAHS.find((s) => s.number === currentSurahNumber - 1);
      if (prevSurah) {
        playAyah(currentSurahNumber - 1, prevSurah.numberOfAyahs);
      }
    }
  };

  const seekTo = (seconds: number) => {
    if (playerRef.current) {
      try {
        playerRef.current.seekTo(seconds);
      } catch (e) {
        console.warn('Seek error:', e);
      }
    }
  };

  const setSpeed = (speed: number) => {
    setPlaybackSpeedState(speed);
    updatePreferences({ playbackSpeed: speed });
    if (playerRef.current) {
      try {
        playerRef.current.setPlaybackRate(speed);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const setReciter = (newReciter: Reciter) => {
    setReciterState(newReciter);
    updatePreferences({ reciterId: newReciter.id });
    // If currently playing, switch reciter immediately for the current verse
    if (currentSurahNumber !== null && currentAyahNumber !== null) {
      const isWasPlaying = isPlaying;
      playAyah(currentSurahNumber, currentAyahNumber);
      if (!isWasPlaying) {
        pause();
      }
    }
  };

  const openFullPlayer = () => setIsFullPlayerVisible(true);
  const closeFullPlayer = () => setIsFullPlayerVisible(false);

  const currentSurah = currentSurahNumber ? SURAHS.find((s) => s.number === currentSurahNumber) || null : null;

  return (
    <AudioContext.Provider
      value={{
        currentSurahNumber,
        currentAyahNumber,
        currentSurah,
        isPlaying,
        isBuffering,
        currentTime,
        duration,
        playbackSpeed,
        reciter,
        isFullPlayerVisible,
        playAyah,
        pause,
        resume,
        togglePlayPause,
        nextAyah,
        previousAyah,
        seekTo,
        setSpeed,
        setReciter,
        openFullPlayer,
        closeFullPlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
