import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/legalDocument.styles';

interface LegalTopBarProps {
  badge: string;
  title: string;
  theme: ThemeColors;
}

export const LegalTopBar: React.FC<LegalTopBarProps> = React.memo(
  function LegalTopBar({ badge, title, theme }) {
    const router = useRouter();

    return (
      <View style={[styles.topBar, { borderBottomColor: theme.borderSubtle }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.navBtn, { backgroundColor: theme.chipBg }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color={theme.textPrimary} />
        </TouchableOpacity>

        <View style={styles.topBarTitleGroup}>
          <Text style={[styles.topBarBadge, { color: theme.primary }]}>{badge}</Text>
          <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>{title}</Text>
        </View>

        <View style={styles.navBtnPlaceholder} />
      </View>
    );
  }
);
