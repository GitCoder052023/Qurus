import React, { useState } from 'react';
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
import { useStudyState } from '../context/StudyContext';

export default function LegalConsentScreen() {
  const { theme } = useTheme();
  const { agreeToLegal, hasAgreedLegal } = useStudyState();
  const router = useRouter();

  const [agreeTerms, setAgreeTerms] = useState(hasAgreedLegal);
  const [agreePrivacy, setAgreePrivacy] = useState(hasAgreedLegal);

  const canProceed = agreeTerms && agreePrivacy;

  const handleAgreeAndContinue = async () => {
    if (!canProceed) return;
    await agreeToLegal();
    router.replace('/(tabs)');
  };

  const toggleAll = () => {
    const nextVal = !(agreeTerms && agreePrivacy);
    setAgreeTerms(nextVal);
    setAgreePrivacy(nextVal);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Bar */}
      <View style={[styles.topBar, { borderBottomColor: theme.borderSubtle }]}>
        {hasAgreedLegal ? (
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.navBtn, { backgroundColor: theme.chipBg }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={20} color={theme.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.navBtnPlaceholder} />
        )}

        <View style={styles.topBarTitleGroup}>
          <Text style={[styles.topBarBadge, { color: theme.primary }]}>Welcome to Qurus</Text>
          <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>Legal & Privacy</Text>
        </View>

        <View style={styles.navBtnPlaceholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="shield-checkmark" size={32} color={theme.primary} />
          </View>
          <Text style={[styles.headline, { color: theme.textPrimary }]}>
            Terms & Privacy Notice
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Before you begin your exploration in Qurus, please review and agree to our Terms of Use and Privacy Policy.
          </Text>
        </View>

        {/* Key Guarantees Card */}
        <View
          style={[
            styles.guaranteeCard,
            { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
          ]}
        >
          <Text style={[styles.guaranteeTitle, { color: theme.primary }]}>
            Our Core Principles
          </Text>

          <View style={styles.guaranteeItem}>
            <Ionicons name="lock-closed-outline" size={18} color={theme.primary} />
            <View style={styles.guaranteeCopy}>
              <Text style={[styles.guaranteeHeading, { color: theme.textPrimary }]}>
                100% On-Device Private Study
              </Text>
              <Text style={[styles.guaranteeDesc, { color: theme.textSecondary }]}>
                Your written reflections, audio voice notes, and bookmarks are saved only on this device.
              </Text>
            </View>
          </View>

          <View style={styles.guaranteeItem}>
            <Ionicons name="person-remove-outline" size={18} color={theme.primary} />
            <View style={styles.guaranteeCopy}>
              <Text style={[styles.guaranteeHeading, { color: theme.textPrimary }]}>
                No Account or Ads
              </Text>
              <Text style={[styles.guaranteeDesc, { color: theme.textSecondary }]}>
                No sign-in, no passwords, no email collection, and no behavioral ad tracking.
              </Text>
            </View>
          </View>

          <View style={styles.guaranteeItem}>
            <Ionicons name="cloud-download-outline" size={18} color={theme.primary} />
            <View style={styles.guaranteeCopy}>
              <Text style={[styles.guaranteeHeading, { color: theme.textPrimary }]}>
                Audio Streaming CDN
              </Text>
              <Text style={[styles.guaranteeDesc, { color: theme.textSecondary }]}>
                Quran recitation and Urdu audio streams from EveryAyah public infrastructure.
              </Text>
            </View>
          </View>

          <View style={styles.guaranteeItem}>
            <Ionicons name="book-outline" size={18} color={theme.primary} />
            <View style={styles.guaranteeCopy}>
              <Text style={[styles.guaranteeHeading, { color: theme.textPrimary }]}>
                Open-Source Reflection Space
              </Text>
              <Text style={[styles.guaranteeDesc, { color: theme.textSecondary }]}>
                MIT licensed open-source tool for personal inquiry; not a substitute for scholarly fatwas.
              </Text>
            </View>
          </View>
        </View>

        {/* Document Cards */}
        <View style={styles.docsSection}>
          <Text style={[styles.sectionHeading, { color: theme.textTertiary }]}>
            Review Legal Documents
          </Text>

          {/* Terms of Use Link Card */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/terms' as any)}
            style={[
              styles.docCard,
              { backgroundColor: theme.card, borderColor: theme.borderSubtle },
            ]}
          >
            <View style={styles.docCardTop}>
              <View style={[styles.docIconBox, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="document-text-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.docTitleGroup}>
                <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>
                  Terms of Use
                </Text>
                <Text style={[styles.docCardSubtitle, { color: theme.textSecondary }]}>
                  Acceptable use, open-source licensing, and disclaimers
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
            </View>
            <View style={[styles.docCardFooter, { borderTopColor: theme.borderSubtle }]}>
              <Text style={[styles.docLinkText, { color: theme.primary }]}>
                Read full Terms of Use
              </Text>
            </View>
          </TouchableOpacity>

          {/* Privacy Policy Link Card */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/privacy' as any)}
            style={[
              styles.docCard,
              { backgroundColor: theme.card, borderColor: theme.borderSubtle },
            ]}
          >
            <View style={styles.docCardTop}>
              <View style={[styles.docIconBox, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.docTitleGroup}>
                <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>
                  Privacy Policy
                </Text>
                <Text style={[styles.docCardSubtitle, { color: theme.textSecondary }]}>
                  On-device data storage, microphone permissions, and rights
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
            </View>
            <View style={[styles.docCardFooter, { borderTopColor: theme.borderSubtle }]}>
              <Text style={[styles.docLinkText, { color: theme.primary }]}>
                Read full Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Agreement Checkboxes */}
        <View style={styles.agreementSection}>
          <Text style={[styles.sectionHeading, { color: theme.textTertiary }]}>
            Your Agreement
          </Text>

          <View style={[styles.checkboxCard, { backgroundColor: theme.card, borderColor: theme.borderSubtle }]}>
            {/* Terms Checkbox */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setAgreeTerms(!agreeTerms)}
              style={styles.checkboxRow}
            >
              <View
                style={[
                  styles.checkboxBox,
                  {
                    borderColor: agreeTerms ? theme.primary : theme.border,
                    backgroundColor: agreeTerms ? theme.primary : 'transparent',
                  },
                ]}
              >
                {agreeTerms && <Ionicons name="checkmark" size={16} color={theme.onPrimary} />}
              </View>
              <Text style={[styles.checkboxLabel, { color: theme.textPrimary }]}>
                I have read and agree to the{' '}
                <Text
                  onPress={() => router.push('/terms' as any)}
                  style={{ color: theme.primary, fontWeight: '700' }}
                >
                  Terms of Use
                </Text>
              </Text>
            </TouchableOpacity>

            <View style={[styles.checkboxDivider, { backgroundColor: theme.borderSubtle }]} />

            {/* Privacy Checkbox */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setAgreePrivacy(!agreePrivacy)}
              style={styles.checkboxRow}
            >
              <View
                style={[
                  styles.checkboxBox,
                  {
                    borderColor: agreePrivacy ? theme.primary : theme.border,
                    backgroundColor: agreePrivacy ? theme.primary : 'transparent',
                  },
                ]}
              >
                {agreePrivacy && <Ionicons name="checkmark" size={16} color={theme.onPrimary} />}
              </View>
              <Text style={[styles.checkboxLabel, { color: theme.textPrimary }]}>
                I have read and agree to the{' '}
                <Text
                  onPress={() => router.push('/privacy' as any)}
                  style={{ color: theme.primary, fontWeight: '700' }}
                >
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>

            <View style={[styles.checkboxDivider, { backgroundColor: theme.borderSubtle }]} />

            {/* Select All Quick Button */}
            <TouchableOpacity
              onPress={toggleAll}
              style={styles.selectAllRow}
            >
              <Text style={[styles.selectAllText, { color: theme.primary }]}>
                {agreeTerms && agreePrivacy ? 'Deselect all' : 'Select all agreements'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Dock */}
      <SafeAreaView edges={['bottom']} style={[styles.bottomDock, { backgroundColor: theme.background, borderTopColor: theme.borderSubtle }]}>
        <TouchableOpacity
          onPress={handleAgreeAndContinue}
          disabled={!canProceed}
          activeOpacity={0.88}
          style={[
            styles.proceedBtn,
            {
              backgroundColor: canProceed ? theme.primary : theme.surfaceHighlight,
              opacity: canProceed ? 1 : 0.6,
            },
          ]}
          accessibilityLabel="Agree and Continue"
        >
          <Text
            style={[
              styles.proceedBtnText,
              { color: canProceed ? theme.onPrimary : theme.textTertiary },
            ]}
          >
            {hasAgreedLegal ? 'Save & Continue' : 'Agree & Continue'}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={canProceed ? theme.onPrimary : theme.textTertiary}
          />
        </TouchableOpacity>
      </SafeAreaView>
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
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    textAlign: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headline: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.6,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14.5,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  guaranteeCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
    gap: 14,
  },
  guaranteeTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  guaranteeCopy: {
    flex: 1,
  },
  guaranteeHeading: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  guaranteeDesc: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  docsSection: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 12.5,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  docCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    marginBottom: 12,
  },
  docCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  docIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docTitleGroup: {
    flex: 1,
  },
  docCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  docCardSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  docCardFooter: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
  },
  docLinkText: {
    fontSize: 13,
    fontWeight: '600',
  },
  agreementSection: {
    marginBottom: 20,
  },
  checkboxCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 13.5,
    lineHeight: 20,
    flex: 1,
  },
  checkboxDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 6,
  },
  selectAllRow: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  selectAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  bottomDock: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  proceedBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  proceedBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
