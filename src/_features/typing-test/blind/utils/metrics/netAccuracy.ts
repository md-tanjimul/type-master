export const netAccuracy = (targetTextLen: number, totalWrongChars: number, isComplete: boolean): number => {
    return isComplete ? parseFloat(((100 / targetTextLen) * (targetTextLen - totalWrongChars)).toFixed(1)) : 0
}