import { timeFormat } from "@/_shared/utils";

export const totalTime = (time: number, isComplete: boolean): string => {
  
  const totalTime = timeFormat(Math.round(time / 1000))

  return isComplete ? totalTime : '00:00'

};
