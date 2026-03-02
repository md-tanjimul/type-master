/**
 * Generates an array of numbers from start to end (inclusive).
 * @param {number} start - Starting number
 * @param {number} end - Ending number
 * @returns {number[]} - Array of numbers
 */
export const range = (start, end) => {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}