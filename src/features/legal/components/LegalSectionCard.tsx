import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { LegalSection } from '../types';
import { styles } from '../styles/legalDocument.styles';

interface LegalSectionCardProps {
  section: LegalSection;
  theme: ThemeColors;
}

export const LegalSectionCard: React.FC<LegalSectionCardProps> = React.memo(
  function LegalSectionCard({ section, theme }) {
    return (
      <View
        style={[
          styles.sectionCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        <View style={styles.sectionHeaderRow}>
          <View style={[styles.sectionIconBox, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name={section.icon} size={18} color={theme.primary} />
          </View>
          <View style={styles.sectionTitleCol}>
            <Text style={[styles.sectionNumber, { color: theme.primary }]}>
              Section {section.number}
            </Text>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              {section.title}
            </Text>
          </View>
        </View>

        <View style={styles.sectionBody}>
          {section.content.map((paragraph, pIdx) => (
            <Text key={pIdx} style={[styles.paragraphText, { color: theme.textSecondary }]}>
              {paragraph}
            </Text>
          ))}

          {section.bullets && (
            <View style={styles.bulletsList}>
              {section.bullets.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletRow}>
                  <View style={[styles.bulletDot, { backgroundColor: theme.primary }]} />
                  <Text style={[styles.bulletText, { color: theme.textPrimary }]}>
                    {bullet}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {section.callout && (
            <View
              style={[
                styles.calloutBox,
                {
                  backgroundColor: theme.secondaryMuted,
                  borderColor: theme.secondary,
                },
              ]}
            >
              <Ionicons name="information-circle-outline" size={16} color={theme.secondary} />
              <Text style={[styles.calloutText, { color: theme.textPrimary }]}>
                {section.callout}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
);
