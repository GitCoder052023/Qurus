import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/legalDocument.styles';

interface LegalContactCardProps {
  title: string;
  theme: ThemeColors;
}

export const LegalContactCard: React.FC<LegalContactCardProps> = React.memo(
  function LegalContactCard({ title, theme }) {
    return (
      <View
        style={[
          styles.contactCard,
          { backgroundColor: theme.card, borderColor: theme.borderSubtle },
        ]}
      >
        <Text style={[styles.contactCardTitle, { color: theme.textPrimary }]}>
          {title}
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
    );
  }
);
