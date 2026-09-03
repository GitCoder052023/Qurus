import { Ionicons } from '@expo/vector-icons';

export interface BelovedSurah {
  num: number;
  english: string;
  arabic: string;
  desc: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const BELOVED_SURAHS: BelovedSurah[] = [
  {
    num: 55,
    english: 'Ar-Rahman',
    arabic: 'الرحمن',
    desc: 'The Beneficent',
    icon: 'leaf-outline',
  },
  {
    num: 67,
    english: 'Al-Mulk',
    arabic: 'الملك',
    desc: 'Sovereignty & Protection',
    icon: 'shield-checkmark-outline',
  },
  {
    num: 36,
    english: 'Ya-Sin',
    arabic: 'يس',
    desc: 'Heart of the Quran',
    icon: 'heart-outline',
  },
  {
    num: 18,
    english: 'Al-Kahf',
    arabic: 'الكهف',
    desc: 'The Cave & Divine Light',
    icon: 'sparkles-outline',
  },
];
