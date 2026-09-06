import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Set standard foreground notification handler according to Expo SDK 57
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const NOTIFICATION_CHANNEL_ID = 'qurus-daily-reflection';
const DAILY_REMINDER_ID = 'qurus_daily_reflection_reminder';
const STREAK_SAVER_ID = 'qurus_streak_saver_reminder';

const CONTEMPLATIVE_MESSAGES = [
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

export async function setupNotificationChannelAsync(): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
        name: 'Daily Quran Reflection',
        description: 'Mindful reminders for daily Quran study and reflection',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 200, 150, 200],
        lightColor: '#1B4D3E',
        sound: 'default',
        enableLights: true,
        enableVibrate: true,
      });
    } catch (e) {
      console.warn('Failed to setup notification channel:', e);
    }
  }
}

export async function requestNotificationPermissionAsync(): Promise<boolean> {
  try {
    const settings = await Notifications.getPermissionsAsync();
    let granted = settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED;

    if (!granted) {
      const requested = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: false,
          allowSound: true,
        },
      });
      granted = requested.granted || requested.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED;
    }

    if (granted) {
      await setupNotificationChannelAsync();
    }
    return granted;
  } catch (err) {
    console.warn('Notification permission error:', err);
    return false;
  }
}

export async function checkNotificationPermissionAsync(): Promise<boolean> {
  try {
    const settings = await Notifications.getPermissionsAsync();
    return settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED;
  } catch {
    return false;
  }
}

export async function scheduleDailyReminderAsync(
  hour: number,
  minute: number,
  streakDays: number = 0,
  lastSurahName?: string
): Promise<boolean> {
  try {
    const hasPermission = await checkNotificationPermissionAsync();
    if (!hasPermission) return false;

    await setupNotificationChannelAsync();

    // Cancel existing reminder if already scheduled
    try {
      await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID);
    } catch {}

    // Choose a message based on day
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const msg = CONTEMPLATIVE_MESSAGES[dayOfYear % CONTEMPLATIVE_MESSAGES.length];

    let body = msg.body;
    let title = msg.title;

    if (streakDays >= 2) {
      title = `${streakDays}-Day Rhythm Alive 🔥`;
      body = lastSurahName
        ? `Keep your connection unbroken. Surah ${lastSurahName} is ready for today's reflection.`
        : `Your ${streakDays}-day rhythm is strong. Take 3 minutes for one verse today.`;
    } else if (lastSurahName) {
      body = `Surah ${lastSurahName} is waiting for your reflection. A quiet space for your mind.`;
    }

    await Notifications.scheduleNotificationAsync({
      identifier: DAILY_REMINDER_ID,
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: '#1B4D3E',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: NOTIFICATION_CHANNEL_ID,
      },
    });

    return true;
  } catch (err) {
    console.warn('Failed to schedule daily reminder:', err);
    return false;
  }
}

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

export async function scheduleStreakSaverReminderAsync(streakDays: number): Promise<boolean> {
  try {
    if (streakDays < 1) return false;

    const hasPermission = await checkNotificationPermissionAsync();
    if (!hasPermission) return false;

    await setupNotificationChannelAsync();

    // Schedule escalating countdown tiers for the evening
    for (const tier of STREAK_SAVER_TIERS) {
      try {
        await Notifications.cancelScheduledNotificationAsync(tier.id);
      } catch {}

      await Notifications.scheduleNotificationAsync({
        identifier: tier.id,
        content: {
          title: tier.title(streakDays),
          body: tier.body(streakDays),
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          color: '#FF4500',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: tier.hour,
          minute: tier.minute,
          channelId: NOTIFICATION_CHANNEL_ID,
        },
      });
    }

    return true;
  } catch (err) {
    console.warn('Failed to schedule streak saver reminders:', err);
    return false;
  }
}

export async function cancelTonightStreakSaversAsync(): Promise<void> {
  for (const tier of STREAK_SAVER_TIERS) {
    try {
      await Notifications.cancelScheduledNotificationAsync(tier.id);
    } catch {}
  }
}

export async function cancelAllRemindersAsync(): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID);
    await cancelTonightStreakSaversAsync();
  } catch (err) {
    console.warn('Failed to cancel notifications:', err);
  }
}

export async function sendInstantTestNotificationAsync(): Promise<boolean> {
  try {
    const granted = await requestNotificationPermissionAsync();
    if (!granted) return false;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Qurus Tadabbur Reminder 🌿',
        body: '“Do they not reflect upon the Quran?” This is how your daily mindfulness notification will look.',
        sound: true,
        color: '#1B4D3E',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        channelId: NOTIFICATION_CHANNEL_ID,
      },
    });

    return true;
  } catch (err) {
    console.warn('Failed to send test notification:', err);
    return false;
  }
}

export async function sendInstantFinalCallTestAsync(streakDays: number = 7): Promise<boolean> {
  try {
    const granted = await requestNotificationPermissionAsync();
    if (!granted) return false;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🔥 FINAL CALL (15 MINS): Streak Resetting!`,
        body: `Final warning! At 12:00 AM, your ${streakDays}-day streak dies. Open Qurus and listen to 1 ayah before it's too late!`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: '#FF4500',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        channelId: NOTIFICATION_CHANNEL_ID,
      },
    });

    return true;
  } catch (err) {
    console.warn('Failed to send final call test notification:', err);
    return false;
  }
}
