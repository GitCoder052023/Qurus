import { useMemo } from 'react';
import { StudyNote } from '../../../types';
import { SURAHS } from '../../../data/surahs';
import { AyahNotesGroup, NotesStats, SurahNotesGroup } from '../types';

export function useNotesGrouping(notes: Record<string, StudyNote>, searchQuery: string) {
  // Overall Statistics
  const stats: NotesStats = useMemo(() => {
    const allNotes = Object.values(notes);
    const surahSet = new Set<number>();
    const ayahSet = new Set<string>();

    allNotes.forEach((n) => {
      surahSet.add(n.surahNumber);
      ayahSet.add(`${n.surahNumber}:${n.ayahNumber}`);
    });

    return {
      totalNotes: allNotes.length,
      totalAyahs: ayahSet.size,
      totalSurahs: surahSet.size,
    };
  }, [notes]);

  // Filter notes by search query
  const filteredNotes = useMemo(() => {
    const all = Object.values(notes);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return all;

    return all.filter((n) => {
      const surah = SURAHS.find((s) => s.number === n.surahNumber);
      const surahMatch =
        surah &&
        (surah.englishName.toLowerCase().includes(q) ||
          surah.name.toLowerCase().includes(q) ||
          surah.urduName.toLowerCase().includes(q) ||
          surah.englishNameTranslation.toLowerCase().includes(q));

      const refMatch =
        `${n.surahNumber}:${n.ayahNumber}`.includes(q) ||
        `surah ${n.surahNumber}`.includes(q) ||
        `ayah ${n.ayahNumber}`.includes(q);

      const textMatch = n.text.toLowerCase().includes(q);
      const voiceMatch =
        Boolean(n.voiceNote) &&
        ('voice'.includes(q) || 'audio'.includes(q) || 'mic'.includes(q));
      const snippetMatch =
        (n.urduSnippet && n.urduSnippet.toLowerCase().includes(q)) ||
        (n.arabicSnippet && n.arabicSnippet.toLowerCase().includes(q));

      return surahMatch || refMatch || textMatch || voiceMatch || snippetMatch;
    });
  }, [notes, searchQuery]);

  // Group filtered notes by Surah, then by Ayah
  const surahGroups = useMemo(() => {
    const surahMap = new Map<number, Map<number, StudyNote[]>>();

    filteredNotes.forEach((note) => {
      if (!surahMap.has(note.surahNumber)) {
        surahMap.set(note.surahNumber, new Map<number, StudyNote[]>());
      }
      const ayahMap = surahMap.get(note.surahNumber)!;
      if (!ayahMap.has(note.ayahNumber)) {
        ayahMap.set(note.ayahNumber, []);
      }
      ayahMap.get(note.ayahNumber)!.push(note);
    });

    const groups: SurahNotesGroup[] = [];
    const sortedSurahNumbers = Array.from(surahMap.keys()).sort((a, b) => a - b);

    sortedSurahNumbers.forEach((surahNum) => {
      const surahMeta = SURAHS.find((s) => s.number === surahNum);
      const ayahMap = surahMap.get(surahNum)!;
      const sortedAyahNumbers = Array.from(ayahMap.keys()).sort((a, b) => a - b);

      let totalNotesInSurah = 0;
      const ayahGroups: AyahNotesGroup[] = sortedAyahNumbers.map((ayahNum) => {
        const aNotes = ayahMap.get(ayahNum)!.sort((a, b) => b.createdAt - a.createdAt);
        totalNotesInSurah += aNotes.length;
        const withArabic = aNotes.find((n) => n.arabicSnippet);
        const withUrdu = aNotes.find((n) => n.urduSnippet);
        return {
          surahNumber: surahNum,
          ayahNumber: ayahNum,
          arabicSnippet: withArabic?.arabicSnippet,
          urduSnippet: withUrdu?.urduSnippet,
          notes: aNotes,
        };
      });

      groups.push({
        surahNumber: surahNum,
        surahMeta,
        ayahGroups,
        totalNotes: totalNotesInSurah,
      });
    });

    return groups;
  }, [filteredNotes]);

  return { stats, filteredNotes, surahGroups };
}
