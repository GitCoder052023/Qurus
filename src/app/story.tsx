import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../features/story/styles/story.styles';
import { StoryTopBar } from '../features/story/components/StoryTopBar';
import { StoryHeader } from '../features/story/components/StoryHeader';
import { StoryPhilosophyGrid } from '../features/story/components/StoryPhilosophyGrid';
import { StoryActivityTags } from '../features/story/components/StoryActivityTags';
import { StoryClosingCard } from '../features/story/components/StoryClosingCard';

export default function OriginStoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleShareStory = async () => {
    try {
      await Share.share({
        title: 'The Story Behind Qurus',
        message:
          '“Just start reading Quran with its translation... you will find an ayah that sticks with you like a hook in your mind.” — The origin story of Qurus by Hamdan Khubaib.',
      });
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  const handleStartStudying = () => {
    router.push({
      pathname: '/reader/[surah]',
      params: { surah: '1', ayah: '1' },
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StoryTopBar onShare={handleShareStory} theme={theme} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title Section */}
        <StoryHeader theme={theme} />

        {/* Section 1: The Dilemma */}
        <View style={styles.proseBlock}>
          <Text style={[styles.leadParagraph, { color: theme.textPrimary }]}>
            To be completely honest with you, I was looking for a way to explore and understand the
            Quran directly from its source through translation. But every time I tried, something
            stood in the way.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Traditional methods simply didn't fit my reality. As a youngster living in this
            fast-paced world, sitting down with rigid expectations, opening heavy volumes of
            classical commentary, and trying to digest dense academic text felt overwhelming. I couldn't
            maintain the discipline, and like many young people, frustration and guilt slowly took over.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Meanwhile, look at how we live our lives. Our modern distractions—whether it's
            Spotify, Instagram, or YouTube—are effortlessly resting right in the palm of our hands.
            Whenever we have two minutes of idle time at a red light, on the commute, or waiting for
            food, our thumb reflexively opens an app.
          </Text>

          <View style={[styles.reflectiveCard, { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle }]}>
            <Ionicons name="phone-portrait-outline" size={24} color={theme.primary} />
            <Text style={[styles.reflectiveCardText, { color: theme.textPrimary }]}>
              "Why can't exploring a text with an open mind be just as frictionless, accessible,
              and immediate in the palm of my hand as the distractions that consume my hours?"
            </Text>
          </View>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            I had a deep desire to explore, but I was stuck because I genuinely had no idea how to
            approach it without feeling judged or getting lost in complexity. Where do you start? How do you make sense of it on your own terms?
          </Text>
        </View>

        {/* Section 2: The Turning Point */}
        <View style={styles.proseBlock}>
          <Text style={[styles.subHeadline, { color: theme.textPrimary }]}>
            The Advice That Changed Everything
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            One day, I opened up to my brother about this confusion. His response was so simple, yet
            it completely dismantled all my mental barriers. He looked at me and said:
          </Text>

          {/* The Brother's Quote Card */}
          <View
            style={[
              styles.quoteCard,
              {
                backgroundColor: theme.surface,
                borderLeftColor: theme.primary,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={22} color={theme.primary} />
            <Text style={[styles.quoteCardText, { color: theme.textPrimary }]}>
              “Don't overthink anything. Just start reading the verses with their translation.
              Whatever framework you use to make sense of the world—whether it is common sense, science, philosophy, history, or your own lived experience—you will find something coherent.
              {'\n\n'}
              You will find something that sticks with you like a hook in your mind.”
            </Text>
            <Text style={[styles.quoteCardAuthor, { color: theme.textTertiary }]}>
              — My brother's advice to me
            </Text>
          </View>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            That statement hit me with the force of clarity. You don't need to be a scholar or have predefined beliefs before words can challenge or move you. When you approach a verse with an honest, inquiring mind, it sparks curiosity and stays with you throughout your day.
          </Text>
        </View>

        {/* Section 3: The Philosophy of Qurus */}
        <View style={styles.proseBlock}>
          <Text style={[styles.subHeadline, { color: theme.textPrimary }]}>
            The Philosophy of Qurus: A Modern Thinking Space
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            The entire architecture and philosophy of Qurus was born from that exact realization.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Instead of treating the text as an intimidating assignment where you feel pressured to rush through pages without retaining a single thought, Qurus gives you a{' '}
            <Text style={{ fontWeight: '700', color: theme.textPrimary }}>
              verse-by-verse framework
            </Text>
            .
          </Text>

          <StoryPhilosophyGrid theme={theme} />
        </View>

        {/* Section 4: Frictionless UX */}
        <View style={styles.proseBlock}>
          <Text style={[styles.subHeadline, { color: theme.textPrimary }]}>
            Studying That Doesn't Feel Like an Assignment
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            I deliberately engineered the user experience of Qurus to be as frictionless as our daily apps.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            With smooth background playback, lock-screen controls, and a floating player, you can listen while moving through life:
          </Text>

          {/* Activity tags */}
          <StoryActivityTags theme={theme} />

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Instead of mindlessly doomscrolling feeds when you have a free minute, you can pop in earphones and let a verse prompt a moment of genuine contemplation.
          </Text>
        </View>

        {/* Section 5: My Personal Advice to You */}
        <View style={styles.proseBlock}>
          <Text style={[styles.subHeadline, { color: theme.textPrimary }]}>
            My Personal Advice: Just Give It an Honest Shot
          </Text>

          <Text style={[styles.leadParagraph, { color: theme.textPrimary }]}>
            No matter who you are reading this—a teenager wrestling with existential questions, an atheist, an agnostic, or someone who has never felt connected to organized religion—labels don't matter here.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Because to be completely honest with you:{' '}
            <Text style={{ fontWeight: '700', color: theme.textPrimary }}>
              I am on this journey of figuring things out right alongside you.
            </Text>
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            I'm not here to lecture, preach, or push any dogma on you. I’m just a normal person who wanted to read the text directly, without bias, and tired of feeling overwhelmed.
          </Text>

          {/* Sincere Advice Box */}
          <View
            style={[
              styles.adviceCard,
              {
                backgroundColor: theme.cardElevated,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <View style={styles.adviceIconRow}>
              <Ionicons name="heart-half-outline" size={22} color={theme.accentGold} />
              <Text style={[styles.adviceCardTitle, { color: theme.textPrimary }]}>
                An Open Perspective
              </Text>
            </View>
            <Text style={[styles.adviceCardText, { color: theme.textPrimary }]}>
              “I’m exploring the Quran with this exact mindset. I read it with translation, without pressure, letting whatever lens I have—reason, science, philosophy, history, or my own doubts—interact directly with the text.
              {'\n\n'}
              And my advice to you is the exact same: just give it an honest shot. Don’t worry about labels. Just open a verse, read what it says, and see where your thinking takes you.”
            </Text>
          </View>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            You don’t have to prove anything to anyone. You don’t need to fit into anyone else’s mold. Just explore with honest curiosity, one verse at a time.
          </Text>
        </View>

        {/* Section 6: A Personal Closing Note */}
        <StoryClosingCard onStartStudying={handleStartStudying} theme={theme} />

        {/* Return Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backLink}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="chevron-back" size={16} color={theme.textTertiary} />
          <Text style={[styles.backLinkText, { color: theme.textTertiary }]}>
            Return to home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
