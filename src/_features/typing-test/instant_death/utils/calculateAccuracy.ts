/**
 * Calculates accuracy as a percentage, formatted to 2 decimal places.
 * If no keys were typed or mistyped, returns "N/A".
 */
export const calculateAccuracy = (typed: number, wrong: number): number => {

  // if (typed === 0 && wrong === 0) return "N/A"; // Avoid divide-by-zero

  return parseFloat(((100 / typed) * (typed - wrong)).toFixed(1))

};