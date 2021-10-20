import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    text: string;
    handlePress: () => void;
};

/**
 * Simple large green button that displays text prop that is passed to it.
 */
export default function Button(props: Props) {
  return (
    <TouchableOpacity onPress={props.handlePress} style={styles.button}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 24,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  text: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  }
});