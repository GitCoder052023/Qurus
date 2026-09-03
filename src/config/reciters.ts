import type { Reciter } from '../types';

export const RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري بن راشد العفاسي',
    subfolder: 'Alafasy_128kbps',
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad (Murattal)',
    arabicName: 'عبد الباسط عبد الصمد',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary',
    arabicName: 'محمود خليل الحصري',
    subfolder: 'Husary_128kbps',
  },
  {
    id: 'shatri',
    name: 'Abu Bakr Al-Shatri',
    arabicName: 'أبو بکر الشاطري',
    subfolder: 'Abu_Bakr_Ash-Shaatree_128kbps',
  },
  {
    id: 'ghamadi',
    name: 'Saad Al-Ghamdi',
    arabicName: 'سعد الغامدي',
    subfolder: 'Ghamadi_40kbps',
  },
];

export const URDU_TRANSLATION_RECITER = {
  id: 'urdu_shamshad',
  name: 'Shamshad Ali Khan',
  arabicName: 'ترجمہ: شمشاد علی خان (جالندہری)',
  subfolder: 'translations/urdu_shamshad_ali_khan_46kbps',
} as const;
