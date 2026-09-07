import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { styles } from '../features/legal/styles/legalConsent.styles';
import { CorePrinciplesCard } from '../features/legal/components/CorePrinciplesCard';
import { LegalDocPreviewCards } from '../features/legal/components/LegalDocPreviewCards';
import { LegalConsentCheckboxCard } from '../features/legal/components/LegalConsentCheckboxCard';

export default function LegalConsentScreen() {
  const { theme } = useTheme();
  const { agreeToLegal, hasAgreedLegal, requestNotificationPermission } = useStudyState();
  const router = useRouter();

  const [agreeTerms, setAgreeTerms] = useState(hasAgreedLegal);
  const [agreePrivacy, setAgreePrivacy] = useState(hasAgreedLegal);

  const canProceed = agreeTerms && agreePrivacy;

  const handleAgreeAndContinue = async () => {
    if (!canProceed) return;
    await agreeToLegal();
    try {
      await requestNotificationPermission();
    } catch (err) {
      console.warn('Failed to prompt notification permission:', err);
    }
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
        <CorePrinciplesCard theme={theme} />

        {/* Document Cards */}
        <LegalDocPreviewCards theme={theme} />

        {/* Agreement Checkboxes */}
        <View style={styles.agreementSection}>
          <Text style={[styles.sectionHeading, { color: theme.textTertiary }]}>
            Your Agreement
          </Text>

          <LegalConsentCheckboxCard
            agreeTerms={agreeTerms}
            agreePrivacy={agreePrivacy}
            onToggleTerms={() => setAgreeTerms(!agreeTerms)}
            onTogglePrivacy={() => setAgreePrivacy(!agreePrivacy)}
            onToggleAll={toggleAll}
            theme={theme}
          />
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
