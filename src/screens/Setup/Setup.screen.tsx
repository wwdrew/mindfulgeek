import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { SegmentsList } from '../../components';

export type SetupScreenParams = undefined;

const SetupScreen = () => {
  const [duration, setDuration] = useState(30);
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    console.log('Loading Sound');
    const { sound: soundToPlay } = await Audio.Sound.createAsync(
      require('../../../assets/audio/relaxation/02-comfortable.m4a')
    );
    setSound(soundToPlay);

    console.log('Playing Sound');
    await soundToPlay.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={60}
        step={5}
        value={duration}
        onValueChange={(value) => setDuration(value)}
      />
      <Text>{duration}</Text>
      <Button title="Play Sound" onPress={playSound} />
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
