import type { PlaybackMode, PlaybackPhase, SurahMetadata } from '../../types';
import { TOTAL_SURAHS } from '../../config/quran';

export type SequencerResult =
  | { type: 'play'; surahNumber: number; ayahNumber: number; phase: PlaybackPhase }
  | { type: 'stop' };

export function nextTrackAfterFinish(
  sNum: number,
  aNum: number,
  phase: PlaybackPhase,
  mode: PlaybackMode,
  surahs: SurahMetadata[]
): SequencerResult {
  if (mode === 'both') {
    if (phase === 'arabic') {
      return { type: 'play', surahNumber: sNum, ayahNumber: aNum, phase: 'translation' };
    }
    return advanceToNextAyah(sNum, aNum, 'arabic', surahs);
  }
  if (mode === 'arabic_only') {
    return advanceToNextAyah(sNum, aNum, 'arabic', surahs);
  }
  return advanceToNextAyah(sNum, aNum, 'translation', surahs);
}

export function advanceToNextAyah(
  sNum: number,
  aNum: number,
  targetPhase: PlaybackPhase,
  surahs: SurahMetadata[]
): SequencerResult {
  const surah = surahs.find((s) => s.number === sNum);
  if (!surah) return { type: 'stop' };

  if (aNum < surah.numberOfAyahs) {
    return { type: 'play', surahNumber: sNum, ayahNumber: aNum + 1, phase: targetPhase };
  }
  if (sNum < TOTAL_SURAHS) {
    return { type: 'play', surahNumber: sNum + 1, ayahNumber: 1, phase: targetPhase };
  }
  return { type: 'stop' };
}
