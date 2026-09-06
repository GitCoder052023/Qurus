export type RevelationType = "Meccan" | "Medinan";

export interface SurahMetadata {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  urduName: string;
  numberOfAyahs: number;
  revelationType: RevelationType;
  juzStart: number;
}

export interface Ayah {
  numberInSurah: number;
  globalNumber: number;
  arabicText: string;
  urduText: string;
  juz: number;
  page?: number;
  ruku?: number;
  hizbQuarter?: number;
  sajda?: boolean;
}

export interface SurahData extends SurahMetadata {
  ayahs: Ayah[];
}

export interface Bookmark {
  id: string; // "surah_ayah"
  surahNumber: number;
  ayahNumber: number;
  createdAt: number;
  arabicSnippet: string;
  urduSnippet: string;
}

export interface Highlight {
  id: string; // "surah_ayah"
  surahNumber: number;
  ayahNumber: number;
  createdAt: number;
}

export interface VoiceNote {
  uri: string;
  durationMillis: number;
}

export interface StudyNote {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  text: string;
  voiceNote?: VoiceNote;
  arabicSnippet?: string;
  urduSnippet?: string;
  createdAt: number;
  updatedAt: number;
}

export type PlaybackMode = "both" | "arabic_only" | "translation_only";
export type PlaybackPhase = "arabic" | "translation";

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  subfolder: string;
}
