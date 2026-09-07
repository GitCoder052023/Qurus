import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/reader.styles';

interface ReaderErrorStateProps {
  onBack: () => void;
  theme: ThemeColors;
}

export const ReaderErrorState: React.FC<ReaderErrorStateProps> = React.memo(
  function ReaderErrorState({ onBack, theme }) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.textPrimary }]}>Surah not found</Text>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={{ color: theme.primary }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
);
