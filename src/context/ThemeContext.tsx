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
  primary: string; // calming emerald
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
}

const lightTheme: ThemeColors = {
  background: '#FAF8F5', // soft warm ivory
  card: '#FFFFFF',
  surface: '#F4F0E8',
  surfaceHighlight: '#EAE4D6',
  textPrimary: '#1E293B',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  arabicText: '#0F172A',
  urduText: '#334155',
  border: '#E2DCD2',
  borderSubtle: '#EDE8DF',
  primary: '#0D7A57', // serene emerald
  primaryMuted: '#0D7A5720',
  primaryLight: '#E6F4EA',
  accentGold: '#B8860B',
  activeAyahBg: '#EAF7EE', // gentle recitation highlight
  activeAyahBorder: '#2E8B57',
  bookmarkIcon: '#D97706',
  highlightBg: '#FEF9C3',
  noteBg: '#FEF3C7',
  miniPlayerBg: '#FFFFFF',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#E2DCD2',
  tabActive: '#0D7A57',
  tabInactive: '#64748B',
  statusBarStyle: 'dark',
};

const darkTheme: ThemeColors = {
  background: '#0D1117', // deep slate night
  card: '#161B22',
  surface: '#21262D',
  surfaceHighlight: '#30363D',
  textPrimary: '#F0F6FC',
  textSecondary: '#8B949E',
  textTertiary: '#484F58',
  arabicText: '#F0F6FC',
  urduText: '#C9D1D9',
  border: '#30363D',
  borderSubtle: '#21262D',
  primary: '#2EA043',
  primaryMuted: '#2EA04325',
  primaryLight: '#1B382B',
  accentGold: '#D29922',
  activeAyahBg: '#122E22', // deep emerald recitation glow
  activeAyahBorder: '#2EA043',
  bookmarkIcon: '#F59E0B',
  highlightBg: '#2D2813',
  noteBg: '#2C2718',
  miniPlayerBg: '#161B22',
  tabBarBg: '#161B22',
  tabBarBorder: '#30363D',
  tabActive: '#3FB950',
  tabInactive: '#8B949E',
  statusBarStyle: 'light',
};

const sepiaTheme: ThemeColors = {
  background: '#F4ECE1', // antique manuscript parchment
  card: '#FAF4EB',
  surface: '#ECE2D3',
  surfaceHighlight: '#DFD2C0',
  textPrimary: '#2D2319',
  textSecondary: '#5C4E3E',
  textTertiary: '#8D7B68',
  arabicText: '#231A12',
  urduText: '#44372B',
  border: '#DDCFBD',
  borderSubtle: '#E8DDCF',
  primary: '#7C4A1E', // warm terracotta leather
  primaryMuted: '#7C4A1E20',
  primaryLight: '#EAD9C8',
  accentGold: '#9A6B2F',
  activeAyahBg: '#EDE1CC',
  activeAyahBorder: '#9A6B2F',
  bookmarkIcon: '#C27803',
  highlightBg: '#EFE0B9',
  noteBg: '#E9DAC0',
  miniPlayerBg: '#FAF4EB',
  tabBarBg: '#FAF4EB',
  tabBarBorder: '#DDCFBD',
  tabActive: '#7C4A1E',
  tabInactive: '#786C5E',
  statusBarStyle: 'dark',
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
    // system
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
