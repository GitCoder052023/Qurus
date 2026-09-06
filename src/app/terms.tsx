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

interface TermsSection {
  id: string;
  number: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  content: string[];
  bullets?: string[];
  callout?: string;
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    id: 'what-is-qurus',
    number: '1',
    title: 'What Qurus Is',
    icon: 'book-outline',
    content: [
      'Qurus is a reading, listening, and personal reflection application intended to make Quran study more accessible and focused in everyday life, created by Hamdan Khubaib.',
      'The application provides features including:',
    ],
    bullets: [
      'Verse-by-verse Quran reading & Arabic recitation',
      'Urdu translation and translation audio',
      'Verse search, bookmarks, and highlights',
      'Written reflection notes and audio voice notes',
      'Reading history and reading streaks',
      'Playback controls and personal reading preferences',
      'Anonymous product analytics and in-app feedback submission',
    ],
    callout: 'Qurus is a software tool for reading and reflection. It is not intended to replace qualified scholars, teachers, translators, academics, or other authoritative sources.',
  },
  {
    id: 'open-source',
    number: '2',
    title: 'Open-Source Software',
    icon: 'code-slash-outline',
    content: [
      'Qurus is open-source software distributed under the MIT License included with the project.',
      'The MIT License governs rights to use, copy, modify, distribute, sublicense, and otherwise handle the Qurus software source code as permitted by that license.',
      'These Terms of Use govern your use of the Qurus application and services and do not replace or supersede the separate MIT License governing the open-source code.',
    ],
  },
  {
    id: 'religious-disclaimer',
    number: '3',
    title: 'Religious and Interpretive Disclaimer',
    icon: 'help-buoy-outline',
    content: [
      'Qurus presents Quranic Arabic text, translations, and audio resources for reading and study.',
      'Translations and explanatory material are not themselves the Quranic Arabic original, and translation necessarily involves interpretation.',
      'Qurus does not claim that every translation, transcription, pronunciation, metadata field, categorization, or presentation is perfect or suitable as the sole authority for religious conclusions.',
      'You should consult qualified and trusted sources when making significant religious, academic, legal, ethical, or personal decisions.',
      'Qurus is not a fatwa service and does not provide personalized religious rulings.',
    ],
  },
  {
    id: 'accuracy-availability',
    number: '4',
    title: 'Accuracy and Availability of Content',
    icon: 'alert-circle-outline',
    content: [
      'We make reasonable efforts to use identified sources for Quranic text, translations, and recitation resources.',
      'However, Qurus may contain inaccuracies, omissions, formatting problems, broken links, unavailable audio resources, metadata errors, or other defects. Content may also change because Qurus depends in part on external infrastructure and source material.',
      'We do not guarantee that:',
    ],
    bullets: [
      'The application will always be available without interruption',
      'Every verse or audio resource will always load successfully',
      'All external resources and CDNs will remain available indefinitely',
      'Translations or metadata will be completely error-free',
      'Audio will always play without interruption or buffering',
      'The application will work on every device or operating-system version',
      'Any particular feature will remain available indefinitely',
    ],
  },
  {
    id: 'anonymous-analytics',
    number: '5',
    title: 'Anonymous Analytics',
    icon: 'stats-chart-outline',
    content: [
      'Qurus uses PostHog for lightweight product analytics without requiring an account or login.',
      'On first use, the application generates a random anonymous UUID v4 identifier locally to distinguish new from returning installations.',
      'Analytics may include limited product-usage information such as app version, platform, Surah number opened, audio reciter, playback settings, search filter type, feature-usage counts, selected non-sensitive preferences, onboarding completion, and legal consent events.',
      'Qurus intentionally does NOT send private reflection text, voice recordings, voice transcripts, search query text, Quran verse snippets, passwords, or device hardware identifiers as analytics payloads.',
      'PostHog session replay is disabled. Analytics is not required for core functionality—the app continues to operate fully when analytics is unavailable or disabled.',
    ],
  },
  {
    id: 'feedback-terms',
    number: '6',
    title: 'Contact Us and In-App Feedback',
    icon: 'chatbubble-ellipses-outline',
    content: [
      'Qurus provides an in-app feedback feature that allows users to submit feedback directly through PostHog’s event-capture infrastructure.',
      'A feedback submission may include the category selected by the user, the message written by the user, the Qurus app version, the platform, and an optional email address if voluntarily provided.',
      'Users may submit feedback without an email address.',
      'Please do not submit passwords, authentication secrets, private Quran reflections, confidential personal information, or other sensitive information through the feedback form.',
      'Qurus does not intentionally attach locally stored bookmarks, highlights, notes, voice recordings, or detailed study history to feedback submissions.',
    ],
  },
  {
    id: 'personal-content',
    number: '7',
    title: 'Your Personal Content',
    icon: 'create-outline',
    content: [
      'Qurus allows you to create private written and voice reflections.',
      'You retain ownership of the personal content that you create, subject to any rights belonging to third parties whose material you include.',
      'Because the current Qurus application stores personal study content locally on your device, you are responsible for maintaining appropriate backups and protecting access to your device.',
      'Qurus analytics does not intentionally transmit the contents of your written reflections or voice recordings.',
      'You must not use Qurus to create, store, or distribute content in a way that violates applicable law or the rights of others.',
    ],
  },
  {
    id: 'acceptable-use',
    number: '8',
    title: 'Acceptable Use',
    icon: 'checkmark-done-outline',
    content: [
      'You may use Qurus for lawful personal, educational, scholarly, reflective, and other legitimate purposes.',
      'You may not use Qurus to:',
    ],
    bullets: [
      'Interfere with or disrupt the application’s operation',
      'Attempt to gain unauthorized access to systems or resources associated with Qurus',
      'Introduce malicious code, viruses, or harmful software',
      'Abuse, overload, or attack external infrastructure or audio CDNs',
      'Impersonate Qurus or its creator',
      'Use the application for unlawful purposes',
      'Violate the rights, privacy, or intellectual-property rights of others',
    ],
  },
  {
    id: 'third-party',
    number: '9',
    title: 'Third-Party Content and Services',
    icon: 'globe-outline',
    content: [
      'Qurus uses or references resources provided by third parties, including PostHog, external audio providers (EveryAyah), image resources, and application-update infrastructure (Expo).',
      'Third-party resources are controlled by their respective providers and may be subject to separate licenses, terms, privacy policies, security practices, and retention policies.',
      'Qurus does not guarantee the continued availability, accuracy, legality, or performance of third-party resources.',
    ],
  },
  {
    id: 'sharing',
    number: '10',
    title: 'Sharing',
    icon: 'share-social-outline',
    content: [
      'Qurus may provide operating-system sharing functionality that allows you to send verse content to another application or service.',
      'Once you share content outside Qurus, the receiving application or service controls what it does with that content.',
      'You are responsible for deciding what you share and with whom.',
    ],
  },
  {
    id: 'updates-changes',
    number: '11',
    title: 'Updates and Changes',
    icon: 'refresh-outline',
    content: [
      'Qurus may receive application updates through distribution channels and update infrastructure.',
      'Updates may include bug fixes, security improvements, feature changes, content changes, design changes, or modifications to how the application works.',
      'We may add, modify, suspend, or remove features at any time, subject to applicable law.',
    ],
  },
  {
    id: 'data-recovery',
    number: '12',
    title: 'No Guarantee of Data Recovery',
    icon: 'cloud-offline-outline',
    content: [
      'Qurus’s current architecture is intentionally designed around on-device personal study data. We do not promise that notes, bookmarks, highlights, history, recordings, or preferences can be recovered after:',
    ],
    bullets: [
      'Uninstalling Qurus',
      'Clearing application data or cache',
      'Resetting a device',
      'Damaging or losing a device',
      'Changing devices without a supported migration method',
      'Any event that removes local application storage',
    ],
    callout: 'You are responsible for maintaining any backups you consider necessary for your personal reflections and study notes.',
  },
  {
    id: 'disclaimer-warranties',
    number: '13',
    title: 'Disclaimer of Warranties',
    icon: 'shield-outline',
    content: [
      'To the maximum extent permitted by applicable law, Qurus is provided on an “AS IS” and “AS AVAILABLE” basis.',
      'We disclaim warranties and conditions, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, availability, accuracy, reliability, and suitability for any particular use, except where such warranties cannot lawfully be excluded.',
    ],
  },
  {
    id: 'limitation-liability',
    number: '14',
    title: 'Limitation of Liability',
    icon: 'warning-outline',
    content: [
      'To the maximum extent permitted by applicable law, Qurus and its creator will not be liable for indirect, incidental, special, consequential, exemplary, or similar damages arising out of or relating to use of, or inability to use, the application.',
      'This includes, where legally permitted, loss of data, loss of access, device-related issues, interruptions, or reliance on application content.',
      'Nothing in these Terms excludes or limits liability where doing so would be unlawful.',
    ],
  },
  {
    id: 'suspension-termination',
    number: '15',
    title: 'Suspension or Termination',
    icon: 'stop-circle-outline',
    content: [
      'You may stop using Qurus at any time.',
      'We may discontinue or materially restrict the application or particular functionality where reasonably necessary, including for security, maintenance, legal, technical, or operational reasons.',
      'Termination of your use does not affect provisions that by their nature should survive termination (disclaimers, limitation of liability, intellectual property, etc.).',
    ],
  },
  {
    id: 'intellectual-property',
    number: '16',
    title: 'Intellectual Property',
    icon: 'ribbon-outline',
    content: [
      'Except for open-source components and third-party material subject to their own licenses or rights, Qurus’s original software, branding, visual design, documentation, and other original project materials are owned by their respective rights holders.',
      'The Qurus source code is separately licensed under the MIT License.',
      'Nothing in these Terms grants you ownership of trademarks, branding, or third-party content merely because those materials are available through the application.',
    ],
  },
  {
    id: 'copyright-third-party',
    number: '17',
    title: 'Copyright and Third-Party Rights',
    icon: 'file-tray-full-outline',
    content: [
      'Qurus includes material sourced from or associated with third parties.',
      'Those materials may be subject to copyright, licensing, attribution, performer rights, database rights, or other legal protections.',
      'You are responsible for complying with applicable rights and licenses when copying, redistributing, modifying, publicly performing, or otherwise using third-party material beyond ordinary use of the application.',
    ],
  },
  {
    id: 'no-professional-advice',
    number: '18',
    title: 'No Professional Advice',
    icon: 'school-outline',
    content: [
      'Qurus is not a substitute for professional advice.',
      'Nothing in the application should be treated as personalized legal, medical, financial, psychological, academic, or professional advice.',
      'Likewise, the application should not be treated as a substitute for consultation with an appropriately qualified religious scholar or teacher when authoritative religious guidance is required.',
    ],
  },
  {
    id: 'changes-terms',
    number: '19',
    title: 'Changes to These Terms',
    icon: 'swap-horizontal-outline',
    content: [
      'We may update these Terms when the application, project, or applicable requirements change.',
      'Material updates will be reflected by updating the “Last Updated” date above and providing additional notice where appropriate.',
      'Continued use of Qurus after revised Terms become effective constitutes acceptance of the revised Terms to the extent permitted by applicable law.',
    ],
  },
  {
    id: 'governing-law',
    number: '20',
    title: 'Governing Law & Jurisdiction',
    icon: 'business-outline',
    content: [
      'These Terms are intended to be governed by the laws of India, subject to any mandatory consumer-protection or other applicable legal requirements that cannot lawfully be excluded or overridden.',
      'Any dispute relating to Qurus will be subject to the jurisdiction and dispute-resolution requirements applicable under Indian law and any mandatory laws applicable to you.',
    ],
  },
  {
    id: 'contact-terms',
    number: '21',
    title: 'Contact',
    icon: 'mail-outline',
    content: [
      'For questions relating to Qurus, these Terms, or privacy-related concerns, contact:',
      'Creator: Hamdan Khubaib',
      'Email: hamdankhubaib959@gmail.com',
      'Project: Qurus',
      'Repository: https://github.com/GitCoder052023/Qurus',
    ],
  },
  {
    id: 'entire-agreement',
    number: '22',
    title: 'Entire Agreement',
    icon: 'document-attach-outline',
    content: [
      'These Terms, together with the MIT License and any other documents expressly incorporated by reference, describe the principal terms governing use of Qurus.',
      'If a conflict exists between these Terms and a separate open-source license governing a particular component, the applicable license controls the rights granted under that component’s license.',
      'If any provision of these Terms is found unenforceable, the remaining provisions will continue to apply to the extent permitted by law.',
    ],
  },
];

