export type BasicAnt = {
  name: string;
  length: number;
  color: string;
  weight: number;
};

export type Ant = BasicAnt & {
  status: AntStatus;
  likelihood: number;
};

export type AntData = {
  ants: Ant[];
};

// Enum for the overall game status
export enum GameStatus {
  NotRun = "Not yet run",
  InProgress = "In progress",
  AllCalculated = "All calculated",
}

// Enum for the individual ant status
export enum AntStatus {
  NotRun = "Not yet run",
  InProgress = "In progress",
  Calculated = "Calculated",
}
