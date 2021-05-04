import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
// import relaxation from '../../../src/data/relaxation.json'
import Slider from '@react-native-community/slider';
import { SegmentsList } from '../../components';

// type AudioSegment = {
//   type: "audio"
//   filename: string
//   duration: number
// }

// type SilenceSegment = {
//   type: "silence"
//   ratio: number
// }

// type AudioFile = AudioSegment | SilenceSegment

const MindfulGeek = () => {
    const [duration, setDuration] = useState(30);
  const [sound, setSound] = useState<Audio.Sound>();
  // console.log({relaxation})

//   const reducer = (accumulator: number, currentValue: AudioFile) => accumulator + currentValue.duration;
//   const audioFiles = relaxation.filter(item => item.type === 'audio')
//   const silences = relaxation.filter(item => item.type === 'silence')

//   const soundsDuration = relaxation
//     .filter((item) => item.type === 'audio')
//     .reduce(reducer, 0)

//   const totalDuration = 30 * 60 * 1000;
//   const silenceDuration = totalDuration - soundsDuration;
  
//   console.log({soundsDuration, silenceDuration, totalDuration})

//   const silenceMap = silences.map(item => Math.floor(item.ratio * silenceDuration))

//   console.log("silences total: ", silenceMap.reduce((acc, item) => acc + item, 0))

//   console.log({silenceMap, length: silenceMap.length})

//   const attempt = relaxation.reduce((acc, item) => {

//   }, {})
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/audio/relaxation/02-comfortable.m4a')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
        <Slider
            style={{width: 400, height: 50}}
            minimumValue={10}
            maximumValue={60}
            step={5}
            value={duration}
            onValueChange={value => setDuration(value)}
        />
        <Text>{duration}</Text>
      <Button title="Play Sound" onPress={playSound} />
      <SegmentsList duration={duration} />
    </View>
  );
}

export default MindfulGeek;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
