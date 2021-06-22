import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Button } from '@components';
import { useOnboarding } from '@hooks/useOnboarding';

export type OnboardingScreenParams = undefined;

interface Props {}

export const OnboardingScreen = ({}: Props) => {
  const { setOnboarded } = useOnboarding();

  const onButtonPress = () => setOnboarded(true);

  return (
    <SafeAreaView style={styles.screen}>
      <Text>Onboarding Screen</Text>
      <Button onPress={onButtonPress}>Onboarding Complete</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
