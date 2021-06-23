import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import prettyMs from 'pretty-ms';

import { SegmentsList } from '@components';
import { usePlaylist } from '@hooks/usePlaylist';

import { audioFiles } from '../../data/relaxation-audio';

export type PlayerScreenParams = undefined;

export const PlayerScreen = () => {
  const { minutes, audioSegments } = usePlaylist();
  const durationMs = minutes * 60 * 1000;

  const [milliSeconds, setMilliSeconds] = useState(0);
  const [position, setPosition] = useState(0);
  const [segment, setSegment] = useState(0);
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
    const audioSegment = audioSegments[segment];

    if (audioSegment.type === 'silence') {
      console.log("Can't play silence yet!");
      return;
    }

    console.log('Loading Sound');

    const { sound: soundToPlay } = await Audio.Sound.createAsync(
      audioFiles[audioSegment.filename]
    );
    setSound(soundToPlay);

    console.log('Playing Sound');
    await soundToPlay.playAsync();
  }

  const onValueChange = (value: number) => {
    const segmentIndex = audioSegments.findIndex(
      (audioSegment) =>
        position >= audioSegment.start && position <= audioSegment.end
    );

    setSegment(segmentIndex);
    setPosition(value);
    setMilliSeconds(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.playerContainer}>
        <Button title="Play Sound" onPress={playSound} />
        <Text>Position: {position}</Text>
        <Text>
          Duration: {prettyMs(milliSeconds, { secondsDecimalDigits: 0 })}
        </Text>
        <Text>Segment: {segment}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={durationMs}
          step={1}
          value={position}
          onValueChange={onValueChange}
        />
      </View>
      <View style={styles.segmentsContainer}>
        <SegmentsList audioSegments={audioSegments} segment={segment} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  slider: { height: 50 },
  playerContainer: {
    padding: 24,
  },
  segmentsContainer: {
    padding: 24,
  },
});
