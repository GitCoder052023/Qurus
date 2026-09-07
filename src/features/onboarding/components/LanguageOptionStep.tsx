import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { TranslationLanguage } from '../../../types';
import { TRANSLATION_LANGUAGES } from '../../../data/surahs';
import { ONBOARDING_LANGUAGES, EASE } from '../data/onboardingOptions';
import { styles } from '../styles/onboarding.styles';

interface LanguageOptionStepProps {
  selectedLanguage: TranslationLanguage;
  onSelectLanguage: (lang: TranslationLanguage) => void;
  theme: any;
}

export function LanguageOptionStep({
  selectedLanguage,
  onSelectLanguage,
  theme,
}: LanguageOptionStepProps) {
  return (
    <Animated.View
      key="languages"
      entering={FadeInDown.duration(420).easing(EASE)}
      exiting={FadeOut.duration(160)}
    >
      <View style={styles.stepRow}>
        <View style={[styles.iconDisc, { backgroundColor: theme.primaryMuted }]}>
          <Ionicons name="language-outline" size={20} color={theme.primary} />
        </View>
        <Text style={[styles.stepNum, { color: theme.primary }]}>07</Text>
        <Text style={[styles.kicker, { color: theme.primary, fontWeight: '700' }]}>
          TRANSLATION AUDIO
        </Text>
      </View>

      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Choose your translation language
      </Text>

      <Text style={[styles.intentionSubtitle, { color: theme.textSecondary }]}>
        Qurus recites translations right alongside Arabic verses. Select your preferred translation voice—you can switch anytime in Settings.
      </Text>

      {/* 1. Language Option Cards */}
      <View style={styles.languageCardsWrap}>
        {ONBOARDING_LANGUAGES.map((item) => {
          const config = TRANSLATION_LANGUAGES[item.id];
          const isSelected = selectedLanguage === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => onSelectLanguage(item.id)}
              style={[
                styles.languageCard,
                {
                  backgroundColor: isSelected ? theme.card : theme.surface,
                  borderColor: isSelected ? theme.primary : theme.borderSubtle,
                  borderWidth: isSelected ? 2 : StyleSheet.hairlineWidth,
                },
              ]}
            >
              <View style={styles.languageCardTop}>
                <View style={styles.languageBadgeRow}>
                  <View style={[styles.langPill, { backgroundColor: theme.primaryMuted }]}>
                    <Text style={[styles.langPillText, { color: theme.primary }]}>
                      {config.flag} {item.badge}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.goalRadioCircle,
                    {
                      borderColor: isSelected ? theme.primary : theme.border,
                      backgroundColor: isSelected ? theme.primary : 'transparent',
                    },
                  ]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  )}
                </View>
              </View>

              <Text style={[styles.languageName, { color: theme.textPrimary }]}>
                {config.name} {config.nativeName !== config.name ? `• ${config.nativeName}` : ''}
              </Text>
              <Text style={[styles.languageReciter, { color: theme.primary }]}>
                {config.voiceName} ({config.author})
              </Text>
              <Text style={[styles.languageDesc, { color: theme.textSecondary }]}>
                {item.desc}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Info Note */}
      <View
        style={[
          styles.privacyTipBox,
          { backgroundColor: theme.surfaceHighlight, borderColor: theme.borderSubtle, marginTop: 12 },
        ]}
      >
        <Ionicons name="information-circle-outline" size={17} color={theme.primary} />
        <Text style={[styles.privacyTipText, { color: theme.textSecondary }]}>
          Listen to Arabic recitation alone, translation alone, or both intertwined. You can switch translation voices anytime in Settings.
        </Text>
      </View>
    </Animated.View>
  );
}