export default function TermsOfUseScreen() {
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
          <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>Terms of Use</Text>
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
            <Ionicons name="document-text" size={14} color={theme.primary} />
            <Text style={[styles.badgePillText, { color: theme.primary }]}>Agreement</Text>
          </View>
          <Text style={[styles.headline, { color: theme.textPrimary }]}>
            Qurus Terms of Use
          </Text>
          <Text style={[styles.dateMeta, { color: theme.textSecondary }]}>
            Effective Date: September 6, 2026 • Last Updated: September 6, 2026
          </Text>
          <Text style={[styles.summaryLead, { color: theme.textPrimary }]}>
            Welcome to Qurus. These Terms of Use govern your use of the Qurus application and related project materials operated by Hamdan Khubaib. By installing, accessing, or using Qurus, you agree to these Terms.
          </Text>
        </View>

        {/* Highlight Card */}
        <View
          style={[
            styles.highlightCard,
            { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
          ]}
        >
          <Ionicons name="leaf-outline" size={20} color={theme.primary} />
          <Text style={[styles.highlightCardText, { color: theme.textPrimary }]}>
            Open Source • MIT Licensed • Free to study & reflect • Privacy First
          </Text>
        </View>

        {/* Terms Sections */}
        <View style={styles.sectionsList}>
          {TERMS_SECTIONS.map((sec) => (
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
            Questions Concerning Terms?
          </Text>
          <Text style={[styles.contactCardDesc, { color: theme.textSecondary }]}>
            Please use the in-app Contact Us & Feedback screen or reach out through:
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

