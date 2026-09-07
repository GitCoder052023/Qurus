import { TranslationLanguage } from '../../types';
import { getGlobalAyahNumber } from '../../utils/quran';

export function getAudioUrl(reciterSubfolder: string, surahNumber: number, ayahNumber: number): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/${reciterSubfolder}/${surahPadded}${ayahPadded}.mp3`;
}

export function getUrduAudioUrl(surahNumber: number, ayahNumber: number): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/${surahPadded}${ayahPadded}.mp3`;
}

export function getEnglishAudioUrl(surahNumber: number, ayahNumber: number): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/English/Sahih_Intnl_Ibrahim_Walk_192kbps/${surahPadded}${ayahPadded}.mp3`;
}

export function getFrenchAudioUrl(surahNumber: number, ayahNumber: number, globalNumber?: number): string {
  const global = globalNumber || getGlobalAyahNumber(surahNumber, ayahNumber);
  return `https://cdn.islamic.network/quran/audio/128/fr.leclerc/${global}.mp3`;
}

export function getTurkishAudioUrl(surahNumber: number, ayahNumber: number, globalNumber?: number): string {
  const global = globalNumber || getGlobalAyahNumber(surahNumber, ayahNumber);
  return `https://cdn.islamic.network/quran/audio/128/tr.vakfi-audio/${global}.mp3`;
}

export function getBengaliAudioUrl(surahNumber: number, ayahNumber: number): string {
  return `https://raw.githubusercontent.com/imranpollob/bangla-quran/master/public/audio/bt/${surahNumber}-${ayahNumber}.mp3`;
}

export function getTranslationAudioUrl(
  surahNumber: number,
  ayahNumber: number,
  language: TranslationLanguage = 'urdu',
  globalNumber?: number
): string | null {
  switch (language) {
    case 'english':
      return getEnglishAudioUrl(surahNumber, ayahNumber);
    case 'french':
      return getFrenchAudioUrl(surahNumber, ayahNumber, globalNumber);
    case 'turkish':
      return getTurkishAudioUrl(surahNumber, ayahNumber, globalNumber);
    case 'bengali':
      return getBengaliAudioUrl(surahNumber, ayahNumber);
    case 'urdu':
    default:
      return getUrduAudioUrl(surahNumber, ayahNumber);
  }
}
