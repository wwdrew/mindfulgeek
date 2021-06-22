import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from '@navigation/RootStack.navigator';

import { PlaylistProvider } from '@hooks/usePlaylist';
import { OnboardingProvider } from '@hooks/useOnboarding';

import './i18n';

const MindfulGeek = () => {
  return (
    <OnboardingProvider>
      <PlaylistProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PlaylistProvider>
    </OnboardingProvider>
  );
};

export default MindfulGeek;
