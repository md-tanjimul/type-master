export function getWrongKeyCounts(wrongKeys: string[]): Record<string, number> {
      return wrongKeys.reduce<Record<string, number>>((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
}