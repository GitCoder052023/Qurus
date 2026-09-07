import { StudyNote, SurahMetadata } from '../../types';

export interface AyahNotesGroup {
  surahNumber: number;
  ayahNumber: number;
  arabicSnippet?: string;
  urduSnippet?: string;
  notes: StudyNote[];
}

export interface SurahNotesGroup {
  surahNumber: number;
  surahMeta?: SurahMetadata;
  ayahGroups: AyahNotesGroup[];
  totalNotes: number;
}

export interface NotesStats {
  totalNotes: number;
  totalAyahs: number;
  totalSurahs: number;
}
