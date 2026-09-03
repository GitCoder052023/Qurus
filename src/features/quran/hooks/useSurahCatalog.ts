import { useMemo, useState } from 'react';
import { SURAHS } from '@/data/surahs';
import { filterSurahs, ayahFromSearchQuery, type RevelationFilter } from '@/lib/filterSurahs';

export function useSurahCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<RevelationFilter>('All');

  const filteredSurahs = useMemo(
    () => filterSurahs(SURAHS, searchQuery, activeFilter),
    [searchQuery, activeFilter]
  );

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredSurahs,
    ayahFromSearchQuery,
  };
}
