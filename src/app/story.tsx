import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

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
      {/* Top App Bar */}
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
          <Text style={[styles.topBarBadge, { color: theme.primary }]}>ORIGIN STORY</Text>
          <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>Behind Qurus</Text>
        </View>

        <TouchableOpacity
          onPress={handleShareStory}
          style={[styles.navBtn, { backgroundColor: theme.chipBg }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Share story"
        >
          <Ionicons name="share-social-outline" size={19} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title Section */}
        <View style={styles.storyHeader}>
          <View style={[styles.pillBadge, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="sparkles" size={13} color={theme.primary} />
            <Text style={[styles.pillBadgeText, { color: theme.primary }]}>A FOUNDER'S NOTE</Text>
          </View>

          <Text style={[styles.mainHeadline, { color: theme.textPrimary }]}>
            Why I Built Qurus
          </Text>

          <Text style={[styles.authorByline, { color: theme.textSecondary }]}>
            By <Text style={{ color: theme.primary, fontWeight: '700' }}>Hamdan Khubaib</Text> •
            Developer & Creator
          </Text>
        </View>

        {/* Section 1: The Dilemma */}
        <View style={styles.proseBlock}>
          <Text style={[styles.leadParagraph, { color: theme.textPrimary }]}>
            To be completely honest with you, I was looking for a way to study and truly understand
            the Quran from its pure source with its translation. But every time I tried, something
            stood in the way.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            The traditional methods simply didn't fit my reality. As a youngster living in this
            fast-paced world, sitting down daily with rigid discipline, opening heavy volumes of
            tafseer, and trying to digest academic commentaries felt overwhelming. I couldn't
            maintain the discipline, and like many young people, guilt would slowly take over.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Meanwhile, look at how we live our lives. Our modern distractions—whether it's
            Spotify, Instagram, or YouTube—are effortlessly resting right in the palm of our hands.
            Whenever we have two minutes of idle time at a red light, in the metro, or waiting for
            food, our thumb reflexively opens an app.
          </Text>

          <View style={[styles.reflectiveCard, { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle }]}>
            <Ionicons name="phone-portrait-outline" size={24} color={theme.primary} />
            <Text style={[styles.reflectiveCardText, { color: theme.textPrimary }]}>
              "Why can't the pure, unadulterated words of Allah be just as frictionless, accessible,
              and immediate in the palm of my hand as the distractions that consume my hours?"
            </Text>
          </View>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            I had a deep desire to learn, but I was paralyzed because I genuinely had no idea how to
            actually study the Quran. Where do you start? How do you make sense of it all without
            getting lost?
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
              “Don't overthink anything. Just start reading the Quran with its translation.
              Insha'Allah, you will find something that will be coherent with whatever framework you
              use to study—whether it is common sense, science, philosophy, history, social
              sciences, or your own life experience.
              {'\n\n'}
              You will find something that will stick with you like a hook in your mind.”
            </Text>
            <Text style={[styles.quoteCardAuthor, { color: theme.textTertiary }]}>
              — My brother's advice to me
            </Text>
          </View>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            That statement hit me with the force of clarity. The Quran does not demand that you be a
            trained scholar before its words can transform you. Truth resonates naturally. When you
            approach an ayah with an open, inquiring mind, it hooks into your thoughts and stays
            with you all day.
          </Text>
        </View>

        {/* Section 3: The Philosophy of Qurus */}
        <View style={styles.proseBlock}>
          <Text style={[styles.subHeadline, { color: theme.textPrimary }]}>
            The Philosophy of Qurus: An Ayah-Based Sanctuary
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            The entire architecture and philosophy of Qurus was born from that exact realization.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Instead of treating the Quran as a dense textbook where you feel pressured to read pages
            and pages without retaining a single thought, Qurus gives you an{' '}
            <Text style={{ fontWeight: '700', color: theme.textPrimary }}>
              Ayah-based framework
            </Text>
            .
          </Text>

          <View style={styles.featureGrid}>
            <View
              style={[
                styles.featureCard,
                { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={[styles.featureIconBox, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="finger-print-outline" size={22} color={theme.primary} />
              </View>
              <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                Work With Individual Ayahs
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                Every single verse stands on its own dignity. You can isolate an ayah, examine it,
                repeat it, and let it take root.
              </Text>
            </View>

            <View
              style={[
                styles.featureCard,
                { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={[styles.featureIconBox, { backgroundColor: '#D9770618' }]}>
                <Ionicons name="create-outline" size={22} color={theme.accentGold} />
              </View>
              <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                A Personal Study Notebook
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                Attach your personal reflections, questions, and insights directly to verses. Your
                thoughts are saved privately, creating a lifelong record of your spiritual growth.
              </Text>
            </View>

            <View
              style={[
                styles.featureCard,
                { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={[styles.featureIconBox, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="repeat-outline" size={22} color={theme.primary} />
              </View>
              <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                Arabic + Translation Audio
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                Listen to the Arabic recitation immediately followed by the Urdu translation verse by
                verse, so the meaning sinks directly into your consciousness.
              </Text>
            </View>
          </View>
        </View>

        {/* Section 4: Frictionless UX */}
        <View style={styles.proseBlock}>
          <Text style={[styles.subHeadline, { color: theme.textPrimary }]}>
            Studying That Doesn't Feel Like Studying
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            I deliberately engineered the user experience of Qurus to be as frictionless as my
            distractions. I didn't want study to feel like a tedious school assignment.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            With Spotify-style continuous background recitation, lock-screen playback, and a
            floating player, you can listen to the Quran while doing your daily life activities:
          </Text>

          {/* Activity tags */}
          <View style={styles.activityRow}>
            {[
              { icon: 'barbell-outline', text: 'At the gym lifting weights' },
              { icon: 'train-outline', text: 'Commuting on the metro' },
              { icon: 'car-outline', text: 'Driving through traffic' },
              { icon: 'walk-outline', text: 'Walking in the evening' },
            ].map((act, index) => (
              <View
                key={index}
                style={[
                  styles.activityPill,
                  { backgroundColor: theme.chipBg, borderColor: theme.borderSubtle },
                ]}
              >
                <Ionicons name={act.icon as any} size={16} color={theme.primary} />
                <Text style={[styles.activityPillText, { color: theme.textPrimary }]}>
                  {act.text}
                </Text>
              </View>
            ))}
          </View>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Instead of mindlessly doomscrolling social media feeds when you're fatigued, you can pop
            in your earphones and let an ayah speak directly to your soul.
          </Text>
        </View>

        {/* Section 5: My Personal Advice to You */}
        <View style={styles.proseBlock}>
          <Text style={[styles.subHeadline, { color: theme.textPrimary }]}>
            My Personal Advice: Just Give It a Shot
          </Text>

          <Text style={[styles.leadParagraph, { color: theme.textPrimary }]}>
            No matter who you are reading this—a 15-year-old wrestling with doubts, an atheist, an
            agnostic, or someone who feels totally disconnected—it honestly does not matter to me,
            and I genuinely don’t care about labels.
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            Because to be completely transparent with you:{' '}
            <Text style={{ fontWeight: '700', color: theme.textPrimary }}>
              I am one of you right now. Exactly.
            </Text>
          </Text>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            I’m not so religious, and I am definitely not here to lecture you or convert you to Islam.
            I’m just a normal person who was looking for meaning and tired of feeling overwhelmed.
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
                A Personal Promise
              </Text>
            </View>
            <Text style={[styles.adviceCardText, { color: theme.textPrimary }]}>
              “I’m studying the Quran with this exact framework given to me by my brother. I read it
              with its translation, without pressure, letting whatever framework I have—common
              sense, science, philosophy, history, or my own doubts—interact directly with the text.
              {'\n\n'}
              And my advice to you is the exact same: just give it a shot. Don’t worry about labels.
              Just open an ayah, read the meaning, and let it speak for itself.”
            </Text>
          </View>

          <Text style={[styles.bodyParagraph, { color: theme.textSecondary }]}>
            You don’t have to prove anything to anyone. You don’t need to fit into anyone else’s mold.
            Just explore with honest curiosity, one verse at a time.
          </Text>
        </View>

        {/* Section 6: A Personal Closing Note */}
        <View style={[styles.closingCard, { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle }]}>
          <View style={styles.closingTopRow}>
            <View style={[styles.avatarCircle, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarInitial}>H</Text>
            </View>
            <View>
              <Text style={[styles.closingName, { color: theme.textPrimary }]}>Hamdan Khubaib</Text>
              <Text style={[styles.closingTitle, { color: theme.textSecondary }]}>
                Creator of Qurus
              </Text>
            </View>
          </View>

          <Text style={[styles.closingBody, { color: theme.textPrimary }]}>
            If Qurus can help even one person find an ayah that hooks into their heart, sparks their
            curiosity, and bridges their modern life with the Divine book, then every single line of
            code has fulfilled its purpose.
          </Text>

          <Text style={[styles.closingDua, { color: theme.textSecondary }]}>
            May Allah bless your study, grant you deep clarity, and make His words a steadfast light
            in your life.
          </Text>

          <View style={[styles.signatureDivider, { backgroundColor: theme.borderSubtle }]} />

          <TouchableOpacity
            onPress={handleStartStudying}
            activeOpacity={0.88}
            style={[styles.startBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.startBtnText}>Start With Surah Al-Faatiha</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Return Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backLink}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="chevron-back" size={16} color={theme.textTertiary} />
          <Text style={[styles.backLinkText, { color: theme.textTertiary }]}>
            Return to sanctuary
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleGroup: {
    alignItems: 'center',
  },
  topBarBadge: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 60,
  },
  storyHeader: {
    marginBottom: 26,
  },
  pillBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  pillBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  mainHeadline: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 38,
    marginBottom: 8,
  },
  authorByline: {
    fontSize: 14,
  },
  proseBlock: {
    marginBottom: 28,
  },
  leadParagraph: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  bodyParagraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  subHeadline: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 28,
    marginBottom: 14,
  },
  reflectiveCard: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 14,
    gap: 10,
  },
  reflectiveCardText: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  quoteCard: {
    borderLeftWidth: 4,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginVertical: 16,
    gap: 10,
  },
  quoteCardText: {
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  quoteCardAuthor: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  adviceCard: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginVertical: 16,
  },
  adviceIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  adviceCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  adviceCardText: {
    fontSize: 14.5,
    lineHeight: 23,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  featureGrid: {
    gap: 12,
    marginTop: 8,
  },
  featureCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  activityRow: {
    gap: 8,
    marginVertical: 12,
  },
  activityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  activityPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  closingCard: {
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  closingTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  closingName: {
    fontSize: 16,
    fontWeight: '800',
  },
  closingTitle: {
    fontSize: 12,
    marginTop: 1,
  },
  closingBody: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
  },
  closingDua: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  signatureDivider: {
    height: 1,
    marginBottom: 18,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
  },
  backLinkText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
