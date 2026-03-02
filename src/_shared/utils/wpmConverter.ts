
export const wpmConverter = (timeInMs: number = 0, textLen: number = 1): number => {
  if (timeInMs <= 0 || textLen <= 0) {
    return 0;
  }
  
  const minutes = timeInMs / (1000 * 60);
  const wpm = ((textLen / 5) / minutes).toFixed(1);
  
  return parseFloat(wpm);
}