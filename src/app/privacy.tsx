import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
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
      'Qurus does not require you to create an account.',
      'We do not require your name, password, phone number, social-media account, or profile information in order to use the core application.',
      'Qurus does not provide a social feed, public profile, comments system, or user-to-user messaging service.',
    ],
  },
  {
    id: 'local-storage',
    number: '2',
    title: 'Personal Study Data Stored on Your Device',
    icon: 'phone-portrait-outline',
    content: [
      'Qurus allows you to create and maintain personal study information. The current Qurus application stores this information locally on your device using on-device storage. Qurus does not provide a server-side account or cloud synchronization system for this personal study information.',
      'Your written reflections and voice recordings are intended to remain on the device on which you created them. They are not uploaded to Qurus or PostHog as part of Qurus analytics.',
    ],
    bullets: [
      'Bookmarks and verse highlights',
      'Written reflection notes and voice notes',
      'Recently studied verses and last studied location',
      'Reading streak information',
      'Reading and audio preferences',
      'Onboarding state',
    ],
    callout: 'Deleting the application, clearing its app data, changing devices, or otherwise removing local application storage may permanently remove locally stored study information. Qurus cannot recover local study information that has been deleted or lost from your device.',
  },
  {
    id: 'voice-notes',
    number: '3',
    title: 'Voice Notes and Microphone Access',
    icon: 'mic-outline',
    content: [
      'Qurus includes an optional voice-note feature.',
      'When you choose to record a voice note, Qurus requests permission to use your device microphone. The microphone is used to create the recording you explicitly request.',
      'Voice recordings are associated with the relevant verse and stored locally on your device. Qurus does not operate a server that receives or stores your voice-note recordings as part of the current application architecture.',
      'Qurus analytics may record the duration, in seconds, of a completed voice-note recording solely to understand feature usage. The recording itself, its binary data, and any transcript are not sent to PostHog.',
      'You can remove a voice note from the application through the available note controls.',
      'You are responsible for ensuring that anything you record is appropriate for your intended use and does not unlawfully capture another person’s private communications or information.',
    ],
  },
  {
    id: 'analytics',
    number: '4',
    title: 'Anonymous Analytics and Product Usage',
    icon: 'stats-chart-outline',
    content: [
      'Qurus uses PostHog for lightweight product analytics to understand high-level application health and feature usage (such as active-user counts, retention, and adoption of features).',
      'Anonymous Identifier: On first use, Qurus generates a random UUID v4 identifier locally. It is stored on the device in Qurus’s local application storage. It is not derived from your name, email address, phone number, contacts, advertising ID, MAC address, or other hardware identifier. Distinguishing new from returning installations is done without directly identifying you as a named individual.',
      'Limited events sent to PostHog include:',
    ],
    bullets: [
      'App opens, platform, and Qurus app version',
      'The numeric Surah number opened',
      'Reciter identifier, playback mode, and playback speed when audio is played',
      'Search filter type, without the text of the search query',
      'Counts of bookmarks and highlights created',
      'Whether a newly created note includes a voice note, without the note contents',
      'Voice-note duration (seconds), without the recording itself',
      'Non-sensitive preference changes (setting names and values used for product analysis)',
      'Completion of onboarding and agreement to the app’s legal consent screen',
    ],
    callout: 'What is NEVER sent to analytics: Written reflection/journal text, voice recordings or audio binaries, voice-note transcripts, Quran verse text or translation snippets, search queries, passwords/credentials, device hardware identifiers, or session replays (session replay is disabled).',
  },
  {
    id: 'feedback',
    number: '5',
    title: 'Contact Us and In-App Feedback',
    icon: 'chatbubble-ellipses-outline',
    content: [
      'Qurus provides a native Contact Us & Feedback feature within the application. If you have a question, encounter a problem, want to report a bug, or have other feedback about Qurus, we encourage you to contact us through the in-app Contact Us & Feedback feature first.',
      'Unlike ordinary product analytics, a feedback submission contains the information you explicitly choose to submit: category (Bug Report, Feature Request, General Feedback, or Other), the message you write, your Qurus app version, your platform, and an email address only if you voluntarily provide one.',
      'Feedback is submitted through PostHog’s event-capture infrastructure without requiring a custom backend. You can submit feedback without providing an email address.',
      'Please do not include passwords, authentication secrets, private Quran reflections, confidential personal information, or other sensitive information in a feedback message.',
      'Qurus does not intentionally attach your local bookmarks, highlights, notes, voice recordings, reading history, or Quran-study content to feedback submissions.',
    ],
    callout: 'Support Contact Preference: Please use the in-app Contact Us & Feedback feature first. If you have submitted a request and do not receive a response, you may contact us directly by email at hamdankhubaib959@gmail.com.',
  },
  {
    id: 'search',
    number: '6',
    title: 'Search and Reading Interactions',
    icon: 'search-outline',
    content: [
      'Qurus allows you to search for Surahs and verse references against Quran data packaged locally within the application bundle.',
      'For analytics purposes, Qurus may record that a search was performed and the selected filter type, but it does NOT send the text typed into the search field to PostHog.',
      'Qurus may record the numeric Surah number associated with a Surah-opening event to understand broad feature engagement; these events are not intended to create a server-side copy of your personal study notes or detailed reading history.',
    ],
  },
  {
    id: 'network',
    number: '7',
    title: 'Network Requests and Third-Party Infrastructure',
    icon: 'cloud-download-outline',
    content: [
      'Although personal study data remains local, Qurus connects to the network to stream Quranic recitation and Urdu translation audio, load artwork, receive application updates via Expo, and transmit analytics or feedback when PostHog is configured.',
      'When your device communicates with a third-party service, that provider may receive ordinary technical information associated with the request, such as an IP address, request timestamp, or device/network metadata.',
      'Third-party providers process information according to their own privacy policies, terms, security controls, and retention practices.',
    ],
  },
  {
    id: 'permissions',
    number: '8',
    title: 'Device Permissions',
    icon: 'key-outline',
    content: [
      'Qurus may request device permissions necessary for specific features. In particular, microphone permission is requested when you choose to record a voice note.',
      'Qurus does not request access to your contacts, photos, address book, or device location as part of the core application functionality.',
      'You can manage and revoke permissions at any time through your device’s operating-system settings.',
    ],
  },
  {
    id: 'sharing',
    number: '9',
    title: 'Sharing Content',
    icon: 'share-social-outline',
    content: [
      'Qurus includes a system sharing feature for verses.',
      'When you choose to share a verse, the application passes the selected verse content to the native share sheet provided by your device and operating system.',
      'Qurus does not operate the external application or service you choose for sharing, and content shared outside Qurus becomes subject to the policies of that external service.',
    ],
  },
  {
    id: 'advertising',
    number: '10',
    title: 'Advertising',
    icon: 'shield-checkmark-outline',
    content: [
      'Qurus is designed completely without advertisements.',
      'Qurus does not intentionally use behavioral advertising, sell advertising profiles, or sell users’ personal information.',
      'The PostHog integration is strictly for product analytics and feedback, not for serving ads.',
    ],
  },
  {
    id: 'data-retention',
    number: '11',
    title: 'Data Retention',
    icon: 'time-outline',
    content: [
      'Qurus generally does not maintain a remote copy of your locally stored notes, bookmarks, highlights, voice recordings, or other personal study content.',
      'The anonymous analytics identifier may remain associated with analytics events in PostHog according to PostHog’s applicable storage and retention practices.',
      'Feedback submissions may be retained by the services used to receive and process feedback in accordance with their applicable retention practices.',
      'Local data remains on your device until you delete it, clear the relevant application data, or uninstall the application.',
    ],
  },
  {
    id: 'security',
    number: '12',
    title: 'Security',
    icon: 'lock-closed-outline',
    content: [
      'Qurus is designed to minimize personal-data collection and keep personal study information on-device.',
      'The analytics integration is built with strong privacy boundaries: locally generated random UUIDs, sanitized event payloads, disabled session replays, and no analytics dependency for core application functions.',
      'However, no software, device, storage system, or internet transmission can be guaranteed to be completely secure. You are responsible for maintaining the security of your device (screen locks, passcodes, backups).',
    ],
  },
  {
    id: 'children',
    number: '13',
    title: 'Children’s Privacy',
    icon: 'happy-outline',
    content: [
      'Qurus does not require users to create accounts or provide personal information to use the core application.',
      'Qurus does not knowingly seek to collect personal information from children for advertising purposes or build child profiles.',
      'Where a user voluntarily submits feedback containing personal information, that information is processed as described in this Privacy Policy.',
      'If you believe a child has provided personal information to Qurus and you would like us to review it, please contact us.',
    ],
  },
  {
    id: 'rights',
    number: '14',
    title: 'Your Privacy Rights',
    icon: 'ribbon-outline',
    content: [
      'Depending on where you live, you may have legal rights concerning personal data, including rights relating to access, correction, deletion, consent, or withdrawal.',
      'Because study data is primarily stored locally, many requests concerning notes, bookmarks, highlights, and voice recordings can be handled directly by deleting or changing the relevant local data on your device.',
      'Where Indian data-protection law applies, Qurus intends to operate its personal-data practices in accordance with applicable requirements, including the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 (notified November 14, 2025).',
    ],
  },
  {
    id: 'third-parties',
    number: '15',
    title: 'Third-Party Services',
    icon: 'globe-outline',
    content: [
      'The current application relies on third-party infrastructure and libraries to provide parts of its functionality:',
    ],
    bullets: [
      'PostHog — product analytics and in-app feedback event ingestion',
      'Expo / Expo Updates infrastructure — application updates and platform services',
      'EveryAyah-hosted audio resources — Quran recitation and Urdu translation audio streaming',
      'External image-hosting resources — player artwork and assets',
      'Apple, Google, Android, iOS services — device and operating-system functionality',
    ],
  },
  {
    id: 'changes',
    number: '16',
    title: 'Changes to This Privacy Policy',
    icon: 'refresh-outline',
    content: [
      'We may update this Privacy Policy when Qurus changes, or when legal or regulatory requirements change.',
      'When we make material changes, we will update the “Last Updated” date. Your continued use of Qurus after an updated policy becomes effective means the updated policy applies.',
    ],
  },
  {
    id: 'contact',
    number: '17',
    title: 'Contact Us',
    icon: 'mail-outline',
    content: [
      'For privacy questions, privacy requests, or concerns, please use the in-app Contact Us & Feedback feature first.',
      'If you do not receive a response through the in-app support system, you may contact us directly by email:',
      'Creator: Hamdan Khubaib',
      'Email: hamdankhubaib959@gmail.com',
      'Project: Qurus',
      'Repository: https://github.com/GitCoder052023/Qurus',
    ],
  },
  {
    id: 'scope',
    number: '18',
    title: 'Important Scope Note',
    icon: 'information-circle-outline',
    content: [
      'This Privacy Policy describes the current Qurus application architecture as of the Effective Date above.',
      'Qurus may evolve over time. If new versions introduce features such as optional accounts, synchronization, additional analytics, notifications, subscriptions, or cloud storage that materially affect privacy, this policy will be updated before or alongside the release.',
    ],
  },
  {
    id: 'third-party-policies',
    number: '19',
    title: 'Third-Party Privacy Policies',
    icon: 'documents-outline',
    content: [
      'Because Qurus uses independent third-party infrastructure (such as PostHog and EveryAyah), you should review the privacy documentation of those providers for information about their own processing practices.',
      'This Privacy Policy describes Qurus’s intended collection and use of information; it does not replace the privacy notices of independent providers.',
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
            Effective Date: September 6, 2026 • Last Updated: September 6, 2026
          </Text>
          <Text style={[styles.summaryLead, { color: theme.textPrimary }]}>
            Qurus is a Quran reading, listening, and personal reflection application created by Hamdan Khubaib. Our approach is privacy-first: personal study content is kept on-device, while product analytics is intentionally limited to anonymous identifiers and sanitized usage data.
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

        {/* Important Callout */}
        <View
          style={[
            styles.introCallout,
            { backgroundColor: theme.secondaryMuted, borderColor: theme.secondary },
          ]}
        >
          <Ionicons name="information-circle" size={20} color={theme.secondary} />
          <Text style={[styles.introCalloutText, { color: theme.textPrimary }]}>
            <Text style={{ fontWeight: '700' }}>Important:</Text> Qurus does not require an account. However, Qurus uses PostHog for anonymous product analytics and in-app feedback. The PostHog integration is described in detail below.
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

        {/* Contact Links Footer Card */}
        <View
          style={[
            styles.contactCard,
            { backgroundColor: theme.card, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.contactCardTitle, { color: theme.textPrimary }]}>
            Questions or Privacy Inquiries?
          </Text>
          <Text style={[styles.contactCardDesc, { color: theme.textSecondary }]}>
            Please use the in-app Contact Us & Feedback screen. Alternatively, reach out directly:
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:hamdankhubaib959@gmail.com')}
            style={[styles.contactLinkRow, { backgroundColor: theme.surface }]}
          >
            <Ionicons name="mail-outline" size={18} color={theme.primary} />
            <Text style={[styles.contactLinkText, { color: theme.primary }]}>
              hamdankhubaib959@gmail.com
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://github.com/GitCoder052023/Qurus')}
            style={[styles.contactLinkRow, { backgroundColor: theme.surface }]}
          >
            <Ionicons name="logo-github" size={18} color={theme.primary} />
            <Text style={[styles.contactLinkText, { color: theme.primary }]}>
              github.com/GitCoder052023/Qurus
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer info */}
        <View style={styles.footerNote}>
          <Text style={[styles.footerText, { color: theme.textTertiary }]}>
            Qurus is an open-source project created by Hamdan Khubaib.
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
    marginBottom: 16,
  },
  highlightCardText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  introCallout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderLeftWidth: 4,
    marginBottom: 24,
  },
  introCalloutText: {
    fontSize: 13.5,
    lineHeight: 20,
    flex: 1,
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
  contactCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    marginTop: 24,
    gap: 10,
  },
  contactCardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  contactCardDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  contactLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
  },
  contactLinkText: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
  },
});

