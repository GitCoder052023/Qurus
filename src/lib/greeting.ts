import { Ionicons } from '@expo/vector-icons';

export interface TimeOfDayGreeting {
  time: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export function getTimeOfDayGreeting(date: Date = new Date()): TimeOfDayGreeting {
  const hour = date.getHours();
  if (hour >= 4 && hour < 7) {
    return {
      time: 'Fajr & Dawn',
      title: 'Assalamu Alaikum',
      subtitle: 'Start your morning in Divine peace and light',
      icon: 'sunny-outline',
    };
  }
  if (hour >= 7 && hour < 12) {
    return {
      time: 'Morning Solace',
      title: 'Assalamu Alaikum',
      subtitle: 'May your day be filled with tranquility and barakah',
      icon: 'sunny',
    };
  }
  if (hour >= 12 && hour < 17) {
    return {
      time: 'Midday Remembrance',
      title: 'Assalamu Alaikum',
      subtitle: 'Pause your day to reflect on the words of Allah',
      icon: 'time-outline',
    };
  }
  if (hour >= 17 && hour < 20) {
    return {
      time: 'Maghrib Serenity',
      title: 'Assalamu Alaikum',
      subtitle: 'A peaceful evening of gratitude and quiet reflection',
      icon: 'partly-sunny-outline',
    };
  }
  return {
    time: 'Night Tranquility',
    title: 'Assalamu Alaikum',
    subtitle: 'Rest your heart and mind with peaceful recitation',
    icon: 'moon-outline',
  };
}

export function dayOfYear(now: Date = new Date()): number {
  return Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
}
