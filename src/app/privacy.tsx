import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

interface PolicySection {
  id: string;
  number: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  content: string[];
  bullets?: string[];
  callout?: string;
}

const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: 'no-account',
    number: '1',
    title: 'Information We Do Not Require',
    icon: 'person-remove-outline',
    content: [
      'Qurus does not require you to create an account to use the app.',
      'We do not require or collect your name, email address, phone number, password, profile picture, or social-media accounts.',
      'Qurus does not provide a public social feed, user profile directory, public comments system, or user-to-user messaging service.',
    ],
  },
  {
    id: 'local-storage',
    number: '2',
    title: 'Personal Study Data Stored on Your Device',
    icon: 'phone-portrait-outline',
    content: [
      'Qurus allows you to create and maintain your personal study notes and progress. This data is stored locally on your device using on-device storage.',
      'Your reflections, voice recordings, and bookmarks are intended to remain strictly on the device where you created them. There is no cloud sync or server-side account repository.',
    ],
    bullets: [
      'Bookmarks and verse highlights',
      'Written reflection notes and audio voice notes',
      'Recently studied verses and last reading position',
      'Reading streaks and active study history',
      'Reading and audio playback preferences',
    ],
    callout: 'Deleting the app or clearing local app storage will remove your locally saved notes and history. Qurus cannot recover deleted on-device data.',
  },
  {
    id: 'voice-notes',
    number: '3',
    title: 'Voice Notes & Microphone Access',
    icon: 'mic-outline',
    content: [
      'Qurus includes an optional voice-note feature allowing you to record spoken reflections on any verse.',
      'When you choose to record a voice note, Qurus requests permission to use your device microphone solely to create that recording.',
      'Recordings are saved locally on your device. Qurus does not operate a server that receives, processes, or uploads your voice-note recordings.',
    ],
  },
  {
    id: 'reading-activity',
    number: '4',
    title: 'Reading Activity & Local Usage',
    icon: 'time-outline',
    content: [
      'Qurus maintains local application state necessary to resume your reading position, track streaks, and remember your audio and font settings.',
      'The app does not include any third-party behavioral advertising SDK, advertising identifier tracking, or remote reading-history database.',
    ],
  },
  {
    id: 'search',
    number: '5',
    title: 'Search & Reading Interactions',
    icon: 'search-outline',
    content: [
      'The search feature queries Quranic text and Surah metadata packaged locally within the application bundle.',
      'Your search queries are not sent to any external server or analytics service.',
    ],
  },
  {
    id: 'network',
    number: '6',
    title: 'Network Requests & Third-Party Infrastructure',
    icon: 'cloud-download-outline',
    content: [
      'Although study data remains local, Qurus connects to the network to stream Quranic recitation and Urdu translation audio files from the EveryAyah CDN.',
      'The application is also configured with Expo update infrastructure to receive software updates and bug fixes.',
      'Standard web infrastructure logs (such as IP address and request timestamps) may be processed by external content delivery networks during audio streaming.',
    ],
  },
  {
    id: 'permissions',
    number: '7',
    title: 'Device Permissions',
    icon: 'key-outline',
    content: [
      'Qurus only requests device permissions when necessary for a specific feature (namely, microphone access for optional voice notes).',
      'Qurus does not request access to your contacts, photo library, location, or calendar.',
    ],
  },
  {
    id: 'sharing',
    number: '8',
    title: 'Sharing Content',
    icon: 'share-social-outline',
    content: [
      'When you choose to share a verse, Qurus invokes your device’s native system share sheet. The chosen external platform or app processes that content according to its own privacy policy.',
    ],
  },
  {
    id: 'advertising',
    number: '9',
    title: 'No Advertising or Data Selling',
    icon: 'shield-checkmark-outline',
    content: [
      'Qurus is 100% ad-free. We do not display ads, do not include tracking pixels, and never sell or monetize user data.',
    ],
  },
  {
    id: 'retention-security',
    number: '10',
    title: 'Data Retention & Security',
    icon: 'lock-closed-outline',
    content: [
      'Your personal reflections remain on your device until you delete them, clear app data, or uninstall the application.',
      'Because data is stored on-device, maintaining device security (screen lock, passcodes, backups) protects your personal reflections.',
    ],
  },
  {
    id: 'children',
    number: '11',
    title: 'Children’s Privacy',
    icon: 'happy-outline',
    content: [
      'Qurus does not collect personal accounts or personal details from any users, including children.',
    ],
  },
  {
    id: 'rights',
    number: '12',
    title: 'Your Privacy Rights',
    icon: 'ribbon-outline',
    content: [
      'Because data is stored locally, you have direct control over your notes and history by editing or deleting them directly inside the app.',
      'Where applicable law provides additional rights (such as the Digital Personal Data Protection Act, 2023 in India), you may contact us regarding any privacy inquiries.',
    ],
  },
  {
    id: 'contact',
    number: '13',
    title: 'Contact & Project Information',
    icon: 'mail-outline',
    content: [
      'Creator: Hamdan Khubaib',
      'Open Source Project: Qurus',
      'Repository: https://github.com/GitCoder052023/Qurus',
      'For privacy inquiries or feedback, you can reach out via the official project repository.',
    ],
  },
];

