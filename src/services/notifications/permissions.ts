import { Platform, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NOTIFICATION_CHANNEL_ID } from './constants';

// Set standard foreground notification handler according to Expo SDK 57
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
    return Boolean(settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED);
  } catch {
    return false;
  }
}

export async function promptEnableNotificationsAsync(): Promise<boolean> {
  try {
    const settings = await Notifications.getPermissionsAsync();
    const granted = settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED;

    if (granted) {
      await setupNotificationChannelAsync();
      return true;
    }

    if (settings.canAskAgain) {
      const requested = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: false,
          allowSound: true,
        },
      });
      const nowGranted = Boolean(
        requested.granted || requested.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED
      );
      if (nowGranted) {
        await setupNotificationChannelAsync();
        return true;
      }
      return false;
    } else {
      // Permission permanently denied, redirect to OS Settings
      try {
        await Linking.openSettings();
      } catch (err) {
        console.warn('Failed to open OS Settings:', err);
      }
      return false;
    }
  } catch (err) {
    console.warn('promptEnableNotificationsAsync error:', err);
    return false;
  }
}
