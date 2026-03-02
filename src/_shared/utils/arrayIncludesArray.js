/**
 * Checks if a given array exists within an array of arrays
 * @param {Array[]} arr - The parent array of arrays
 * @param {Array} target - The array to search for
 * @returns {boolean} true if target array exists, false otherwise
 */
export const arrayIncludesArray = (arr, target) => {
  return arr.some(
    subArr =>
      subArr.length === target.length &&
      subArr.every((val, i) => val === target[i])
  );
}
