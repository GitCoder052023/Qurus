import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/home.styles';

interface DisabledNotificationsBannerProps {
  onRequestPermission: () => void;
  theme: ThemeColors;
}

export const DisabledNotificationsBanner: React.FC<DisabledNotificationsBannerProps> = React.memo(
  function DisabledNotificationsBanner({ onRequestPermission, theme }) {
    return (
      <View
        style={[
          styles.notifBanner,
          {
            backgroundColor: theme.alertMuted,
            borderColor: theme.accentAlert,
          },
        ]}
      >
        <View style={styles.notifBannerHeader}>
          <View style={[styles.notifIconCircle, { backgroundColor: '#FFFFFF' }]}>
            <Ionicons name="notifications-off" size={18} color={theme.accentAlert} />
          </View>
          <View style={styles.notifTextCol}>
            <Text style={[styles.notifBannerTitle, { color: theme.textPrimary }]}>
              Notifications are disabled
            </Text>
            <Text style={[styles.notifBannerBody, { color: theme.textSecondary }]}>
              You will not receive reminder notifications or streak-saver alerts. Please enable notifications to get the full experience of Qurus.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onRequestPermission}
          style={[styles.notifActionBtn, { backgroundColor: theme.primary }]}
        >
          <Ionicons name="notifications" size={15} color="#FFFFFF" />
          <Text style={styles.notifActionBtnText}>Enable Notifications</Text>
        </TouchableOpacity>
      </View>
    );
  }
);
