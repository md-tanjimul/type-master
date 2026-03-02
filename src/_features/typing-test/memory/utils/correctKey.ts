export function shouldCountCorrect(
  locked: string,
  current: string,
  correctCount: number
): boolean {
  return locked.length + current.length > correctCount;
}

export function calculateResponseTime(start: number, last: number): number {
  return Date.now() - (last || start);
}
