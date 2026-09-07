import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/story.styles';

interface StoryTopBarProps {
  onShare: () => void;
  theme: ThemeColors;
}

export const StoryTopBar: React.FC<StoryTopBarProps> = React.memo(function StoryTopBar({
  onShare,
  theme,
}) {
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
        <Text style={[styles.topBarBadge, { color: theme.primary }]}>Origin</Text>
        <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>Behind Qurus</Text>
      </View>

      <TouchableOpacity
        onPress={onShare}
        style={[styles.navBtn, { backgroundColor: theme.chipBg }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityLabel="Share story"
      >
        <Ionicons name="share-social-outline" size={19} color={theme.textPrimary} />
      </TouchableOpacity>
    </View>
  );
});
