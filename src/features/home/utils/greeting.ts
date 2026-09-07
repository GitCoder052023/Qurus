import { ThemeColors } from '../../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export interface GreetingInfo {
  time: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  wash: string;
}

export function getGreeting(theme: ThemeColors): GreetingInfo {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 7) {
    return {
      time: 'Early Hours',
      title: 'Good morning',
      subtitle: 'A quiet space to start your day with clarity and focus.',
      icon: 'sunny-outline',
      accent: theme.accentAmber,
      wash: theme.amberMuted,
    };
  } else if (hour >= 7 && hour < 12) {
    return {
      time: 'Morning Reflection',
      title: 'Good morning',
      subtitle: 'Take a breath and explore a perspective before the day gets busy.',
      icon: 'sunny',
      accent: theme.accentAmber,
      wash: theme.amberMuted,
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      time: 'Afternoon Pause',
      title: 'Good afternoon',
      subtitle: 'Step back from the noise for a few moments of quiet thought.',
      icon: 'time-outline',
      accent: theme.tertiary,
      wash: theme.tertiaryMuted,
    };
  } else if (hour >= 17 && hour < 20) {
    return {
      time: 'Evening Reset',
      title: 'Good evening',
      subtitle: 'Unwind your thoughts and explore something timeless.',
      icon: 'partly-sunny-outline',
      accent: theme.accentSaffron,
      wash: theme.saffronMuted,
    };
  } else {
    return {
      time: 'Night Stillness',
      title: 'Good night',
      subtitle: 'End your day with perspective, calm, and stillness.',
      icon: 'moon-outline',
      accent: theme.accentTwilight,
      wash: theme.twilightMuted,
    };
  }
}
