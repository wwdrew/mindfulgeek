import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';
// import { SegmentsList } from '../../components';

import { RootStackProps } from '@navigation/RootStack.navigator';
import { TabsStackParamList } from '@navigation/Tabs.navigator';

const audioFile: AudioFile[] = require('../../data/relaxation.json');

const isAudioSegment = (segment: AudioFile): segment is AudioSegment =>
  segment.type === 'audio';

export type SetupScreenParams = undefined;

type SetupScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsStackParamList, 'Setup'>,
  StackNavigationProp<RootStackProps>
>;

interface Props {
  navigation: SetupScreenNavigationProp;
}

const SetupScreen = ({ navigation }: Props) => {
  const [duration, setDuration] = useState(30);
  const audioSegments = audioFile.filter(isAudioSegment);
  const audioDuration = audioSegments.reduce((total, segment) => {
    return total + (segment.type === 'audio' ? segment.duration : 0);
  }, 0);

  const onPress = () => {
    navigation.navigate('Player', { duration: audioDuration, audioSegments });
  };

  const onValueChange = (value: number) => setDuration(value);

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={60}
        step={5}
        value={duration}
        onValueChange={onValueChange}
      />
      <Text>Duration: {duration}</Text>
      <Button title="Start" onPress={onPress} />
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
