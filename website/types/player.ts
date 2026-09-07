export interface VoiceNoteData {
  uri: string;
  durationMillis: number;
}

export interface StudyNoteData {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  text: string;
  voiceNote: VoiceNoteData | null;
  createdAt: number;
  updatedAt: number;
}

export type LanguageKey = "urdu" | "english" | "bengali" | "turkish" | "french";

export interface LanguageMeta {
  id: LanguageKey;
  name: string;
  nativeName: string;
  flag: string;
  author: string;
  reciter: string;
  isRTL: boolean;
}

export interface SampleAyah {
  numberInSurah: number;
  arabicText: string;
  arabicAudio: string;
  translations: Record<
    LanguageKey,
    {
      text: string;
      audio: string;
    }
  >;
}
