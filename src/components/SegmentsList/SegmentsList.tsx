import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const audioFile: AudioFile[] = require("../../data/relaxation.json");

const isAudioSegment = (segment: AudioFile): segment is AudioSegment =>
  segment.type === "audio";

interface Props {
  duration: number;
}

const SegmentsList = ({ duration }: Props) => {
  const data = audioFile.map((item, index) => ({ id: `${index}`, ...item }));
  const fullDuration = duration * 60 * 1000;
  const audioFiles = data.filter(isAudioSegment);
  const audioDuration = audioFiles.reduce((value, item) => {
    return item.type === "audio" ? item.duration : value;
  }, 0);
  const silenceDuration = fullDuration - audioDuration;

  const audioMap = data.map((item) => ({
    id: item.id,
    duration:
      item.type === "audio"
        ? item.duration
        : Math.floor(item.ratio * silenceDuration),
    type: item.type,
  }));
  const actualSilenceDuration = audioMap.reduce((value, item) => {
    return item.type === "silence" ? value + item.duration : value;
  }, 0);

  const silenceVariance = actualSilenceDuration - silenceDuration;
  console.log({
    fullDuration,
    audioDuration,
    silenceDuration,
    actualSilenceDuration,
    silenceVariance,
  });

  return (
    <FlatList
      data={audioMap}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View>
            <Text>Type: {item.type}</Text>
            <Text>Duration: {item.duration}</Text>
          </View>
        );
      }}
    />
  );
};

export default SegmentsList;
