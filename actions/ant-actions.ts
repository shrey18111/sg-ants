import { BasicAnt } from '../components/commontypes';

export type InitializeAntStateAction = {
  type: string;
  ants: BasicAnt[];
}

export const initializeAntState = (ants: BasicAnt[]) => ({
  type: 'INITIALIZE',
  ants,
});

export type SetInProgressAction = {
  type: string;
  antName: string;
};

export const setInProgress = (antName: string) => ({
  type: 'ANT_IN_PROGRESS',
  antName,
});

export type SetCalculatedAction = {
  type: string;
  antName: string;
  likelihood: number;
};

export const setCalculated = (antName: string, likelihood: number) => ({
  type: 'ANT_CALCULATED',
  antName,
  likelihood,
});

export type AntAction = InitializeAntStateAction | SetInProgressAction | SetCalculatedAction;
