import {
  AntAction,
  InitializeAntStateAction,
  SetCalculatedAction,
  SetInProgressAction,
} from "../actions/ant-actions";
import { GameAction } from "../actions/game-actions";
import { Ant, AntStatus, GameStatus } from "../components/commontypes";

export type AntsState = {
  ants: { [key: string]: Ant };
  completedAntsCount: number;
  numAnts: number;
  gameStatus: GameStatus;
};

const initialState: AntsState = {
  ants: {},
  completedAntsCount: 0,
  numAnts: 0,
  gameStatus: GameStatus.NotRun,
};

/**
 * Reducer for ants & game actions.
 * TODO: Fix the type action param so we don't cast types.
 */
export const antsReducer = (
  state = initialState,
  action: AntAction | GameAction
) => {
  switch (action.type) {
    case "INITIALIZE":
      let newState: { [key: string]: Ant } = {};
      (action as InitializeAntStateAction).ants.forEach((ant) => {
        newState[ant.name] = {
          ...ant,
          status: AntStatus.NotRun,
          likelihood: 0,
        };
      });
      return {
        ...state,
        ants: newState,
        numAnts: (action as InitializeAntStateAction).ants.length,
      };
    case "ANT_IN_PROGRESS":
      const currentAntName = (action as SetInProgressAction).antName;
      return {
        ...state,
        ants: {
          ...state.ants,
          [currentAntName]: {
            ...state.ants[currentAntName],
            status: AntStatus.InProgress,
          },
        },
      };
    case "ANT_CALCULATED":
      const currentAntN = (action as SetInProgressAction).antName;
      const newCompletedCount = state.completedAntsCount + 1;

      return {
        ...state,
        ants: {
          ...state.ants,
          [currentAntN]: {
            ...state.ants[currentAntN],
            status: AntStatus.Calculated,
            likelihood: (action as SetCalculatedAction).likelihood,
          },
        },
        completedAntsCount: newCompletedCount,
        gameStatus:
          newCompletedCount === state.numAnts
            ? GameStatus.AllCalculated
            : GameStatus.InProgress,
      };
    case "GAME_IN_PROGRESS":
      return { ...state, gameStatus: GameStatus.InProgress };
    default:
      return state;
  }
};
