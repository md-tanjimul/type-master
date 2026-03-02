import { wpmConverter } from "@/_shared/utils/wpmConverter";


export const grossWpm = (time: number, targetTextLen: number, isComplete: boolean): number => {

  return isComplete ? wpmConverter(time, targetTextLen) : 0

};
