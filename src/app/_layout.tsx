import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, StatusBar } from 'react-native';
import { StudyProvider, useStudyState } from '../context/StudyContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { AudioProvider } from '../context/AudioContext';
import { MiniPlayer } from '../components/MiniPlayer';
import { FullPlayerModal } from '../components/FullPlayerModal';

function InnerApp() {
  const { preferences, updatePreferences } = useStudyState();
  const currentThemeMode = preferences?.theme || 'system';

  return (
    <ThemeProvider
      currentThemeMode={currentThemeMode}
      onThemeChange={(mode) => updatePreferences({ theme: mode })}
    >
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.statusBarStyle === 'light' ? 'light-content' : 'dark-content'}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="reader/[surah]" options={{ headerShown: false }} />
        <Stack.Screen name="story" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>

      {/* Persistent Spotify-like Mini Player */}
      <MiniPlayer />

      {/* Expandable Full Reciter Player */}
      <FullPlayerModal />
    </View>
  );
}

export default function RootLayout() {
  return (
    <StudyProvider>
      <InnerApp />
    </StudyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
