import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PlayerScreen, PlayerScreenParams } from '@screens';
import HomeStack from '@navigation/Tabs.navigator';

export type RootStackProps = {
  Home: undefined;
  Player: PlayerScreenParams;
};

const Root = createStackNavigator<RootStackProps>();

const RootStack = () => {
  return (
    <Root.Navigator mode="modal" initialRouteName="Home">
      <Root.Screen name="Home" component={HomeStack} />
      <Root.Screen name="Player" component={PlayerScreen} />
    </Root.Navigator>
  );
};

export default RootStack;
