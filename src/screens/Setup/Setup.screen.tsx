import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';

import { RootStackProps } from '@navigation/RootStack.navigator';
import { TabsStackParamList } from '@navigation/Tabs.navigator';
import { usePlaylist } from '../../hooks/usePlaylist/usePlaylist.provider';

export type SetupScreenParams = undefined;

type SetupScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsStackParamList, 'Setup'>,
  StackNavigationProp<RootStackProps>
>;

interface Props {
  navigation: SetupScreenNavigationProp;
}

const SetupScreen = ({ navigation }: Props) => {
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
      {/* <SegmentsList duration={duration} /> */}
    </View>
  );
};

export default SetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: { width: 400, height: 50 },
});
