export type SetInProgressAction = {
  type: string;
};

export const setInProgress = () => ({
  type: "GAME_IN_PROGRESS",
});

export type GameAction = SetInProgressAction;
