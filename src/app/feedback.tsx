import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { submitFeedback, APP_VERSION } from '../lib/analytics';

interface CategoryOption {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'bug_report',
    label: 'Bug Report',
    icon: 'bug-outline',
    description: 'Something isn’t working correctly',
  },
  {
    id: 'feature_request',
    label: 'Feature Request',
    icon: 'bulb-outline',
    description: 'Idea or improvement for Qurus',
  },
  {
    id: 'general_feedback',
    label: 'General Feedback',
    icon: 'chatbubble-ellipses-outline',
    description: 'Share your thoughts or experience',
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'help-circle-outline',
    description: 'General inquiry or question',
  },
];

export default function FeedbackScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [category, setCategory] = useState<string>('general_feedback');
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = message.trim().length >= 5 && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) {
      if (message.trim().length < 5) {
        setErrorMessage('Please enter at least 5 characters for your message.');
      }
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await submitFeedback({
        category,
        message,
        email: email.trim() || undefined,
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(res.error || 'Failed to send feedback. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage('A network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Bar */}
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
          <Text style={[styles.topBarBadge, { color: theme.primary }]}>Support</Text>
          <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>Contact & Feedback</Text>
        </View>

        <View style={styles.navBtnPlaceholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {isSubmitted ? (
            /* Success State */
            <View style={styles.successWrapper}>
              <View style={[styles.successIconCircle, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="checkmark-circle" size={56} color={theme.primary} />
              </View>

              <Text style={[styles.successTitle, { color: theme.textPrimary }]}>
                Thank You!
              </Text>
              <Text style={[styles.successDesc, { color: theme.textSecondary }]}>
                Your message has been received. Your feedback helps us continuously improve Qurus.
              </Text>

              {email.trim() ? (
                <View
                  style={[
                    styles.infoNoteCard,
                    { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
                  ]}
                >
                  <Ionicons name="mail-outline" size={18} color={theme.primary} />
                  <Text style={[styles.infoNoteText, { color: theme.textSecondary }]}>
                    We will reply to <Text style={{ fontWeight: '600', color: theme.textPrimary }}>{email.trim()}</Text> if a response is needed.
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.back()}
                style={[styles.returnBtn, { backgroundColor: theme.primary }]}
              >
                <Text style={[styles.returnBtnText, { color: theme.onPrimary }]}>
                  Return to Settings
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Form View */
            <>
              {/* Header */}
              <View style={styles.header}>
                <Text style={[styles.headline, { color: theme.textPrimary }]}>
                  We’d love to hear from you
                </Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                  Share a bug report, suggest a new feature, or ask a question. No account required.
                </Text>
              </View>

              {/* Privacy Notice Box */}
              <View
                style={[
                  styles.privacyCard,
                  { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
                ]}
              >
                <Ionicons name="shield-checkmark-outline" size={18} color={theme.primary} />
                <View style={styles.privacyCardCopy}>
                  <Text style={[styles.privacyCardHeading, { color: theme.textPrimary }]}>
                    Privacy Protected
                  </Text>
                  <Text style={[styles.privacyCardDesc, { color: theme.textSecondary }]}>
                    Your private reflections, voice recordings, and bookmarks are saved only on this device and are never included in feedback submissions.
                  </Text>
                </View>
              </View>

              {/* Category Picker */}
              <View style={styles.section}>
                <Text style={[styles.sectionHeading, { color: theme.textTertiary }]}>
                  Category
                </Text>
                <View style={styles.categoryGrid}>
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <TouchableOpacity
                        key={cat.id}
                        activeOpacity={0.8}
                        onPress={() => setCategory(cat.id)}
                        style={[
                          styles.categoryCard,
                          {
                            backgroundColor: isSelected ? theme.primaryMuted : theme.card,
                            borderColor: isSelected ? theme.primary : theme.borderSubtle,
                          },
                        ]}
                      >
                        <View style={styles.categoryRow}>
                          <Ionicons
                            name={cat.icon}
                            size={18}
                            color={isSelected ? theme.primary : theme.textSecondary}
                          />
                          <Text
                            style={[
                              styles.categoryLabel,
                              { color: isSelected ? theme.primary : theme.textPrimary },
                              isSelected && { fontWeight: '700' },
                            ]}
                          >
                            {cat.label}
                          </Text>
                        </View>
                        <Text style={[styles.categoryDesc, { color: theme.textTertiary }]}>
                          {cat.description}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Message Field */}
              <View style={styles.section}>
                <View style={styles.labelRow}>
                  <Text style={[styles.sectionHeading, { color: theme.textTertiary }]}>
                    Your Message
                  </Text>
                  <Text style={[styles.charCount, { color: theme.textTertiary }]}>
                    {message.length} chars
                  </Text>
                </View>

                <TextInput
                  style={[
                    styles.textArea,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    },
                  ]}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  placeholder="Describe your suggestion, bug, or question in detail..."
                  placeholderTextColor={theme.textTertiary}
                  value={message}
                  onChangeText={(val) => {
                    setMessage(val);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  editable={!isSubmitting}
                />
              </View>

              {/* Optional Email Field */}
              <View style={styles.section}>
                <View style={styles.labelRow}>
                  <Text style={[styles.sectionHeading, { color: theme.textTertiary }]}>
                    Email Address
                  </Text>
                  <View style={[styles.optionalBadge, { backgroundColor: theme.chipBg }]}>
                    <Text style={[styles.optionalBadgeText, { color: theme.textSecondary }]}>
                      Optional
                    </Text>
                  </View>
                </View>

                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    },
                  ]}
                  placeholder="name@example.com"
                  placeholderTextColor={theme.textTertiary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  editable={!isSubmitting}
                />
                <Text style={[styles.fieldHelper, { color: theme.textTertiary }]}>
                  Only provide an email if you’d like us to reply to your inquiry.
                </Text>
              </View>

              {/* Error Message */}
              {errorMessage ? (
                <View style={[styles.errorCard, { backgroundColor: theme.secondaryMuted }]}>
                  <Ionicons name="alert-circle-outline" size={18} color={theme.destructive} />
                  <Text style={[styles.errorText, { color: theme.destructive }]}>
                    {errorMessage}
                  </Text>
                </View>
              ) : null}

              {/* Technical Context Footer Note */}
              <View style={styles.metaContext}>
                <Text style={[styles.metaText, { color: theme.textTertiary }]}>
                  App Version: {APP_VERSION} • Platform: {Platform.OS}
                </Text>
              </View>
            </>
          )}
        </ScrollView>

        {/* Bottom Sticky Submit Button */}
        {!isSubmitted && (
          <SafeAreaView
            edges={['bottom']}
            style={[
              styles.bottomDock,
              { backgroundColor: theme.background, borderTopColor: theme.borderSubtle },
            ]}
          >
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!canSubmit}
              activeOpacity={0.88}
              style={[
                styles.submitBtn,
                {
                  backgroundColor: canSubmit ? theme.primary : theme.surfaceHighlight,
                  opacity: canSubmit ? 1 : 0.6,
                },
              ]}
              accessibilityLabel="Send Feedback"
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.onPrimary} size="small" />
              ) : (
                <>
                  <Text
                    style={[
                      styles.submitBtnText,
                      { color: canSubmit ? theme.onPrimary : theme.textTertiary },
                    ]}
                  >
                    Send Feedback
                  </Text>
                  <Ionicons
                    name="send"
                    size={16}
                    color={canSubmit ? theme.onPrimary : theme.textTertiary}
                  />
                </>
              )}
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 24,
  },
  privacyCardCopy: {
    flex: 1,
  },
  privacyCardHeading: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  privacyCardDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  section: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 12.5,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 2,
  },
  charCount: {
    fontSize: 11.5,
  },
  categoryGrid: {
    gap: 10,
  },
  categoryCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryDesc: {
    fontSize: 12,
    paddingLeft: 26,
  },
  textArea: {
    minHeight: 120,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    fontSize: 14.5,
    lineHeight: 21,
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    fontSize: 14.5,
  },
  optionalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  optionalBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  fieldHelper: {
    fontSize: 11.5,
    marginTop: 6,
    marginLeft: 4,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  metaContext: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  metaText: {
    fontSize: 11.5,
  },
  bottomDock: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
  },
  submitBtn: {
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    fontSize: 15.5,
    fontWeight: '700',
  },
  successWrapper: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  successIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  successDesc: {
    fontSize: 14.5,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  infoNoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 28,
  },
  infoNoteText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  returnBtn: {
    paddingHorizontal: 28,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
