import React from 'react';
import { Redirect } from 'expo-router';
import { useStudyState } from '../context/StudyContext';

export default function Index() {
  const { hasOnboarded, hasAgreedLegal, isLoaded } = useStudyState();

  if (!isLoaded) {
    return null;
  }

  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (!hasAgreedLegal) {
    return <Redirect href={'/legal-consent' as any} />;
  }

  return <Redirect href="/(tabs)" />;
}
