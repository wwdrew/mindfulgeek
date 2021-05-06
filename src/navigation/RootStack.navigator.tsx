import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PlayerScreen, PlayerScreenParams } from '../screens';
import HomeStack from './Tabs.navigator';

export type RootStackProps = {
  Home: undefined;
  Player: PlayerScreenParams;
};

const RootStack = createStackNavigator<RootStackProps>();

const Root = () => {
  return (
    <RootStack.Navigator mode="modal" initialRouteName="Home">
      <RootStack.Screen name="Home" component={HomeStack} />
      <RootStack.Screen name="Player" component={PlayerScreen} />
    </RootStack.Navigator>
  );
};

export default Root;
