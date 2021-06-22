import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TabsStack } from '@navigation/Tabs.navigator';
import { PlayerScreen } from '@screens';

export type AppStackProps = {
  Home: undefined;
  Player: undefined;
};

const App = createStackNavigator<AppStackProps>();

export const AppStack = () => {
  return (
    <App.Navigator
      mode="modal"
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name="Home" component={TabsStack} />
      <App.Screen name="Player" component={PlayerScreen} />
    </App.Navigator>
  );
};
