// Re-export modular Quran data, constants, and utilities for backward compatibility
export { SURAHS } from './surahsList';
export { RECITERS } from '../constants/reciters';
export {
  TranslationLanguageConfig,
  TRANSLATION_LANGUAGES,
  URDU_TRANSLATION_RECITER,
  ENGLISH_TRANSLATION_RECITER,
  TRANSLATION_RECITERS,
} from '../constants/languages';
export { getGlobalAyahNumber, getAyahTranslation } from '../utils/quran';
export {
  getAudioUrl,
  getUrduAudioUrl,
  getEnglishAudioUrl,
  getFrenchAudioUrl,
  getTurkishAudioUrl,
  getBengaliAudioUrl,
  getTranslationAudioUrl,
} from '../services/audio/audioUrls';
