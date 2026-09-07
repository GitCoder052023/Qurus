import { SurahMetadata } from '../../../types';
import { SurahFilterType } from '../types';

export function filterSurahs(
  surahs: SurahMetadata[],
  activeFilter: SurahFilterType,
  searchQuery: string
): SurahMetadata[] {
  let list = surahs;

  if (activeFilter === 'Meccan') {
    list = list.filter((s) => s.revelationType === 'Meccan');
  } else if (activeFilter === 'Medinan') {
    list = list.filter((s) => s.revelationType === 'Medinan');
  }

  const q = searchQuery.trim().toLowerCase();
  if (!q) return list;

  // Check if query is like "2:255"
  if (q.includes(':')) {
    const [sNum] = q.split(':');
    const num = parseInt(sNum, 10);
    if (!isNaN(num)) {
      return list.filter((s) => s.number === num);
    }
  }

  // Number match
  const asNum = parseInt(q, 10);
  if (!isNaN(asNum)) {
    return list.filter((s) => s.number === asNum);
  }

  // Text match
  return list.filter(
    (s) =>
      s.englishName.toLowerCase().includes(q) ||
      s.englishNameTranslation.toLowerCase().includes(q) ||
      s.urduName.toLowerCase().includes(q) ||
      String(s.name).includes(q)
  );
}
