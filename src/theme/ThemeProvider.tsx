import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeMode } from '../types';
import { darkTheme, lightTheme, sepiaTheme, ThemeColors } from './colors';

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

export type { ThemeColors };
