import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useOnboarding } from '@hooks/useOnboarding';

import { AppStack, AppStackProps } from './AppStack.navigator';
import {
  OnboardingStack,
  OnboardingStackProps,
} from './OnboardingStack.navigator';

export type RootStackProps = {
  App: AppStackProps;
  Onboarding: OnboardingStackProps;
};

const Root = createStackNavigator<RootStackProps>();

const RootStack = () => {
  const { onboarded } = useOnboarding();

  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      {onboarded ? (
        <Root.Screen name="App" component={AppStack} />
      ) : (
        <Root.Screen name="Onboarding" component={OnboardingStack} />
      )}
    </Root.Navigator>
  );
};

export default RootStack;
