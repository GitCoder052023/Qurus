import { Ionicons } from '@expo/vector-icons';
import { TranslationLanguage } from '../../types';

export interface StoryChapter {
  id: string;
  kicker: string;
  heroIcon: keyof typeof Ionicons.glyphMap;
  accent: string;
  wash: string;
  title: string;
  highlightPhrase: string;
  proseParagraphs: string[];
  quote?: { text: string; author: string };
  features?: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    desc: string;
  }[];
  activities?: { icon: keyof typeof Ionicons.glyphMap; label: string }[];
  founderSignature?: {
    name: string;
    role: string;
    note: string;
    closingWish: string;
  };
}

export interface ReminderOption {
  label: string;
  timeStr: string;
  hour: number;
  minute: number;
  icon: keyof typeof Ionicons.glyphMap;
  subtitle: string;
}

export interface GoalOption {
  count: number;
  label: string;
  desc: string;
}

export interface OnboardingLanguageOption {
  id: TranslationLanguage;
  badge: string;
  desc: string;
}
