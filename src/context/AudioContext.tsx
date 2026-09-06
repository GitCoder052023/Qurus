import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Platform } from 'react-native';
import { createAudioPlayer, setAudioModeAsync, preload, AudioPlayer, AudioStatus } from 'expo-audio';
import {
  RECITERS,
  getAudioUrl,
  getUrduAudioUrl,
  getEnglishAudioUrl,
  getTranslationAudioUrl,
  URDU_TRANSLATION_RECITER,
  ENGLISH_TRANSLATION_RECITER,
  TRANSLATION_RECITERS,
  TRANSLATION_LANGUAGES,
  TranslationLanguageConfig,
  SURAHS,
} from '../data/surahs';
import { Reciter, SurahMetadata, PlaybackMode, PlaybackPhase, TranslationLanguage } from '../types';
import { useStudyState } from './StudyContext';
import { trackAudioPlayed } from '../lib/analytics';

interface AudioContextType {
  // Playback State
  currentSurahNumber: number | null;
  currentAyahNumber: number | null;
  currentSurah: SurahMetadata | null;
  playbackPhase: PlaybackPhase;
  playbackMode: PlaybackMode;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  reciter: Reciter;
  urduReciter: typeof URDU_TRANSLATION_RECITER;
  translationReciter: TranslationLanguageConfig;
  translationLanguage: TranslationLanguage;
  setTranslationLanguage: (language: TranslationLanguage) => void;
  isFullPlayerVisible: boolean;

  // Controls
  playAyah: (
    surahNumber: number,
    ayahNumber: number,
    phase?: PlaybackPhase,
    options?: { standalone?: boolean }
  ) => void;
  pause: () => void;
  resume: () => void;
  togglePlayPause: () => void;
  nextAyah: () => void;
  previousAyah: () => void;
  seekTo: (seconds: number) => void;
  seekBy: (deltaSeconds: number) => void;
  seekForward: (seconds?: number) => void;
  seekBackward: (seconds?: number) => void;
  setSpeed: (speed: number) => void;
  setReciter: (reciter: Reciter) => void;
  setPlaybackMode: (mode: PlaybackMode) => void;
  openFullPlayer: () => void;
  closeFullPlayer: () => void;
}

