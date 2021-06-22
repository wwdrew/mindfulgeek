import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';

import { AppStackProps } from '@navigation/AppStack.navigator';
import { TabsStackParamList } from '@navigation/Tabs.navigator';
import { usePlaylist } from '@hooks/usePlaylist';

export type SetupScreenParams = undefined;

type SetupScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsStackParamList, 'Setup'>,
  StackNavigationProp<AppStackProps>
>;

interface Props {
  navigation: SetupScreenNavigationProp;
}

export const SetupScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { minutes, setMinutes } = usePlaylist();

  const onPress = () => {
    navigation.navigate('Player');
  };

  const onValueChange = (newMinutes: number) => setMinutes(newMinutes);

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={60}
        step={5}
        value={minutes}
        onValueChange={onValueChange}
      />
      <Text>Minutes: {minutes}</Text>
      <Button title={t('Start')} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },
  slider: { width: 400, height: 50 },
});
