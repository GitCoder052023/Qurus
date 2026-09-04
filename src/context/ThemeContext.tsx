import React, { createContext, useContext, ReactNode } from 'react';

export interface ThemeColors {
  background: string;
  card: string;
  surface: string;
  surfaceHighlight: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  arabicText: string;
  urduText: string;
  border: string;
  borderSubtle: string;
  primary: string;
  primaryMuted: string;
  primaryLight: string;
  secondary: string;
  secondaryMuted: string;
  tertiary: string;
  tertiaryMuted: string;
  noteAccent: string;
  noteMuted: string;
  accentGold: string;
  activeAyahBg: string;
  activeAyahBorder: string;
  bookmarkIcon: string;
  highlightBg: string;
  noteBg: string;
  miniPlayerBg: string;
  tabBarBg: string;
  tabBarBorder: string;
  tabActive: string;
  tabInactive: string;
  statusBarStyle: 'light' | 'dark';
  cardElevated: string;
  urduHighlight: string;
  arabicHighlight: string;
  chipBg: string;
  onPrimary: string;
  destructive: string;
}

const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  card: '#FFFFFF',
  surface: '#F2F7F5',
  surfaceHighlight: '#DCE8E4',
  textPrimary: '#122824',
  textSecondary: '#4A605C',
  textTertiary: '#7E9490',
  arabicText: '#0C1C1A',
  urduText: '#2A3E3A',
  border: '#D8E4E0',
  borderSubtle: '#EEF3F1',
  primary: '#0E6B5C',
  primaryMuted: 'rgba(14, 107, 92, 0.12)',
  primaryLight: '#E7F2EF',
  secondary: '#C4455A',
  secondaryMuted: 'rgba(196, 69, 90, 0.14)',
  tertiary: '#C46B1A',
  tertiaryMuted: 'rgba(196, 107, 26, 0.16)',
  noteAccent: '#5548A0',
  noteMuted: 'rgba(85, 72, 160, 0.12)',
  accentGold: '#C46B1A',
  activeAyahBg: '#E8F2EF',
  activeAyahBorder: '#0E6B5C',
  bookmarkIcon: '#C4455A',
  highlightBg: '#F8ECD8',
  noteBg: '#EEEAF8',
  miniPlayerBg: '#FFFFFF',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#D8E4E0',
  tabActive: '#0E6B5C',
  tabInactive: '#7E9490',
  statusBarStyle: 'dark',
  cardElevated: '#FFFFFF',
  urduHighlight: '#F8E8EB',
  arabicHighlight: '#E8F2EF',
  chipBg: '#F2F7F5',
  onPrimary: '#FFFFFF',
  destructive: '#C45C56',
};

interface ThemeContextType {
  theme: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: lightTheme, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
