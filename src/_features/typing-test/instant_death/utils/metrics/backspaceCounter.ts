export const backspaceCounter = (backspaceCount: number, isComplete: boolean ): number => {
    return isComplete ? backspaceCount : 0;
}