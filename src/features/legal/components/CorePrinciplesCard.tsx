import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { CORE_PRINCIPLES } from '../data/corePrinciples';
import { styles } from '../styles/legalConsent.styles';

interface CorePrinciplesCardProps {
  theme: ThemeColors;
}

export const CorePrinciplesCard: React.FC<CorePrinciplesCardProps> = React.memo(
  function CorePrinciplesCard({ theme }) {
    return (
      <View
        style={[
          styles.guaranteeCard,
          { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
        ]}
      >
        <Text style={[styles.guaranteeTitle, { color: theme.primary }]}>
          Our Core Principles
        </Text>

        {CORE_PRINCIPLES.map((item, idx) => (
          <View key={idx} style={styles.guaranteeItem}>
            <Ionicons name={item.icon} size={18} color={theme.primary} />
            <View style={styles.guaranteeCopy}>
              <Text style={[styles.guaranteeHeading, { color: theme.textPrimary }]}>
                {item.heading}
              </Text>
              <Text style={[styles.guaranteeDesc, { color: theme.textSecondary }]}>
                {item.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
);
