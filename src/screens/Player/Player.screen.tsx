import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Audio } from 'expo-av';

export type PlayerScreenParams = undefined;

const PlayerScreen = () => {
  const [sound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound: soundToPlay } = await Audio.Sound.createAsync(
      require('../../../assets/audio/relaxation/02-comfortable.m4a')
    );
    setSound(soundToPlay);

    console.log('Playing Sound');
    await soundToPlay.playAsync();
  }

  return (
    <View>
      <Text>Player Screen</Text>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

export default PlayerScreen;
