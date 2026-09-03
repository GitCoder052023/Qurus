import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';

export function TabLayout() {
  const { theme } = useTheme();
  const { bookmarks, notes } = useStudyState();

  const bookmarkCount = bookmarks.length;
  const noteCount = Object.keys(notes).length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBarBg,
          borderTopColor: theme.borderSubtle,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
          elevation: 0,
        },
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size || 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: 'Quran',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size || 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarBadge: bookmarkCount > 0 ? bookmarkCount : undefined,
          tabBarBadgeStyle: { backgroundColor: theme.bookmarkIcon, fontSize: 10 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size || 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notebook',
          tabBarBadge: noteCount > 0 ? noteCount : undefined,
          tabBarBadgeStyle: { backgroundColor: theme.primary, fontSize: 10 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="journal-outline" size={size || 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size || 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
