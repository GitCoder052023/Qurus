import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeMode } from '../types';

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
  accentGold: '#0A5850',
  activeAyahBg: '#E8F2EF',
  activeAyahBorder: '#0E6B5C',
  bookmarkIcon: '#0E6B5C',
  highlightBg: '#E8F2EF',
  noteBg: '#F2F7F5',
  miniPlayerBg: '#FFFFFF',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#D8E4E0',
  tabActive: '#0E6B5C',
  tabInactive: '#7E9490',
  statusBarStyle: 'dark',
  cardElevated: '#FFFFFF',
  urduHighlight: '#F2F7F5',
  arabicHighlight: '#E8F2EF',
  chipBg: '#F2F7F5',
  onPrimary: '#FFFFFF',
  destructive: '#C45C56',
};

const darkTheme: ThemeColors = {
  background: '#0A1614',
  card: '#12201D',
  surface: '#1A2C28',
  surfaceHighlight: '#243832',
  textPrimary: '#ECF4F1',
  textSecondary: '#9BB0AA',
  textTertiary: '#6A807A',
  arabicText: '#F4FAF8',
  urduText: '#C5D4D0',
  border: '#243832',
  borderSubtle: '#152420',
  primary: '#3D9B88',
  primaryMuted: 'rgba(61, 155, 136, 0.16)',
  primaryLight: '#1A322C',
  accentGold: '#4AAB98',
  activeAyahBg: '#17302C',
  activeAyahBorder: '#3D9B88',
  bookmarkIcon: '#4AAB98',
  highlightBg: '#17302C',
  noteBg: '#152824',
  miniPlayerBg: '#12201D',
  tabBarBg: '#081210',
  tabBarBorder: '#243832',
  tabActive: '#3D9B88',
  tabInactive: '#6A807A',
  statusBarStyle: 'light',
  cardElevated: '#12201D',
  urduHighlight: '#152824',
  arabicHighlight: '#17302C',
  chipBg: '#1A2C28',
  onPrimary: '#FFFFFF',
  destructive: '#E0A09A',
};

const sepiaTheme: ThemeColors = {
  background: '#F4F8F6',
  card: '#FFFFFF',
  surface: '#E6EEEC',
  surfaceHighlight: '#D2E0DC',
  textPrimary: '#122824',
  textSecondary: '#4A605C',
  textTertiary: '#7E9490',
  arabicText: '#0C1C1A',
  urduText: '#2A3E3A',
  border: '#D2E0DC',
  borderSubtle: '#EAF0EE',
  primary: '#0E6B5C',
  primaryMuted: 'rgba(14, 107, 92, 0.14)',
  primaryLight: '#E4EFEB',
  accentGold: '#0A5850',
  activeAyahBg: '#E4EFEB',
  activeAyahBorder: '#0E6B5C',
  bookmarkIcon: '#0E6B5C',
  highlightBg: '#E4EFEB',
  noteBg: '#EAF2F0',
  miniPlayerBg: '#FFFFFF',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#D2E0DC',
  tabActive: '#0E6B5C',
  tabInactive: '#7E9490',
  statusBarStyle: 'dark',
  cardElevated: '#FFFFFF',
  urduHighlight: '#EAF2F0',
  arabicHighlight: '#E4EFEB',
  chipBg: '#E6EEEC',
  onPrimary: '#FFFFFF',
  destructive: '#C45C56',
};

interface ThemeContextType {
  theme: ThemeColors;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeMode: 'system',
  setThemeMode: () => {},
  isDark: false,
});

export function ThemeProvider({
  children,
  currentThemeMode = 'system',
  onThemeChange,
}: {
  children: ReactNode;
  currentThemeMode?: ThemeMode;
  onThemeChange?: (mode: ThemeMode) => void;
}) {
  const systemColorScheme = useColorScheme();

  const theme = useMemo(() => {
    if (currentThemeMode === 'dark') return darkTheme;
    if (currentThemeMode === 'light') return lightTheme;
    if (currentThemeMode === 'sepia') return sepiaTheme;
    return systemColorScheme === 'dark' ? darkTheme : lightTheme;
  }, [currentThemeMode, systemColorScheme]);

  const isDark = useMemo(() => {
    if (currentThemeMode === 'dark') return true;
    if (currentThemeMode === 'light') return false;
    if (currentThemeMode === 'sepia') return false;
    return systemColorScheme === 'dark';
  }, [currentThemeMode, systemColorScheme]);

  const setThemeMode = (mode: ThemeMode) => {
    if (onThemeChange) {
      onThemeChange(mode);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode: currentThemeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
