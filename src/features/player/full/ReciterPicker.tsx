import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { RECITERS } from '../../../data/surahs';
import type { Reciter } from '../../../types';
import { styles } from './styles';

interface ReciterPickerProps {
  reciter: Reciter;
  onSelect: (reciter: Reciter) => void;
  onClose: () => void;
}

export function ReciterPicker({ reciter, onSelect, onClose }: ReciterPickerProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.reciterCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.reciterCardHeader}>
        <Text style={[styles.reciterCardTitle, { color: theme.textSecondary }]}>Select Arabic Reciter</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close-circle" size={20} color={theme.textTertiary} />
        </TouchableOpacity>
      </View>
      {RECITERS.map((r) => {
        const isSelected = r.id === reciter.id;
        return (
          <TouchableOpacity
            key={r.id}
            onPress={() => {
              onSelect(r);
              onClose();
            }}
            style={[
              styles.reciterOption,
              isSelected && { backgroundColor: theme.primaryMuted },
            ]}
          >
            <View style={styles.reciterOptionInfo}>
              <Text
                style={[
                  styles.reciterOptionName,
                  { color: isSelected ? theme.primary : theme.textPrimary },
                  isSelected && { fontWeight: '700' },
                ]}
              >
                {r.name}
              </Text>
              <Text style={[styles.reciterOptionArabic, { color: theme.textTertiary }]}>
                {r.arabicName}
              </Text>
            </View>
            {isSelected && <Ionicons name="checkmark-circle" size={18} color={theme.primary} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
