import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OnboardingScreen, OnboardingScreenParams } from '@screens';

export type OnboardingStackProps = {
  Onboarding: OnboardingScreenParams;
};

const Onboarding = createStackNavigator<OnboardingStackProps>();

export const OnboardingStack = () => {
  return (
    <Onboarding.Navigator screenOptions={{ headerShown: false }}>
      <Onboarding.Screen name="Onboarding" component={OnboardingScreen} />
    </Onboarding.Navigator>
  );
};
