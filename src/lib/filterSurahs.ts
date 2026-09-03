import type { SurahMetadata } from '../types';

export type RevelationFilter = 'All' | 'Meccan' | 'Medinan';

export function filterSurahs(
  list: SurahMetadata[],
  searchQuery: string,
  activeFilter: RevelationFilter
): SurahMetadata[] {
  let next = list;

  if (activeFilter === 'Meccan') {
    next = next.filter((s) => s.revelationType === 'Meccan');
  } else if (activeFilter === 'Medinan') {
    next = next.filter((s) => s.revelationType === 'Medinan');
  }

  const q = searchQuery.trim().toLowerCase();
  if (!q) return next;

  // Check if query is like "2:255"
  if (q.includes(':')) {
    const [sNum] = q.split(':');
    const num = parseInt(sNum, 10);
    if (!isNaN(num)) {
      return next.filter((s) => s.number === num);
    }
  }

  // Number match
  const asNum = parseInt(q, 10);
  if (!isNaN(asNum)) {
    return next.filter((s) => s.number === asNum);
  }

  // Text match
  return next.filter(
    (s) =>
      s.englishName.toLowerCase().includes(q) ||
      s.englishNameTranslation.toLowerCase().includes(q) ||
      s.urduName.toLowerCase().includes(q) ||
      String(s.name).includes(q)
  );
}

export function ayahFromSearchQuery(searchQuery: string, maxAyahs: number): number | null {
  const q = searchQuery.trim();
  if (!q.includes(':')) return null;
  const [, aNum] = q.split(':');
  const ayah = parseInt(aNum, 10);
  if (!isNaN(ayah) && ayah >= 1 && ayah <= maxAyahs) {
    return ayah;
  }
  return null;
}
