import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { TabsStack } from '@navigation/Tabs.navigator';
import { PlayerScreen } from '@screens';

export type AppStackProps = {
  Home: undefined;
  Player: undefined;
};

const App = createNativeStackNavigator<AppStackProps>();

export const AppStack = () => {
  return (
    <App.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        stackPresentation: 'modal',
      }}
    >
      <App.Screen name="Home" component={TabsStack} />
      <App.Screen name="Player" component={PlayerScreen} />
    </App.Navigator>
  );
};
