

export function calculateCharSpeedStats(
  responseTimes: Record<string, number>[]
){

  const totals: { [key: string]: { sum: number; count: number } } = {};

  for (const record of responseTimes) {
    const [char, time] = Object.entries(record)[0];
    if (!totals[char]) {
      totals[char] = { sum: 0, count: 0 };
    }
    totals[char].sum += time;
    totals[char].count += 1;
  }

  return totals;
}

export function computeAverage(sum: number, count: number): number {
  return Math.round(sum / count);
}

