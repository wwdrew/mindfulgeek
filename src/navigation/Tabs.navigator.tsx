import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  BookScreen,
  BookScreenParams,
  InfoScreen,
  InfoScreenParams,
  SetupScreen,
  SetupScreenParams,
} from '@screens';

export type TabsStackParamList = {
  Book: BookScreenParams;
  Setup: SetupScreenParams;
  Info: InfoScreenParams;
};

const Tabs = createBottomTabNavigator<TabsStackParamList>();

export const TabsStack = () => {
  return (
    <Tabs.Navigator initialRouteName="Setup">
      <Tabs.Screen name="Book" component={BookScreen} />
      <Tabs.Screen name="Setup" component={SetupScreen} />
      <Tabs.Screen name="Info" component={InfoScreen} />
    </Tabs.Navigator>
  );
};