export default function PrivacyPolicyScreen() {
  const { theme } = useTheme();
  const router = useRouter();

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
          <Text style={[styles.topBarBadge, { color: theme.primary }]}>Legal</Text>
          <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>Privacy Policy</Text>
        </View>

        <View style={styles.navBtnPlaceholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={[styles.badgePill, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="shield-checkmark" size={14} color={theme.primary} />
            <Text style={[styles.badgePillText, { color: theme.primary }]}>Privacy First</Text>
          </View>
          <Text style={[styles.headline, { color: theme.textPrimary }]}>
            Qurus Privacy Policy
          </Text>
          <Text style={[styles.dateMeta, { color: theme.textSecondary }]}>
            Effective & Last Updated: September 6, 2026
          </Text>
          <Text style={[styles.summaryLead, { color: theme.textPrimary }]}>
            Your personal study activity should remain truly personal. Qurus is built without accounts, without ads, and stores your reflections locally on your device.
          </Text>
        </View>

        {/* Highlight Card */}
        <View
          style={[
            styles.highlightCard,
            { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
          ]}
        >
          <Ionicons name="sparkles-outline" size={20} color={theme.primary} />
          <Text style={[styles.highlightCardText, { color: theme.textPrimary }]}>
            No sign-up • No personal profiling • On-device private study data • Ad-free forever
          </Text>
        </View>

        {/* Policy Sections */}
        <View style={styles.sectionsList}>
          {PRIVACY_SECTIONS.map((sec) => (
            <View
              key={sec.id}
              style={[
                styles.sectionCard,
                { backgroundColor: theme.card, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIconBox, { backgroundColor: theme.primaryMuted }]}>
                  <Ionicons name={sec.icon} size={18} color={theme.primary} />
                </View>
                <View style={styles.sectionTitleCol}>
                  <Text style={[styles.sectionNumber, { color: theme.primary }]}>
                    Section {sec.number}
                  </Text>
                  <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                    {sec.title}
                  </Text>
                </View>
              </View>

              <View style={styles.sectionBody}>
                {sec.content.map((paragraph, pIdx) => (
                  <Text
                    key={pIdx}
                    style={[styles.paragraphText, { color: theme.textSecondary }]}
                  >
                    {paragraph}
                  </Text>
                ))}

                {sec.bullets && (
                  <View style={styles.bulletsList}>
                    {sec.bullets.map((bullet, bIdx) => (
                      <View key={bIdx} style={styles.bulletRow}>
                        <View style={[styles.bulletDot, { backgroundColor: theme.primary }]} />
                        <Text style={[styles.bulletText, { color: theme.textPrimary }]}>
                          {bullet}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {sec.callout && (
                  <View
                    style={[
                      styles.calloutBox,
                      { backgroundColor: theme.secondaryMuted, borderColor: theme.secondary },
                    ]}
                  >
                    <Ionicons name="information-circle-outline" size={16} color={theme.secondary} />
                    <Text style={[styles.calloutText, { color: theme.textPrimary }]}>
                      {sec.callout}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Footer info */}
        <View style={styles.footerNote}>
          <Text style={[styles.footerText, { color: theme.textTertiary }]}>
            Qurus is an open-source project by Hamdan Khubaib.
          </Text>
        </View>
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
    paddingHorizontal: 18,
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
  navBtnPlaceholder: {
    width: 38,
  },
  topBarTitleGroup: {
    alignItems: 'center',
  },
  topBarBadge: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 20,
  },
  badgePill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  dateMeta: {
    fontSize: 13,
    marginBottom: 12,
  },
  summaryLead: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '500',
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 24,
  },
  highlightCardText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  sectionsList: {
    gap: 16,
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitleCol: {
    flex: 1,
  },
  sectionNumber: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 1,
  },
  sectionBody: {
    gap: 10,
  },
  paragraphText: {
    fontSize: 14,
    lineHeight: 22,
  },
  bulletsList: {
    gap: 6,
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  bulletText: {
    fontSize: 13.5,
    lineHeight: 20,
    flex: 1,
  },
  calloutBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    marginTop: 4,
  },
  calloutText: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '500',
    flex: 1,
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
  },
});
