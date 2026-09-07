import React from 'react';
import { View, Text } from 'react-native';
import { TranslationLanguageConfig } from '../../../constants/languages';
import { styles } from '../styles/ayahItem.styles';

interface AyahTextDisplayProps {
  arabicText: string;
  translationText: string;
  arabicFontSize: number;
  urduFontSize: number;
  showTranslation: boolean;
  isRecitingArabic: boolean;
  isRecitingTranslation: boolean;
  langConfig: TranslationLanguageConfig;
  theme: any;
}

export function AyahTextDisplay({
  arabicText,
  translationText,
  arabicFontSize,
  urduFontSize,
  showTranslation,
  isRecitingArabic,
  isRecitingTranslation,
  langConfig,
  theme,
}: AyahTextDisplayProps) {
  return (
    <>
      {/* Quranic Arabic Text */}
      <View
        style={[
          styles.arabicTextWrapper,
          isRecitingArabic && {
            backgroundColor: theme.primaryMuted,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 6,
          },
        ]}
      >
        <Text
          style={[
            styles.arabicText,
            {
              color: theme.arabicText,
              fontSize: arabicFontSize,
              lineHeight: Math.round(arabicFontSize * 1.8),
            },
          ]}
          selectable
        >
          {arabicText}
        </Text>
      </View>

      {/* Translation Text */}
      {showTranslation && (
        <View
          style={[
            styles.translationContainer,
            { borderTopColor: theme.borderSubtle },
            isRecitingTranslation && {
              backgroundColor: theme.primaryMuted,
              borderRadius: 12,
              padding: 10,
              marginTop: 4,
            },
          ]}
        >
          <Text
            style={[
              styles.urduText,
              {
                color: theme.urduText,
                fontSize: urduFontSize,
                lineHeight: Math.round(urduFontSize * 1.7),
                textAlign: langConfig.isRTL ? 'right' : 'left',
                writingDirection: langConfig.isRTL ? 'rtl' : 'ltr',
              },
              isRecitingTranslation && { fontWeight: '600' },
            ]}
            selectable
          >
            {translationText}
          </Text>
        </View>
      )}
    </>
  );
}