// High-resolution Quran cover art for Android SystemUI lockscreen palette extraction (Spotify styling)
export const QURAN_ARTWORK_URL =
  'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=80';

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const { updateLastStudied, preferences, updatePreferences, markAyahCompleted } = useStudyState();

  const [currentSurahNumber, setCurrentSurahNumber] = useState<number | null>(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState<number | null>(null);
  const [playbackPhase, setPlaybackPhase] = useState<PlaybackPhase>('arabic');
  const [playbackMode, setPlaybackModeState] = useState<PlaybackMode>(preferences.playbackMode || 'both');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] = useState(preferences.playbackSpeed || 1.0);
  const [isFullPlayerVisible, setIsFullPlayerVisible] = useState(false);

  // Reciter
  const activeReciter = RECITERS.find((r) => r.id === preferences.reciterId) || RECITERS[0];
  const [reciter, setReciterState] = useState<Reciter>(activeReciter);

  // Translation Language
  const translationLanguage = preferences.translationLanguage || 'urdu';
  const [translationLanguageState, setTranslationLanguageState] = useState<TranslationLanguage>(translationLanguage);

  // AudioPlayer instance reference
  const playerRef = useRef<AudioPlayer | null>(null);
  const lastFinishedKeyRef = useRef<string>('');
  const currentSurahNumberRef = useRef<number | null>(null);
  const currentAyahNumberRef = useRef<number | null>(null);
  const playbackPhaseRef = useRef<PlaybackPhase>('arabic');
  const playbackModeRef = useRef<PlaybackMode>(playbackMode);
  const reciterRef = useRef<Reciter>(activeReciter);
  const playbackSpeedRef = useRef<number>(playbackSpeed);
  const translationLanguageRef = useRef<TranslationLanguage>(translationLanguage);
  const isLockScreenActiveRef = useRef<boolean>(false);
  const isStandaloneRef = useRef<boolean>(false);
  const markAyahCompletedRef = useRef(markAyahCompleted);

  currentSurahNumberRef.current = currentSurahNumber;
  currentAyahNumberRef.current = currentAyahNumber;
  playbackPhaseRef.current = playbackPhase;
  playbackModeRef.current = playbackMode;
  reciterRef.current = reciter;
  playbackSpeedRef.current = playbackSpeed;
  translationLanguageRef.current = preferences.translationLanguage || translationLanguageState;
  markAyahCompletedRef.current = markAyahCompleted;

  // Sync with preferences when loaded
  useEffect(() => {
    if (preferences.playbackMode && preferences.playbackMode !== playbackMode) {
      setPlaybackModeState(preferences.playbackMode);
    }
  }, [preferences.playbackMode]);

  useEffect(() => {
    if (preferences.translationLanguage && preferences.translationLanguage !== translationLanguageState) {
      setTranslationLanguageState(preferences.translationLanguage);
    }
  }, [preferences.translationLanguage, translationLanguageState]);

  // Ref to hold the latest sequencer callback, preventing stale closures in native listeners
  const handleTrackFinishRef = useRef<
    (sNum: number, aNum: number, phase: PlaybackPhase, mode: PlaybackMode) => void
  >(() => {});

  // Setup Audio Session for sustained background playback on Android
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

    try {
      const player = createAudioPlayer(null, {
        updateInterval: 250,
        keepAudioSessionActive: true,
        preferredForwardBufferDuration: 15,
      });
      playerRef.current = player;

      const subscription = player.addListener('playbackStatusUpdate', (status: AudioStatus) => {
        setIsPlaying(status.playing);
        setIsBuffering(status.isBuffering);
        setCurrentTime(status.currentTime || 0);
        if (status.duration && status.duration > 0) {
          setDuration(status.duration);
        }

        // Automatic playback sequencer
        if (status.didJustFinish) {
          const sNum = currentSurahNumberRef.current;
          const aNum = currentAyahNumberRef.current;
          const phase = playbackPhaseRef.current;
          const mode = playbackModeRef.current;

          if (sNum !== null && aNum !== null) {
            const finishKey = `${sNum}:${aNum}:${phase}`;
            if (lastFinishedKeyRef.current !== finishKey) {
              lastFinishedKeyRef.current = finishKey;
              handleTrackFinishRef.current(sNum, aNum, phase, mode);
            }
          }
        }
      });

      return () => {
        subscription?.remove();
        if (isLockScreenActiveRef.current && playerRef.current) {
          try {
            playerRef.current.clearLockScreenControls();
          } catch (_) {}
        }
        player.remove();
      };
    } catch (err) {
      console.warn('AudioPlayer creation error:', err);
    }
  }, []);

  // Compute next track audio URL for preloading ahead of time
  const getNextTrackUrl = (
    sNum: number,
    aNum: number,
    phase: PlaybackPhase,
    mode: PlaybackMode,
    reciterSubfolder: string,
    transLang: TranslationLanguage
  ): string | null => {
    const surah = SURAHS.find((s) => s.number === sNum);
    if (!surah) return null;

    if (mode === 'both') {
      if (phase === 'arabic') {
        // Next is translation for the same Ayah
        return getTranslationAudioUrl(sNum, aNum, transLang);
      } else {
        // Next is Arabic recitation for the next Ayah
        if (aNum < surah.numberOfAyahs) {
          return getAudioUrl(reciterSubfolder, sNum, aNum + 1);
        } else if (sNum < 114) {
          return getAudioUrl(reciterSubfolder, sNum + 1, 1);
        }
      }
    } else if (mode === 'arabic_only') {
      if (aNum < surah.numberOfAyahs) {
        return getAudioUrl(reciterSubfolder, sNum, aNum + 1);
      } else if (sNum < 114) {
        return getAudioUrl(reciterSubfolder, sNum + 1, 1);
      }
    } else if (mode === 'translation_only') {
      if (aNum < surah.numberOfAyahs) {
        return getTranslationAudioUrl(sNum, aNum + 1, transLang);
      } else if (sNum < 114) {
        return getTranslationAudioUrl(sNum + 1, 1, transLang);
      }
    }
    return null;
  };

  // Track sequencer: Arabic -> Urdu -> Next Ayah
  const handleTrackFinish = (
    sNum: number,
    aNum: number,
    phase: PlaybackPhase,
    mode: PlaybackMode
  ) => {
    if (mode === 'both') {
      if (phase === 'arabic') {
        // Step 1: Arabic recitation finished -> Now play Urdu translation for the SAME ayah!
        playAyahInternal(sNum, aNum, 'translation');
      } else {
        // Step 2: Urdu translation finished -> Ayah has been fully explored in both Arabic & Urdu!
        markAyahCompletedRef.current(sNum, aNum, 25);
        if (isStandaloneRef.current) {
          isStandaloneRef.current = false;
          setIsPlaying(false);
          try {
            playerRef.current?.pause();
          } catch (_) {}
          return;
        }
        // Now advance to next ayah in Arabic!
        handleAdvanceToNextAyah(sNum, aNum, 'arabic');
      }
    } else if (mode === 'arabic_only') {
      markAyahCompletedRef.current(sNum, aNum, 18);
      if (isStandaloneRef.current) {
        isStandaloneRef.current = false;
        setIsPlaying(false);
        try {
          playerRef.current?.pause();
        } catch (_) {}
        return;
      }
      handleAdvanceToNextAyah(sNum, aNum, 'arabic');
    } else if (mode === 'translation_only') {
      markAyahCompletedRef.current(sNum, aNum, 18);
      if (isStandaloneRef.current) {
        isStandaloneRef.current = false;
        setIsPlaying(false);
        try {
          playerRef.current?.pause();
        } catch (_) {}
        return;
      }
      handleAdvanceToNextAyah(sNum, aNum, 'translation');
    }
  };
  handleTrackFinishRef.current = handleTrackFinish;

  const handleAdvanceToNextAyah = (sNum: number, aNum: number, targetPhase: PlaybackPhase) => {
    const surah = SURAHS.find((s) => s.number === sNum);
    if (!surah) return;

    if (aNum < surah.numberOfAyahs) {
      // Next Ayah in same Surah
      playAyahInternal(sNum, aNum + 1, targetPhase);
    } else if (sNum < 114) {
      // Next Surah, Ayah 1
      playAyahInternal(sNum + 1, 1, targetPhase);
    } else {
      // Quran finished
      setIsPlaying(false);
    }
  };

  // Internal Play Method
  const playAyahInternal = (surahNum: number, ayahNum: number, phase: PlaybackPhase) => {
    const player = playerRef.current;
    if (!player) return;

    // Immediately keep tracking refs in sync so background sequencer never reads stale data
    currentSurahNumberRef.current = surahNum;
    currentAyahNumberRef.current = ayahNum;
    playbackPhaseRef.current = phase;

    setCurrentSurahNumber(surahNum);
    setCurrentAyahNumber(ayahNum);
    setPlaybackPhase(phase);
    updateLastStudied(surahNum, ayahNum);

    let trackTitle: string;
    let artistName: string;

    const surah = SURAHS.find((s) => s.number === surahNum);
    const surahName = surah ? surah.englishName : `Surah ${surahNum}`;

    if (phase === 'translation') {
      const transLang = translationLanguageRef.current;
      const langConfig = TRANSLATION_LANGUAGES[transLang] || TRANSLATION_LANGUAGES.urdu;
      const cdnUrl = getTranslationAudioUrl(surahNum, ayahNum, transLang) || getUrduAudioUrl(surahNum, ayahNum);
      trackTitle = `${surahName} (${surahNum}:${ayahNum}) • ${langConfig.name} Translation`;
      artistName = `${langConfig.voiceName} (${langConfig.author})`;

      try {
        player.replace(cdnUrl);
        player.setPlaybackRate(playbackSpeedRef.current);
        player.play();
      } catch (err) {
        console.error('Error playing translation CDN audio:', err);
      }
    } else {
      const url = getAudioUrl(reciterRef.current.subfolder, surahNum, ayahNum);
      trackTitle = `${surahName} (${surahNum}:${ayahNum}) • Arabic Recitation`;
      artistName = reciterRef.current.name;
      try {
        player.replace(url);
        player.setPlaybackRate(playbackSpeedRef.current);
        player.play();
      } catch (err) {
        console.error('Error playing Arabic audio:', err);
      }
    }

    try {
      const metadata = {
        title: trackTitle,
        artist: artistName,
        albumTitle: 'Qurus Quran Study',
        artworkUrl: QURAN_ARTWORK_URL,
      };

      const lockScreenOptions = {
        showSeekForward: true,
        showSeekBackward: true,
      };

      if (!isLockScreenActiveRef.current) {
        try {
          player.setActiveForLockScreen(true, metadata, lockScreenOptions);
          isLockScreenActiveRef.current = true;
        } catch (e) {
          // Gracefully ignore if platform/service unavailable
        }
      } else {
        try {
          player.updateLockScreenMetadata(metadata);
        } catch (e) {
          try {
            player.setActiveForLockScreen(true, metadata, lockScreenOptions);
          } catch (_) {}
        }
      }

      // Preload next track in background so ExoPlayer has audio pre-buffered
      const shouldPreload =
        !isStandaloneRef.current ||
        (playbackModeRef.current === 'both' && phase === 'arabic');
      const nextUrl = shouldPreload
        ? getNextTrackUrl(
            surahNum,
            ayahNum,
            phase,
            playbackModeRef.current,
            reciterRef.current.subfolder,
            translationLanguageRef.current
          )
        : null;
      if (nextUrl) {
        preload(nextUrl).catch(() => {});
      }
    } catch (err) {
      console.error('Error in metadata setup:', err);
    }
  };

  // Public Play Ayah
  const playAyah = (
    surahNum: number,
    ayahNum: number,
    phase?: PlaybackPhase,
    options?: { standalone?: boolean }
  ) => {
    lastFinishedKeyRef.current = '';
    isStandaloneRef.current = Boolean(options?.standalone);
    const initialPhase: PlaybackPhase =
      phase || (playbackModeRef.current === 'translation_only' ? 'translation' : 'arabic');
    trackAudioPlayed(reciterRef.current.id, playbackModeRef.current, playbackSpeedRef.current);
    playAyahInternal(surahNum, ayahNum, initialPhase);
  };

  const pause = () => {
    setIsPlaying(false);
    if (playerRef.current) {
      try {
        playerRef.current.pause();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const resume = () => {
    const sNum = currentSurahNumberRef.current;
    const aNum = currentAyahNumberRef.current;
    const phase = playbackPhaseRef.current;
    if (playerRef.current) {
      try {
        playerRef.current.play();
      } catch (e) {
        console.warn(e);
      }
    } else if (sNum && aNum) {
      playAyah(sNum, aNum, phase);
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
    isStandaloneRef.current = false;
    const sNum = currentSurahNumberRef.current;
    const aNum = currentAyahNumberRef.current;
    if (sNum === null || aNum === null) return;
    const startPhase: PlaybackPhase =
      playbackModeRef.current === 'translation_only' ? 'translation' : 'arabic';
    handleAdvanceToNextAyah(sNum, aNum, startPhase);
  };

  const previousAyah = () => {
    isStandaloneRef.current = false;
    const sNum = currentSurahNumberRef.current;
    const aNum = currentAyahNumberRef.current;
    if (sNum === null || aNum === null) return;

    // If we are currently playing translation in 'both' mode, rewind to Arabic of same ayah
    if (playbackModeRef.current === 'both' && playbackPhaseRef.current === 'translation') {
      playAyah(sNum, aNum, 'arabic');
      return;
    }

    const startPhase: PlaybackPhase =
      playbackModeRef.current === 'translation_only' ? 'translation' : 'arabic';

    if (aNum > 1) {
      playAyah(sNum, aNum - 1, startPhase);
    } else if (sNum > 1) {
      const prevSurah = SURAHS.find((s) => s.number === sNum - 1);
      if (prevSurah) {
        playAyah(sNum - 1, prevSurah.numberOfAyahs, startPhase);
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

  const seekBy = (deltaSeconds: number) => {
    if (playerRef.current) {
      try {
        const target = Math.max(0, Math.min(duration || 0, currentTime + deltaSeconds));
        playerRef.current.seekTo(target);
      } catch (e) {
        console.warn('SeekBy error:', e);
      }
    }
  };

  const seekForward = (seconds: number = 10) => {
    seekBy(seconds);
  };

  const seekBackward = (seconds: number = 10) => {
    seekBy(-seconds);
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
    if (currentSurahNumber !== null && currentAyahNumber !== null && playbackPhase === 'arabic') {
      const wasPlaying = isPlaying;
      playAyah(currentSurahNumber, currentAyahNumber, 'arabic');
      if (!wasPlaying) pause();
    }
  };

  const setPlaybackMode = (mode: PlaybackMode) => {
    setPlaybackModeState(mode);
    playbackModeRef.current = mode;
    updatePreferences({ playbackMode: mode });
  };

  const setTranslationLanguage = (newLang: TranslationLanguage) => {
    setTranslationLanguageState(newLang);
    translationLanguageRef.current = newLang;
    updatePreferences({ translationLanguage: newLang });
    if (currentSurahNumber !== null && currentAyahNumber !== null && playbackPhase === 'translation') {
      const wasPlaying = isPlaying;
      playAyah(currentSurahNumber, currentAyahNumber, 'translation');
      if (!wasPlaying) pause();
    }
  };

  const openFullPlayer = () => setIsFullPlayerVisible(true);
  const closeFullPlayer = () => setIsFullPlayerVisible(false);

  const currentSurah = currentSurahNumber ? SURAHS.find((s) => s.number === currentSurahNumber) || null : null;
  const currentTranslationReciter =
    TRANSLATION_LANGUAGES[translationLanguageState] || TRANSLATION_LANGUAGES.urdu;

  return (
    <AudioContext.Provider
      value={{
        currentSurahNumber,
        currentAyahNumber,
        currentSurah,
        playbackPhase,
        playbackMode,
        isPlaying,
        isBuffering,
        currentTime,
        duration,
        playbackSpeed,
        reciter,
        urduReciter: URDU_TRANSLATION_RECITER,
        translationReciter: currentTranslationReciter,
        translationLanguage: translationLanguageState,
        setTranslationLanguage,
        isFullPlayerVisible,
        playAyah,
        pause,
        resume,
        togglePlayPause,
        nextAyah,
        previousAyah,
        seekTo,
        seekBy,
        seekForward,
        seekBackward,
        setSpeed,
        setReciter,
        setPlaybackMode,
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
