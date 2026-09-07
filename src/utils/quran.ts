import { Ayah, TranslationLanguage } from '../types';
import { SURAHS } from '../data/surahsList';

export function getGlobalAyahNumber(surahNumber: number, ayahNumber: number): number {
  let count = 0;
  for (let s = 1; s < surahNumber; s++) {
    const meta = SURAHS.find((item) => item.number === s);
    if (meta) count += meta.numberOfAyahs;
  }
  return count + ayahNumber;
}

export function getAyahTranslation(ayah: Ayah, language: TranslationLanguage = 'urdu'): string {
  if (language === 'urdu') {
    return ayah.urduText;
  }
  if (ayah.translations && ayah.translations[language]) {
    return ayah.translations[language] || '';
  }
  if (language === 'english' && ayah.englishText) {
    return ayah.englishText;
  }
  return ayah.urduText;
}
