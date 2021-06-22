import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import prettyMs from 'pretty-ms';

import { SegmentsList } from '@components';
import { usePlaylist } from '@hooks/usePlaylist';

export type PlayerScreenParams = undefined;

export const PlayerScreen = () => {
  const { minutes, audioSegments } = usePlaylist();

  const [position, setPosition] = useState(0);
  const [segment, setSegment] = useState(0);
  const [segmentStartMs, setMinSegmentMs] = useState(0);
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

  const onValueChange = (value: number) => {
    let tally = 0;
    let segmentIndex = 0;
    let segmentStart = 0;

    for (let index = 0; index < audioSegments.length; index++) {
      const minSegmentMs = tally;
      const maxSegmentMs = tally + audioSegments[index].duration;

      if (position > minSegmentMs && position <= maxSegmentMs) {
        segmentIndex = index;
        segmentStart = minSegmentMs;
        break;
      }

      tally = maxSegmentMs;
    }

    setSegment(segmentIndex);
    setMinSegmentMs(segmentStart);
    setPosition(value);
  };

  return (
    <View style={styles.container}>
      <Text>Player Screen</Text>
      <Button title="Play Sound" onPress={playSound} />
      <Text>Position: {prettyMs(position, { secondsDecimalDigits: 0 })}</Text>
      <Text>Duration: {prettyMs(minutes, { secondsDecimalDigits: 0 })}</Text>
      <Text>Segment: {segment}</Text>
      <Text>Segment Start: {segmentStartMs}</Text>
      <Text>Segment Offset: {position - segmentStartMs}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={minutes}
        step={100}
        value={position}
        onValueChange={onValueChange}
      />
      <SegmentsList audioSegments={audioSegments} segment={segment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: { width: 400, height: 50 },
});
