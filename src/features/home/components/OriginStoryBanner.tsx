import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/home.styles';

interface OriginStoryBannerProps {
  theme: ThemeColors;
}

export const OriginStoryBanner: React.FC<OriginStoryBannerProps> = React.memo(
  function OriginStoryBanner({ theme }) {
    const router = useRouter();

    return (
      <View style={styles.section}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/story')}
          style={[
            styles.storyBanner,
            {
              backgroundColor: theme.card,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={styles.storyBannerHeader}>
            <Text style={[styles.storyBadgeText, { color: theme.primary }]}>A note from Hamdan</Text>
            <Text style={[styles.storyAuthorText, { color: theme.textTertiary }]}>
              Founder
            </Text>
          </View>

          <Text style={[styles.storyBannerTitle, { color: theme.textPrimary }]}>
            Why I built Qurus
          </Text>

          <Text style={[styles.storyBannerDesc, { color: theme.textSecondary }]}>
            “I wanted to explore the Quran directly with translation, without judgment or complexity. Then my brother told me: ‘Just start reading... whatever framework you use, you will find a verse that sticks like a hook in your mind.’”
          </Text>

          <View style={[styles.storyBannerFooter, { borderTopColor: theme.borderSubtle }]}>
            <Text style={[styles.storyBannerAction, { color: theme.primary }]}>
              Read the story
            </Text>
            <Ionicons name="arrow-forward" size={14} color={theme.primary} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);
