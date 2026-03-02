import { wpmConverter } from "@/_shared/utils/wpmConverter";

export const netWpm = (time: number, targetTextLen: number, totalWrongChars: number, isComplete: boolean): number => {
    
  const avgAccuracy = (100 / targetTextLen) * (targetTextLen - totalWrongChars);

  return isComplete ? parseFloat((wpmConverter(time, targetTextLen) * (avgAccuracy / 100)).toFixed(1)) : 0

};