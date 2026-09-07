import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from 'react-native-reanimated';
import { StoryChapter } from '../types';
import { EASE } from '../data/onboardingOptions';
import { styles } from '../styles/onboarding.styles';

interface StoryChapterSlideProps {
  chapter: StoryChapter;
  stepLabel: string;
  theme: any;
  breatheStyle: any;
}

export function StoryChapterSlide({
  chapter,
  stepLabel,
  theme,
  breatheStyle,
}: StoryChapterSlideProps) {
  return (
    <Animated.View
      key={chapter.id}
      entering={FadeInDown.duration(520).easing(EASE)}
      exiting={FadeOut.duration(160)}
    >
      <View style={styles.stepRow}>
        <Animated.View
          style={[
            styles.iconDisc,
            { backgroundColor: chapter.wash },
            breatheStyle,
          ]}
        >
          <Ionicons name={chapter.heroIcon} size={22} color={chapter.accent} />
        </Animated.View>
        <Text style={[styles.stepNum, { color: chapter.accent }]}>{stepLabel}</Text>
        <Text style={[styles.kicker, { color: theme.textTertiary }]}>{chapter.kicker}</Text>
      </View>

      <Text style={[styles.title, { color: theme.textPrimary }]}>{chapter.title}</Text>

      <Text style={[styles.highlight, { color: chapter.accent }]}>
        {chapter.highlightPhrase}
      </Text>

      <View style={styles.prose}>
        {chapter.proseParagraphs.map((para) => (
          <Text key={para.slice(0, 24)} style={[styles.body, { color: theme.textSecondary }]}>
            {para}
          </Text>
        ))}
      </View>

      {chapter.quote ? (
        <Animated.View
          entering={FadeIn.delay(120).duration(480)}
          style={[
            styles.quote,
            { backgroundColor: theme.card, borderColor: chapter.wash },
          ]}
        >
          <Text style={[styles.quoteText, { color: theme.textPrimary }]}>
            {chapter.quote.text}
          </Text>
          <Text style={[styles.quoteAuthor, { color: chapter.accent }]}>
            {chapter.quote.author}
          </Text>
        </Animated.View>
      ) : null}

      {chapter.features ? (
        <View style={styles.stack}>
          {chapter.features.map((feat, i) => (
            <Animated.View
              key={feat.title}
              entering={FadeInUp.delay(80 * i).duration(420).easing(EASE)}
              style={[
                styles.feature,
                { backgroundColor: theme.card, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={[styles.featureIcon, { backgroundColor: chapter.wash }]}>
                <Ionicons name={feat.icon} size={18} color={chapter.accent} />
              </View>
              <View style={styles.featureCopy}>
                <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                  {feat.title}
                </Text>
                <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                  {feat.desc}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      ) : null}

      {chapter.activities ? (
        <View style={styles.activityWrap}>
          {chapter.activities.map((act, i) => (
            <Animated.View
              key={act.label}
              entering={FadeInUp.delay(60 * i).duration(380).easing(EASE)}
              style={[styles.activity, { backgroundColor: chapter.wash }]}
            >
              <Ionicons name={act.icon} size={16} color={chapter.accent} />
              <Text style={[styles.activityLabel, { color: theme.textPrimary }]}>
                {act.label}
              </Text>
            </Animated.View>
          ))}
        </View>
      ) : null}

      {chapter.founderSignature ? (
        <Animated.View
          entering={FadeInUp.delay(160).duration(480).easing(EASE)}
          style={[
            styles.founder,
            { backgroundColor: theme.card, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={styles.founderRow}>
            <View style={[styles.avatar, { backgroundColor: chapter.accent }]}>
              <Text style={styles.avatarLetter}>H</Text>
            </View>
            <View>
              <Text style={[styles.founderName, { color: theme.textPrimary }]}>
                {chapter.founderSignature.name}
              </Text>
              <Text style={[styles.founderRole, { color: theme.textTertiary }]}>
                {chapter.founderSignature.role}
              </Text>
            </View>
          </View>
          <Text style={[styles.founderNote, { color: theme.textSecondary }]}>
            {chapter.founderSignature.note}
          </Text>
          <Text style={[styles.founderDua, { color: chapter.accent }]}>
            {chapter.founderSignature.closingWish}
          </Text>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}
