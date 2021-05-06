import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SetupScreen, SetupScreenParams } from '../screens';

type TabsStackParamList = {
  Setup: SetupScreenParams;
};

const Tabs = createBottomTabNavigator<TabsStackParamList>();

const TabsStack = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Setup" component={SetupScreen} />
    </Tabs.Navigator>
  );
};

export default TabsStack;
