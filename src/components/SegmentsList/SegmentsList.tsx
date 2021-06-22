import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
  audioSegments: AudioSegment[];
  segment: number;
}

export const SegmentsList = ({ audioSegments, segment }: Props) => {
  return (
    <FlatList
      data={audioSegments}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item, index }) => {
        return (
          <View style={index === segment ? styles.highlight : {}}>
            <Text>Type: {item.type}</Text>
            <Text>Duration: {item.duration}</Text>
            <Text>Filename: {item.filename}</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  highlight: { backgroundColor: 'red' },
});
