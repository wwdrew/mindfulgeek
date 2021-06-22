import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Pressable, Text } from 'react-native';

interface Props {
  children: ReactNode;
  onPress: () => void;
}

export const Button = ({ children, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: { borderWidth: 2, borderColor: 'red', padding: 16 },
});
