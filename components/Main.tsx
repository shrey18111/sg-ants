import * as React from "react";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import Game from "./Game";
import Welcome from "./Welcome";
import { BasicAnt } from "./commontypes";

import { initializeAntState } from "../actions/ant-actions";

type Props = {
  initializeAntState: (ants: BasicAnt[]) => void;
};

// TODO: Wrap this in Redux
async function callAntsAPI() {
  try {
    const response = await fetch("https://sg-ants-server.herokuapp.com/ants");
    return await response.json();
  } catch (error) {
    // TODO: Prompt the user with Alert to re-try this step if failed.
    console.error(error);
  }
}

/**
 * Renders the welcome screen. If fetching the Ants data, it shows
 * a loading indicator, otherise it shows the game.
 */
const Main = (props: Props) => {
  const [isWelcome, setIsWelcome] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleWelcomePress = () => {
    setIsWelcome(false);
    setIsLoading(true);
    callAntsAPI().then((data) => {
      props.initializeAntState(data.ants);
      setIsLoading(false);
    });
  };

  return isWelcome ? (
    <Welcome handleWelcomePress={handleWelcomePress} />
  ) : isLoading ? (
    <ActivityIndicator />
  ) : (
    <Game />
  );
};

const mapDispatchToProps = { initializeAntState };

export default connect(null, mapDispatchToProps)(Main);
