import { Easing } from "react-native-reanimated";
import { ReminderOption, GoalOption, OnboardingLanguageOption } from "../types";

export const EASE = Easing.bezier(0.22, 1, 0.36, 1);

export const REMINDER_OPTIONS: ReminderOption[] = [
  {
    label: 'Morning',
    timeStr: '7:00 AM',
    hour: 7,
    minute: 0,
    icon: 'sunny-outline' as const,
    subtitle: 'Start with perspective',
  },
  {
    label: 'Midday',
    timeStr: '1:30 PM',
    hour: 13,
    minute: 30,
    icon: 'time-outline' as const,
    subtitle: 'Afternoon quiet pause',
  },
  {
    label: 'Evening',
    timeStr: '8:30 PM',
    hour: 20,
    minute: 30,
    icon: 'partly-sunny-outline' as const,
    subtitle: 'Unwind & reflect (Recommended)',
  },
  {
    label: 'Night',
    timeStr: '10:00 PM',
    hour: 22,
    minute: 0,
    icon: 'moon-outline' as const,
    subtitle: 'Stillness before rest',
  },
];

export const GOAL_OPTIONS: GoalOption[] = [
  { count: 3, label: 'Gentle Pace', desc: '3 verses/day • ~2 mins' },
  { count: 5, label: 'Recommended', desc: '5 verses/day • ~5 mins' },
  { count: 10, label: 'Focused Study', desc: '10 verses/day • ~10 mins' },
  { count: 15, label: 'Deep Immersion', desc: '15 verses/day • ~15 mins' },
];

export const ONBOARDING_LANGUAGES: OnboardingLanguageOption[] = [
  {
    id: 'urdu',
    badge: 'Authentic Urdu',
    desc: 'Classical, revered Urdu translation recited verse-by-verse with eloquent pronunciation and warm clarity.',
  },
  {
    id: 'english',
    badge: 'Sahih International',
    desc: 'Crisp, contemporary English translation audio synchronized per ayah for seamless reflection.',
  },
  {
    id: 'bengali',
    badge: 'Muhiuddin Khan',
    desc: 'Widely celebrated Bengali translation recited verse-by-verse with melodious cadence.',
  },
  {
    id: 'turkish',
    badge: 'Diyanet İşleri',
    desc: 'Esteemed Turkish translation recited verse-by-verse with crisp resonance.',
  },
  {
    id: 'french',
    badge: 'Hamidullah',
    desc: 'Renowned academic French translation recited verse-by-verse with poetic elegance.',
  },
];

