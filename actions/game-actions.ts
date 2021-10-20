export type SetInProgressAction = {
  type: string;
};

export const setInProgress = () => ({
  type: 'GAME_IN_PROGRESS',
});

export type SetCalculatedAction = {
  type: string;
};

export const setCalculated = () => ({
  type: 'GAME_CALCULATED',
});

export type GameAction = SetInProgressAction | SetCalculatedAction;
