export const NOTIFICATION_CHANNEL_ID = 'qurus-daily-reflection';
export const DAILY_REMINDER_ID = 'qurus_daily_reflection_reminder';
export const STREAK_SAVER_ID = 'qurus_streak_saver_reminder';

export const CONTEMPLATIVE_MESSAGES = [
  {
    title: 'A Moment of Tadabbur 🌿',
    body: '“Do they not reflect upon the Quran?” Take a quiet pause with a single verse today.',
  },
  {
    title: 'Your Daily Quran Pause ✨',
    body: 'Consistency is the most beloved deed. A few verses explored with contemplation illuminate your day.',
  },
  {
    title: 'Stillness in Recitation 📖',
    body: 'Step back from the rush of the world. Open your passage and let the verses speak to your heart.',
  },
  {
    title: 'Words of Light & Guidance 🕊️',
    body: 'A single verse understood is greater than chapters skimmed. Dedicate 5 minutes to reflection.',
  },
  {
    title: 'Your Contemplative Rhythm 🍃',
    body: 'Clear your mind and listen with an open heart. What perspective will you take with you today?',
  },
  {
    title: 'A Breath of Serenity 🌙',
    body: 'End the day with peace and perspective. Your Quran sanctuary is waiting for you.',
  },
];

export const STREAK_SAVER_TIERS = [
  {
    id: 'qurus_streak_saver_2100',
    hour: 21,
    minute: 0,
    title: (days: number) => `Don't break your ${days}-day streak! 🔥`,
    body: (days: number) =>
      `You haven't studied today! Don't let your ${days}-day streak reset to 0 at midnight. Just 1 verse saves your streak.`,
  },
  {
    id: 'qurus_streak_saver_2200',
    hour: 22,
    minute: 0,
    title: (days: number) => `2 hours left! Your streak is in danger ⏳`,
    body: (days: number) =>
      `Are you really going to lose ${days} days of consistency? Open Qurus right now—1 ayah takes only 45 seconds.`,
  },
  {
    id: 'qurus_streak_saver_2300',
    hour: 23,
    minute: 0,
    title: (days: number) => `🚨 1 HOUR LEFT: Streak Break Imminent!`,
    body: (days: number) =>
      `Midnight is almost here. Your ${days}-day Quran habit resets in 60 minutes. Read 1 single verse now to protect it!`,
  },
  {
    id: 'qurus_streak_saver_2345',
    hour: 23,
    minute: 45,
    title: (days: number) => `🔥 FINAL CALL (15 MINS): Streak Resetting!`,
    body: (days: number) =>
      `Final warning! At 12:00 AM, your ${days}-day streak dies. Open Qurus and listen to 1 ayah before it's too late!`,
  },
];
