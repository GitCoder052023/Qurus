import { Ionicons } from '@expo/vector-icons';

export interface PrincipleItem {
  icon: keyof typeof Ionicons.glyphMap;
  heading: string;
  desc: string;
}

export const CORE_PRINCIPLES: PrincipleItem[] = [
  {
    icon: 'lock-closed-outline',
    heading: '100% On-Device Private Study',
    desc: 'Your written reflections, audio voice notes, and bookmarks are saved only on this device.',
  },
  {
    icon: 'person-remove-outline',
    heading: 'No Account or Ads',
    desc: 'No sign-in, no passwords, no email collection, and no behavioral ad tracking.',
  },
  {
    icon: 'cloud-download-outline',
    heading: 'Audio Streaming CDN',
    desc: 'Quran recitation and Urdu audio streams from EveryAyah public infrastructure.',
  },
  {
    icon: 'book-outline',
    heading: 'Open-Source Reflection Space',
    desc: 'MIT licensed open-source tool for personal inquiry; not a substitute for scholarly fatwas.',
  },
];
