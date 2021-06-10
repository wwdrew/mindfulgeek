import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from '@navigation/RootStack.navigator';
import { PlaylistProvider } from './src/hooks/usePlaylist/usePlaylist.provider';

import './i18n';

const MindfulGeek = () => {
  return (
    <PlaylistProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </PlaylistProvider>
  );
};

export default MindfulGeek;
