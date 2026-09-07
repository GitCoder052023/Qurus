import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../styles/settings.styles';

interface AboutLegalSectionProps {
  theme: any;
}

export function AboutLegalSection({ theme }: AboutLegalSectionProps) {
  const router = useRouter();

  return (
    <>
      {/* SECTION: Support */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
          Support
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/feedback' as any)}
            style={[styles.settingItem, styles.rowBetween]}
          >
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                Contact Us & Feedback
              </Text>
              <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                Report a bug, suggest features, or send general feedback
              </Text>
            </View>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SECTION: About Qurus */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
          About Qurus
        </Text>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => router.push('/story')}
          style={[
            styles.storyCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={styles.storyCardTopRow}>
            <View style={[styles.storyCardIconBox, { backgroundColor: theme.primaryMuted }]}>
              <Ionicons name="leaf-outline" size={18} color={theme.primary} />
            </View>
            <View style={[styles.storyCardTag, { backgroundColor: theme.chipBg }]}>
              <Text style={[styles.storyCardTagText, { color: theme.primary }]}>
                Hamdan Khubaib
              </Text>
            </View>
          </View>

          <Text style={[styles.storyCardTitle, { color: theme.textPrimary }]}>
            The story behind Qurus
          </Text>
          <Text style={[styles.storyCardSubtitle, { color: theme.textSecondary }]}>
            Why I built a verse-by-verse exploration space in the palm of your hand—from feeling overwhelmed by traditional expectations to seeking truth with an open mind.
          </Text>

          <View style={[styles.storyCardFooter, { borderTopColor: theme.borderSubtle }]}>
            <Text style={[styles.storyCardActionText, { color: theme.primary }]}>
              Read founder’s note
            </Text>
            <Ionicons name="arrow-forward" size={14} color={theme.primary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* SECTION: Legal */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
          Legal
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/terms' as any)}
            style={[styles.settingItem, styles.rowBetween]}
          >
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                Terms of Use
              </Text>
              <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                Acceptable use, open-source MIT license & disclaimers
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/privacy' as any)}
            style={[styles.settingItem, styles.rowBetween]}
          >
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                Privacy Policy
              </Text>
              <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                On-device private data, no tracking & EveryAyah CDN audio
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/legal-consent' as any)}
            style={[styles.settingItem, styles.rowBetween]}
          >
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                Terms & Consent Review
              </Text>
              <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                Review your first-launch legal agreement
              </Text>
            </View>
            <Ionicons name="shield-checkmark-outline" size={18} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* App Info & Integrity Acknowledgments */}
      <View style={styles.appInfoSection}>
        <Text style={[styles.appInfoTitle, { color: theme.textPrimary }]}>Qurus v2.3.0</Text>
        <Text style={[styles.appInfoDesc, { color: theme.textSecondary }]}>
          Dedicated to open, honest reflection & continuous listening.
        </Text>
        <Text style={[styles.appInfoSource, { color: theme.textTertiary }]}>
          Arabic Text: Verified Uthmani Hafs • Translation: Fateh Muhammad Jalandhry • Audio: EveryAyah CDN
        </Text>
      </View>
    </>
  );
}
