import { Ionicons } from '@expo/vector-icons';

export interface OnboardingSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  accentColor: string;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    badge: 'WELCOME TO QURUS',
    title: 'Your Personal Quran Study Sanctuary',
    subtitle:
      'A serene, dignified space for deep Quran reading and reflection. Completely private, offline-ready, and free of social feeds, ads, or distractions.',
    icon: 'book-outline',
    accentColor: '#0D7A57',
  },
  {
    id: '2',
    badge: 'SPOTIFY-STYLE LISTENING',
    title: 'Seamless Background Recitation',
    subtitle:
      'Listen to tranquil Quran recitations while on the move. Enjoy continuous background audio, lock-screen controls, and a persistent floating player anywhere in the app.',
    icon: 'musical-notes-outline',
    accentColor: '#10B981',
  },
  {
    id: '3',
    badge: 'STUDY NOTEBOOK',
    title: 'Personal Reflections & Ayah Notes',
    subtitle:
      'Attach your personal thoughts, insights, and study reflections directly to any verse. All your notes are preserved privately in your central Study Notebook.',
    icon: 'create-outline',
    accentColor: '#D97706',
  },
  {
    id: '4',
    badge: 'MARKS & CONTINUITY',
    title: 'Bookmarks & Seamless Continuity',
    subtitle:
      'Highlight important verses for deep study, save bookmarks with full context, and instantly resume right where you left off from your personalized Home sanctuary.',
    icon: 'star-outline',
    accentColor: '#B45309',
  },
];
