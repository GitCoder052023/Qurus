import type { StudyNote } from '../types';

export function filterNotes(notes: Record<string, StudyNote>, searchQuery: string): StudyNote[] {
  const list = Object.values(notes).sort((a, b) => b.updatedAt - a.updatedAt);
  const q = searchQuery.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (n) =>
      n.text.toLowerCase().includes(q) ||
      (n.urduSnippet && n.urduSnippet.toLowerCase().includes(q)) ||
      `${n.surahNumber}:${n.ayahNumber}`.includes(q)
  );
}
