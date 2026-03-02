export type CharCategory = "uppercase" | "lowercase" | "digit" | "punctuation" | "symbol" | "space";

export type EachCharAverageSpeedByCategory = {
  [key in CharCategory]: {
    [char: string]: number;
  };
};

export type InitialState = {
  startTime: number;
  endTime: number;
  isStarted: boolean;
  isWrongKeyLocked: boolean;
};

export type Statistics = {
  correctPressedKeys: string[];
  wrongPressedKeys: string[];
  listOfWrongPressedKeysIndex: number[];
  rawResponseTimes: { [key: string]: number }[];
  responseTimes: { [key: string]: number }[];
  typingCorrectionTime: number;
  lockedText: string;
  inputBoxValue: string;
  realTimeCorrectTextLen: number;
  lastKeyPressingTimestamp: number;
  lastCorrectStateTimestamp: number;
  lastWrongStateTimestamp: number;
  backspaceCount: number;
  longestStreak: number;
  individualHandAvgSpeedPercent: { left: number; right: number };
};

type SpeedAccuracy = {
  speed: number;
  accuracy: number;
};

export type AllCharsAverageSpeedAndAccuracyByCategory = {
  [key in CharCategory | 'leftHand' | 'rightHand']: SpeedAccuracy;
};

