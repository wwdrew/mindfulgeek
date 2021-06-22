import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TabsStackParamList } from '@navigation/Tabs.navigator';

export type InfoScreenParams = undefined;

type InfoScreenNavigationProp = StackNavigationProp<TabsStackParamList, 'Info'>;

interface Props {
  navigation: InfoScreenNavigationProp;
}

export const InfoScreen = ({}: Props) => {
  return (
    <View>
      <Text>Info Screen</Text>
    </View>
  );
};
