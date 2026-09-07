import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RECITERS } from '../../../data/surahs';
import { Reciter } from '../../../types';
import { styles } from '../styles/fullPlayer.styles';

interface PlayerReciterSelectorProps {
  visible: boolean;
  onClose: () => void;
  selectedReciter: Reciter;
  onSelectReciter: (r: Reciter) => void;
  theme: any;
}

export function PlayerReciterSelector({
  visible,
  onClose,
  selectedReciter,
  onSelectReciter,
  theme,
}: PlayerReciterSelectorProps) {
  if (!visible) return null;

  return (
    <View style={[styles.reciterCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.reciterCardHeader}>
        <Text style={[styles.reciterCardTitle, { color: theme.textSecondary }]}>Select Arabic Reciter</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close-circle" size={20} color={theme.textTertiary} />
        </TouchableOpacity>
      </View>
      {RECITERS.map((r) => {
        const isSelected = r.id === selectedReciter.id;
        return (
          <TouchableOpacity
            key={r.id}
            onPress={() => {
              onSelectReciter(r);
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
