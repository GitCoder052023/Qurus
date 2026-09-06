import React, { useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  const distance = 80 + (i % 3) * 20;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 6 + (i % 3) * 3,
    color: i % 2 === 0 ? '#1B4D3E' : '#D4AF37', // Emerald and Gold
  };
});

export function CelebrationModal() {
  const { theme } = useTheme();
  const router = useRouter();
  const { celebrationPayload, dismissCelebration } = useStudyState();

  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);
  const particleProgress = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (celebrationPayload) {
      // Trigger rich haptic celebration
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => {
          Haptics.impactAsync(
            celebrationPayload.type === 'streak_saved'
              ? Haptics.ImpactFeedbackStyle.Heavy
              : Haptics.ImpactFeedbackStyle.Medium
          );
        }, 180);
      } catch (_) {}

      scale.value = withSpring(1, { damping: 14, stiffness: 120 });
      opacity.value = withTiming(1, { duration: 300 });
      particleProgress.value = withTiming(1, {
        duration: 900,
        easing: Easing.out(Easing.cubic),
      });
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.08, { duration: 900 }),
          withTiming(1, { duration: 900 })
        ),
        -1,
        true
      );
    } else {
      scale.value = 0.7;
      opacity.value = 0;
      particleProgress.value = 0;
    }
  }, [celebrationPayload]);

  if (!celebrationPayload) return null;

  const getIconName = () => {
    switch (celebrationPayload.type) {
      case 'surah_completed':
        return 'book';
      case 'daily_goal':
        return 'star';
      case 'streak_milestone':
      case 'streak_saved':
        return 'flame';
      default:
        return 'sparkles';
    }
  };

  const getBadgeColor = () => {
    switch (celebrationPayload.type) {
      case 'surah_completed':
        return theme.primary;
      case 'daily_goal':
        return '#D4AF37'; // Gold
      case 'streak_milestone':
        return '#FF8C00'; // Amber flame
      case 'streak_saved':
        return '#FF4500'; // Fiery red-orange
      default:
        return theme.primary;
    }
  };

  const handleReviewNotes = () => {
    dismissCelebration();
    if (celebrationPayload.surahNumber) {
      router.push('/(tabs)/notes');
    }
  };

  return (
    <Modal
      visible={Boolean(celebrationPayload)}
      transparent
      animationType="fade"
      onRequestClose={dismissCelebration}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: theme.card,
              borderColor: theme.borderSubtle,
            },
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          {/* Confetti / Particle Aura */}
          <View style={styles.particleContainer}>
            {PARTICLES.map((p) => {
              const particleStyle = useAnimatedStyle(() => {
                const curX = p.x * particleProgress.value;
                const curY = p.y * particleProgress.value;
                const curOpacity = (1 - particleProgress.value * 0.7) * opacity.value;
                return {
                  transform: [{ translateX: curX }, { translateY: curY }],
                  opacity: curOpacity,
                };
              });

              return (
                <Animated.View
                  key={p.id}
                  style={[
                    styles.particle,
                    {
                      width: p.size,
                      height: p.size,
                      borderRadius: p.size / 2,
                      backgroundColor: p.color,
                    },
                    particleStyle,
                  ]}
                />
              );
            })}

            {/* Central Glowing Emblem */}
            <Animated.View
              style={[
                styles.emblemCircle,
                {
                  backgroundColor: theme.surfaceHighlight,
                  borderColor: getBadgeColor(),
                },
              ]}
            >
              <Ionicons name={getIconName() as any} size={42} color={getBadgeColor()} />
            </Animated.View>
          </View>

          {/* Badge Label */}
          {celebrationPayload.badgeLabel && (
            <View style={[styles.badgePill, { backgroundColor: theme.chipBg }]}>
              <Text style={[styles.badgeText, { color: getBadgeColor() }]}>
                {celebrationPayload.badgeLabel.toUpperCase()}
              </Text>
            </View>
          )}

          {/* Title & Subtitle */}
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {celebrationPayload.title}
          </Text>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {celebrationPayload.subtitle}
          </Text>

          {/* Tadabbur Wisdom Quote */}
          {celebrationPayload.quote && (
            <View style={[styles.quoteCard, { backgroundColor: theme.surface }]}>
              <Text style={[styles.quoteText, { color: theme.textPrimary }]}>
                {celebrationPayload.quote}
              </Text>
            </View>
          )}

          {/* Details / Encouragement */}
          {celebrationPayload.details && (
            <Text style={[styles.detailsText, { color: theme.textTertiary }]}>
              {celebrationPayload.details}
            </Text>
          )}

          {/* Actions */}
          <View style={styles.actionCol}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={dismissCelebration}
              style={[
                styles.primaryBtn,
                { backgroundColor: celebrationPayload.type === 'streak_saved' ? '#FF4500' : theme.primary },
              ]}
            >
              <Text style={[styles.primaryBtnText, { color: theme.onPrimary }]}>
                {celebrationPayload.type === 'streak_saved' ? 'Al-hamdu lillah! Keep Growing 🔥' : 'Continue Journey'}
              </Text>
            </TouchableOpacity>

            {celebrationPayload.type === 'surah_completed' && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleReviewNotes}
                style={styles.secondaryBtn}
              >
                <Text style={[styles.secondaryBtnText, { color: theme.primary }]}>
                  Review Your Reflections
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  container: {
    width: Math.min(SCREEN_WIDTH - 40, 360),
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  particleContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  particle: {
    position: 'absolute',
  },
  emblemCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgePill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  quoteCard: {
    width: '100%',
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
  },
  quoteText: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  detailsText: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: 20,
  },
  actionCol: {
    width: '100%',
    gap: 10,
    marginTop: 6,
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
