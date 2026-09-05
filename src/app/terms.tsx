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
      'Qurus is a verse-by-verse Quran reading, audio listening, and personal reflection mobile application created by Hamdan Khubaib.',
      'The application provides verse exploration, Arabic recitations, Urdu translations and audio, bookmarking, verse highlighting, personal study notes, and reading streak tracking.',
      'Qurus is a software tool for personal reading and reflection. It is not intended to replace qualified scholars, teachers, translators, or authoritative religious institutions.',
    ],
  },
  {
    id: 'open-source',
    number: '2',
    title: 'Open-Source Software & License',
    icon: 'code-slash-outline',
    content: [
      'Qurus is open-source software distributed under the permissive MIT License.',
      'The MIT License governs your rights to view, copy, modify, distribute, and sublicense the software source code.',
      'These Terms of Use govern your use of the application and its packaged services.',
    ],
  },
  {
    id: 'religious-disclaimer',
    number: '3',
    title: 'Religious & Interpretive Disclaimer',
    icon: 'help-buoy-outline',
    content: [
      'Qurus presents Quranic Arabic text alongside human translations (Fateh Muhammad Jalandhry) and audio recitations.',
      'Translations and explanatory texts involve human interpretation and are not identical to the divine Arabic original.',
      'Qurus is not a fatwa service and does not provide personalized legal or religious rulings. You should consult qualified scholars for important religious and legal decisions.',
    ],
  },
  {
    id: 'accuracy-availability',
    number: '4',
    title: 'Accuracy & Content Availability',
    icon: 'alert-circle-outline',
    content: [
      'We make every reasonable effort to use verified sources (Verified Uthmani Hafs text, EveryAyah audio CDN).',
      'However, Qurus is provided on an "as is" basis and may occasionally contain typographical defects, network interruptions, or third-party audio service downtime.',
    ],
  },
  {
    id: 'personal-content',
    number: '5',
    title: 'Your Personal Content & Reflections',
    icon: 'create-outline',
    content: [
      'You retain full ownership of all written reflection notes and voice recordings you create within Qurus.',
      'Because study data is stored on-device, you are responsible for maintaining backups and safeguarding your device.',
    ],
  },
  {
    id: 'acceptable-use',
    number: '6',
    title: 'Acceptable Use',
    icon: 'checkmark-done-outline',
    content: [
      'You may use Qurus for personal, educational, reflective, and scholarly purposes.',
      'You agree not to attempt to disrupt or abuse the application, interfere with audio content delivery networks, or use the tool for unlawful purposes.',
    ],
  },
  {
    id: 'third-party',
    number: '7',
    title: 'Third-Party Content & Services',
    icon: 'globe-outline',
    content: [
      'Qurus utilizes third-party infrastructure for recitation audio (EveryAyah CDN) and software updates (Expo).',
      'Third-party services operate under their own independent terms and availability.',
    ],
  },
  {
    id: 'data-recovery',
    number: '8',
    title: 'Local Storage & Data Recovery',
    icon: 'cloud-offline-outline',
    content: [
      'Because Qurus is architected for privacy with on-device storage, uninstalling the app or resetting your device removes local application data.',
      'Qurus does not have cloud account recovery for locally stored notes or history.',
    ],
    callout: 'Ensure you maintain personal device backups if you keep important written or voice study notes.',
  },
  {
    id: 'disclaimer-liability',
    number: '9',
    title: 'Disclaimer of Warranties & Limitation of Liability',
    icon: 'shield-outline',
    content: [
      'To the maximum extent permitted by applicable law, Qurus is provided "AS IS" without warranties of any kind, express or implied.',
      'Hamdan Khubaib and Qurus contributors shall not be liable for any indirect, incidental, or consequential damages resulting from the use of the app.',
    ],
  },
  {
    id: 'intellectual-property',
    number: '10',
    title: 'Intellectual Property',
    icon: 'ribbon-outline',
    content: [
      'The original software, user interface design, logos, and branding are the property of their respective rights holders, with source code licensed under the MIT License.',
    ],
  },
  {
    id: 'governing-law',
    number: '11',
    title: 'Governing Law & Dispute Resolution',
    icon: 'business-outline',
    content: [
      'These Terms are governed by and construed in accordance with the laws of India, subject to mandatory local consumer protection rules.',
    ],
  },
  {
    id: 'contact-terms',
    number: '12',
    title: 'Contact Information',
    icon: 'mail-outline',
    content: [
      'Creator: Hamdan Khubaib',
      'Project: Qurus',
      'Repository: https://github.com/GitCoder052023/Qurus',
      'For questions concerning these Terms of Use, please reach out via GitHub.',
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
            Effective & Last Updated: September 6, 2026
          </Text>
          <Text style={[styles.summaryLead, { color: theme.textPrimary }]}>
            By using Qurus, you agree to these Terms of Use. Please read them to understand the nature of the application, permissible use, and open-source licensing.
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
            Open Source • MIT Licensed • Free to study & reflect • Designed for honest inquiry
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
