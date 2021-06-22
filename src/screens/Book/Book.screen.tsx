import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TabsStackParamList } from '@navigation/Tabs.navigator';

export type BookScreenParams = undefined;

type BookScreenNavigationProp = StackNavigationProp<TabsStackParamList, 'Book'>;

interface Props {
  navigation: BookScreenNavigationProp;
}

export const BookScreen = ({}: Props) => {
  return (
    <View>
      <Text>Book Screen</Text>
    </View>
  );
};
