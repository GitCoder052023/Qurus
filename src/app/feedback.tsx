import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { submitFeedback, APP_VERSION } from '../lib/analytics';
import { styles } from '../features/feedback/styles/feedback.styles';
import { FeedbackTopBar } from '../features/feedback/components/FeedbackTopBar';
import { FeedbackSuccessView } from '../features/feedback/components/FeedbackSuccessView';
import { FeedbackCategoryGrid } from '../features/feedback/components/FeedbackCategoryGrid';

export default function FeedbackScreen() {
  const { theme } = useTheme();

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
      <FeedbackTopBar theme={theme} />

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
            <FeedbackSuccessView email={email} theme={theme} />
          ) : (
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
                <FeedbackCategoryGrid
                  category={category}
                  onSelectCategory={setCategory}
                  theme={theme}
                />
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
