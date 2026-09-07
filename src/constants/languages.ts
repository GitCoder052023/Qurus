import { TranslationLanguage } from '../types';

export interface TranslationLanguageConfig {
  id: TranslationLanguage;
  name: string;
  nativeName: string;
  flag: string;
  author: string;
  voiceName: string;
  bitrate?: string;
  isRTL: boolean;
  bismillah: string;
  speechLocale?: string;
}

export const TRANSLATION_LANGUAGES: Record<TranslationLanguage, TranslationLanguageConfig> = {
  urdu: {
    id: 'urdu',
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '🇵🇰',
    author: 'Fateh Muhammad Jalandhari',
    voiceName: 'Shamshad Ali Khan',
    bitrate: '46 kbps',
    isRTL: true,
    bismillah: 'شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے',
    speechLocale: 'ur-PK',
  },
  english: {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    author: 'Sahih International',
    voiceName: 'Ibrahim Walk',
    bitrate: '192 kbps',
    isRTL: false,
    bismillah: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    speechLocale: 'en-US',
  },
  bengali: {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
    author: 'Muhiuddin Khan',
    voiceName: 'Bangla Quran Voice',
    bitrate: '56 kbps',
    isRTL: false,
    bismillah: 'শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।',
    speechLocale: 'bn-BD',
  },
  turkish: {
    id: 'turkish',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    author: 'Diyanet İşleri',
    voiceName: 'Diyanet Vakfı',
    bitrate: '128 kbps',
    isRTL: false,
    bismillah: "Rahman ve Rahim olan Allah'ın adıyla:",
    speechLocale: 'tr-TR',
  },
  french: {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    author: 'Muhammad Hamidullah',
    voiceName: 'Youssouf Leclerc',
    bitrate: '128 kbps',
    isRTL: false,
    bismillah: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.",
    speechLocale: 'fr-FR',
  },
};

export const URDU_TRANSLATION_RECITER = {
  id: 'urdu_shamshad',
  name: 'Shamshad Ali Khan',
  arabicName: 'ترجمہ: شمشاد علی خان (جالندہری)',
  subfolder: 'translations/urdu_shamshad_ali_khan_46kbps',
};

export const ENGLISH_TRANSLATION_RECITER = {
  id: 'english_walk',
  name: 'Ibrahim Walk',
  arabicName: 'English • Ibrahim Walk (Sahih Int.)',
  subfolder: 'English/Sahih_Intnl_Ibrahim_Walk_192kbps',
};

export const TRANSLATION_RECITERS = {
  urdu: URDU_TRANSLATION_RECITER,
  english: ENGLISH_TRANSLATION_RECITER,
};
