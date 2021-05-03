import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import relaxation from '../../../src/data/relaxation.json'

type AudioSegment = {
  type: "audio"
  filename: string
  duration: number
}

type SilenceSegment = {
  type: "silence"
  ratio: number
}

type AudioFile = AudioSegment | SilenceSegment

const MindfulGeek = () => {
  const [sound, setSound] = React.useState<Audio.Sound>();
  // console.log({relaxation})

  const reducer = (accumulator: number, currentValue: AudioSegment) => accumulator + currentValue.duration;
  const audioFiles = relaxation.filter(item => item.type === 'audio')
  const silences = relaxation.filter(item => item.type === 'silence')

  const soundsDuration = relaxation
    .filter((item) => item.type === 'audio')
    .reduce(reducer, 0)

  const totalDuration = 30 * 60 * 1000;
  const silenceDuration = totalDuration - soundsDuration;
  
  console.log({soundsDuration, silenceDuration, totalDuration})

  const silenceMap = silences.map(item => Math.floor(item.ratio * silenceDuration))

  console.log("silences total: ", silenceMap.reduce((acc, item) => acc + item, 0))

  console.log({silenceMap, length: silenceMap.length})

  const attempt = relaxation.reduce((acc, item) => {

  }, {})
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/audio/relaxation/02-comfortable.m4a')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
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
