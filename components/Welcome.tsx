import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import Button from "./Button";

type Props = {
  handleWelcomePress: () => void;
};

/**
 * Renders the welcome text to the Ants Race game simulation.
 */
export default function Welcome(props: Props) {
  return (
    <View>
      <Text style={styles.title}>Welcome to Ants Race!</Text>
      <Text style={styles.subtitle}>
        Please press the button below to download the data for the race!
      </Text>
      <Button handlePress={props.handleWelcomePress} text="Press me!" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    margin: 24,
    fontSize: 15,
    textAlign: "center",
  },
});
