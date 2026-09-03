import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { createAudioPlayer, setAudioModeAsync, AudioPlayer, AudioStatus } from 'expo-audio';
import { RECITERS, getAudioUrl, getUrduAudioUrl, URDU_TRANSLATION_RECITER, SURAHS } from '../data/surahs';
import { Reciter, SurahMetadata, PlaybackMode, PlaybackPhase } from '../types';
import { useStudyState } from './StudyContext';

const isExpoGo =
  Constants.appOwnership === 'expo' ||
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

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
  isFullPlayerVisible: boolean;

  // Controls
  playAyah: (surahNumber: number, ayahNumber: number, phase?: PlaybackPhase) => void;
  pause: () => void;
  resume: () => void;
  togglePlayPause: () => void;
  nextAyah: () => void;
  previousAyah: () => void;
  seekTo: (seconds: number) => void;
  setSpeed: (speed: number) => void;
  setReciter: (reciter: Reciter) => void;
  setPlaybackMode: (mode: PlaybackMode) => void;
  openFullPlayer: () => void;
  closeFullPlayer: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const { updateLastStudied, preferences, updatePreferences } = useStudyState();

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

  // AudioPlayer instance reference
  const playerRef = useRef<AudioPlayer | null>(null);
  const lastFinishedKeyRef = useRef<string>('');
  const currentSurahNumberRef = useRef<number | null>(null);
  const currentAyahNumberRef = useRef<number | null>(null);
  const playbackPhaseRef = useRef<PlaybackPhase>('arabic');
  const playbackModeRef = useRef<PlaybackMode>(playbackMode);
  const reciterRef = useRef<Reciter>(activeReciter);
  const playbackSpeedRef = useRef<number>(playbackSpeed);

  currentSurahNumberRef.current = currentSurahNumber;
  currentAyahNumberRef.current = currentAyahNumber;
  playbackPhaseRef.current = playbackPhase;
  playbackModeRef.current = playbackMode;
  reciterRef.current = reciter;
  playbackSpeedRef.current = playbackSpeed;

  // Sync with preferences when loaded
  useEffect(() => {
    if (preferences.playbackMode && preferences.playbackMode !== playbackMode) {
      setPlaybackModeState(preferences.playbackMode);
    }
  }, [preferences.playbackMode]);

  // Setup Audio Session for background playback
  useEffect(() => {
    async function configureAudio() {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: !isExpoGo,
          interruptionMode: 'doNotMix',
        });
      } catch (err) {
        console.warn('Could not set audio mode:', err);
      }
    }
    configureAudio();

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
              handleTrackFinish(sNum, aNum, phase, mode);
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
        // Step 2: Urdu translation finished -> Now advance to next ayah in Arabic!
        handleAdvanceToNextAyah(sNum, aNum, 'arabic');
      }
    } else if (mode === 'arabic_only') {
      handleAdvanceToNextAyah(sNum, aNum, 'arabic');
    } else if (mode === 'translation_only') {
      handleAdvanceToNextAyah(sNum, aNum, 'translation');
    }
  };

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

    setCurrentSurahNumber(surahNum);
    setCurrentAyahNumber(ayahNum);
    setPlaybackPhase(phase);
    playbackPhaseRef.current = phase;
    updateLastStudied(surahNum, ayahNum);

    let url: string;
    let trackTitle: string;
    let artistName: string;

    const surah = SURAHS.find((s) => s.number === surahNum);
    const surahName = surah ? surah.englishName : `Surah ${surahNum}`;

    if (phase === 'translation') {
      url = getUrduAudioUrl(surahNum, ayahNum);
      trackTitle = `${surahName} (${surahNum}:${ayahNum}) • Urdu Translation`;
      artistName = 'Shamshad Ali Khan (Jalandhari)';
    } else {
      url = getAudioUrl(reciterRef.current.subfolder, surahNum, ayahNum);
      trackTitle = `${surahName} (${surahNum}:${ayahNum}) • Arabic Recitation`;
      artistName = reciterRef.current.name;
    }

    try {
      player.replace(url);
      player.setPlaybackRate(playbackSpeedRef.current);
      player.play();

      if (!isExpoGo) {
        try {
          player.setActiveForLockScreen(true, {
            title: trackTitle,
            artist: artistName,
            albumTitle: 'Qurus Quran Study',
          });
        } catch (e) {
          // Gracefully ignore if platform/service unavailable
        }
      }
    } catch (err) {
      console.error('Error in audio playback:', err);
    }
  };

  // Public Play Ayah
  const playAyah = (surahNum: number, ayahNum: number, phase?: PlaybackPhase) => {
    lastFinishedKeyRef.current = '';
    const initialPhase: PlaybackPhase =
      phase || (playbackModeRef.current === 'translation_only' ? 'translation' : 'arabic');
    playAyahInternal(surahNum, ayahNum, initialPhase);
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
      playAyah(currentSurahNumber, currentAyahNumber, playbackPhase);
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
    const startPhase: PlaybackPhase =
      playbackModeRef.current === 'translation_only' ? 'translation' : 'arabic';
    handleAdvanceToNextAyah(currentSurahNumber, currentAyahNumber, startPhase);
  };

  const previousAyah = () => {
    if (currentSurahNumber === null || currentAyahNumber === null) return;

    // If we are currently playing translation in 'both' mode, rewind to Arabic of same ayah
    if (playbackModeRef.current === 'both' && playbackPhase === 'translation') {
      playAyah(currentSurahNumber, currentAyahNumber, 'arabic');
      return;
    }

    const startPhase: PlaybackPhase =
      playbackModeRef.current === 'translation_only' ? 'translation' : 'arabic';

    if (currentAyahNumber > 1) {
      playAyah(currentSurahNumber, currentAyahNumber - 1, startPhase);
    } else if (currentSurahNumber > 1) {
      const prevSurah = SURAHS.find((s) => s.number === currentSurahNumber - 1);
      if (prevSurah) {
        playAyah(currentSurahNumber - 1, prevSurah.numberOfAyahs, startPhase);
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

  const openFullPlayer = () => setIsFullPlayerVisible(true);
  const closeFullPlayer = () => setIsFullPlayerVisible(false);

  const currentSurah = currentSurahNumber ? SURAHS.find((s) => s.number === currentSurahNumber) || null : null;

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
