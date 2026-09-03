export type RevelationType = 'Meccan' | 'Medinan';

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
