import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { SegmentsList } from '../../components';
import { RootStackProps } from '../../navigation/RootStack.navigator';

export type SetupScreenParams = undefined;

type SetupScreenNavigationProp = StackNavigationProp<RootStackProps, 'Setup'>;

interface Props {
  navigation: SetupScreenNavigationProp;
}

const SetupScreen = ({ navigation }: Props) => {
  const [duration, setDuration] = useState(30);

  const onPress = () => {
    navigation.navigate('Player');
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
      <Text>{duration}</Text>
      <Button title="Play Sound" onPress={onPress} />
      <SegmentsList duration={duration} />
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
