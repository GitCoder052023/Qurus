import React from 'react';
import { Redirect } from 'expo-router';
import { useStudyState } from '../context/StudyContext';

export default function Index() {
  const { hasOnboarded, isLoaded } = useStudyState();

  if (!isLoaded) {
    return null;
  }

  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
