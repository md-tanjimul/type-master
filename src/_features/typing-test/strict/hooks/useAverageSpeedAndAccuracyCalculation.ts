"use client";

import { useEffect } from "react";
import { calculateAccuracy } from "../utils";
import { categorizeCharacter } from "../utils";
import { CharCategory, Statistics } from "@/_features/typing-test/strict/types";
import { wpmConverter } from "@/_shared/utils/wpmConverter";

// Define which characters are typed with the left and right hands
const LEFT_HAND_CHARS = new Set(['`', '~', '1', '2', '3', '4', '5', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b']);

const RIGHT_HAND_CHARS = new Set(['6', '7', '8', '9', '0', '-', '=', '^', '&', '*', '(', ')', '_', '+', 'y', 'u', 'i', 'o', 'p', '[', ']', '{', '}', 'h', 'j', 'k', 'l', ';', ':', "'", '"', '\\', '|', 'n', 'm', ',', '.', '/', '<', '>', '?']);

/**
 * Aggregates response times per character.
 * means: It collects and summarizes all the response times (how long it took the user to type each character) grouped by individual characters.
 */
const computeCharacterResponseStats = (
  responseTimes: Record<string, number>[]
): Record<string, { sum: number; count: number }> => {
  const stats: Record<string, { sum: number; count: number }> = {};

  for (const record of responseTimes) {
    const [char, time] = Object.entries(record)[0];
    if (!stats[char]) stats[char] = { sum: 0, count: 0 };
    stats[char].sum += time;
    stats[char].count += 1;
  }

  return stats;
};

/**
 * Aggregates stats by character category and typing hand.
 */
const computeCategoryResponseStats = (
  charStats: Record<string, { sum: number; count: number }>
): Record<CharCategory | "leftHand" | "rightHand", { sum: number; count: number }> => {
  const stats: Record<CharCategory | "leftHand" | "rightHand", { sum: number; count: number }> = {
    uppercase: { sum: 0, count: 0 },
    lowercase: { sum: 0, count: 0 },
    digit: { sum: 0, count: 0 },
    punctuation: { sum: 0, count: 0 },
    symbol: { sum: 0, count: 0 },
    space: { sum: 0, count: 0 },
    leftHand: { sum: 0, count: 0 },
    rightHand: { sum: 0, count: 0 },
  };

  for (const char in charStats) {
    const { sum, count } = charStats[char];
    const category = categorizeCharacter(char);
    const lowerChar = char.toLowerCase();

    stats[category].sum += sum;
    stats[category].count += count;

    if (LEFT_HAND_CHARS.has(lowerChar)) {
      stats.leftHand.sum += sum;
      stats.leftHand.count += count;
    } else if (RIGHT_HAND_CHARS.has(lowerChar)) {
      stats.rightHand.sum += sum;
      stats.rightHand.count += count;
    }
  }

  return stats;
};

/**
 * Counts how many times each character was mistyped.
 */
const computeCharMistypes = (wrongKeys: string[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const char of wrongKeys) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
};

/**
 * Aggregates mistyped counts by category and hand.
 */
const computeCategoryMistypes = (
  charMistypes: Record<string, number>
): Record<CharCategory | "leftHand" | "rightHand", number> => {
  const counts: Record<CharCategory | "leftHand" | "rightHand", number> = {
    uppercase: 0,
    lowercase: 0,
    digit: 0,
    punctuation: 0,
    symbol: 0,
    space: 0,
    leftHand: 0,
    rightHand: 0,
  };

  for (const char in charMistypes) {
    const count = charMistypes[char];
    const category = categorizeCharacter(char);
    const lowerChar = char.toLowerCase();

    counts[category] += count;

    if (LEFT_HAND_CHARS.has(lowerChar)) {
      counts.leftHand += count;
    } else if (RIGHT_HAND_CHARS.has(lowerChar)) {
      counts.rightHand += count;
    }
  }

  return counts;
};

/**
 * Hook: Calculates average speed and accuracy by category.
 */
export function useAverageSpeedAndAccuracyCalculation(
  isTypingEnded: boolean,
  statistics: Statistics,
  setAllCharsAverageSpeedAndAccuracyByCategory: (
    updater: (draft: { [key: string]: { speed: number; accuracy: number } }) => void
  ) => void
) {
  const { responseTimes, wrongPressedKeys } = statistics;

  useEffect(() => {
    if (!isTypingEnded) return;

    const charStats = computeCharacterResponseStats(responseTimes);
    const categoryStats = computeCategoryResponseStats(charStats);
    const charMistypes = computeCharMistypes(wrongPressedKeys);
    const categoryMistypes = computeCategoryMistypes(charMistypes);

    for (const [category, { sum, count }] of Object.entries(categoryStats)) {
      if (count === 0) continue;

      const mistypes = categoryMistypes[category as keyof typeof categoryMistypes] ?? 0;

      setAllCharsAverageSpeedAndAccuracyByCategory((draft) => {
        draft[category] = {
          speed: wpmConverter(sum / count),
          accuracy: calculateAccuracy(count, mistypes),
        };
      });
    }
  }, [isTypingEnded, responseTimes, wrongPressedKeys, setAllCharsAverageSpeedAndAccuracyByCategory]);
}
