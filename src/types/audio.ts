export type PlaybackMode = 'both' | 'arabic_only' | 'translation_only';
export type PlaybackPhase = 'arabic' | 'translation';

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  subfolder: string; // e.g. "Alafasy_128kbps"
}
