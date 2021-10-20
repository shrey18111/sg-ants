import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Button from './Button';
import AntTable from './AntTable';
import { GameStatus, Ant } from './commontypes';

import { setInProgress as setAntInProgress, setCalculated as setAntCalculated } from '../actions/ant-actions';
import { setInProgress as setGameInProgress } from '../actions/game-actions';
import { AppState } from '../store';

// Function provided for calculating liklihood
function generateAntWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  return (callback: (liklihood: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}

type Props = {
  status: GameStatus;
  ants: Ant[];
  setGameInProgress: () => void;
  setAntInProgress: (antName: string) => void;
  setAntCalculated: (antName: string, likelihood: number) => void;
};

/**
 * Renders the game (where the user can run the simulation).
 * Also displays the ants with the results updating live.
 */
const Game = (props: Props) => {
  const handlePressStartGame = () => {
    props.setGameInProgress();
    props.ants.forEach(ant => {
      props.setAntInProgress(ant.name);
      const updateAntState = (likelihood: number) => {
        props.setAntCalculated(ant.name, likelihood)
      };
      generateAntWinLikelihoodCalculator()(updateAntState);
    })
  }

  return (
    <View>
      {props.status === GameStatus.NotRun ? (
        <Button handlePress={handlePressStartGame} text="Start Game" />
      ) : null}
      <Text style={styles.title}>Game Status: {props.status}</Text>
      <AntTable />
    </View>
  );
}

const mapStateToProps = (state: AppState) => ({
  status: state.ants.gameStatus,
  ants: Object.keys(state.ants.ants).map(antName => state.ants.ants[antName]).filter(ant => ant.name),
});

const mapDispatchToProps = {
  setGameInProgress,
  setAntInProgress,
  setAntCalculated,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

const styles = StyleSheet.create({
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
