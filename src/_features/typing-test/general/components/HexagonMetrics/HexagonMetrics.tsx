"use client";

import "./styles.css";

import Hexagon from "../Hexagon/Hexagon";
import React from "react";
import { CharCategory } from "../../types";

type FillColorObj = {
  front: string[];
  back: string[];
};

type HexagonMetricsProps = {
  allCharsAverageSpeedAndAccuracyByCategory: {
    [key: string]: { speed: number; accuracy: number };
  };
  categories: readonly CharCategory[];
  fillColorObj: FillColorObj;
};

export default function HexagonMetrics({
  allCharsAverageSpeedAndAccuracyByCategory,
  categories,
  fillColorObj,
}: HexagonMetricsProps) {
  // Turn object into [key, value] pairs
  const entries = Object.entries(allCharsAverageSpeedAndAccuracyByCategory);

  // Find highest speed
  const [maxCategory, maxData] = entries.reduce(
    (max, curr) => (curr[1].speed > max[1].speed ? curr : max),
    entries[0]
  );

  // Find lowest speed
  const [minCategory, minData] = entries.reduce(
    (min, curr) => (curr[1].speed < min[1].speed ? curr : min),
    entries[0]
  );

  // Store results (unused for now, but may be used in future features)
  const highestSpeedCategory = maxCategory;
  const highestSpeedValue = maxData.speed;
  const lowestSpeedCategory = minCategory;
  const lowestSpeedValue = minData.speed;

  return (
    <div className="hexagon_container">
      {categories.map((item, index) => {
        const charData = allCharsAverageSpeedAndAccuracyByCategory[item];
        const isEmpty = !charData || (charData.speed === 0 && charData.accuracy === 0);
        const isBreakIndex = index === 2; // clearer than [2].includes(index)

        // Props for Hexagon
        const hexagonProps = isEmpty
          ? { data: { speed: 0, accuracy: 0 }, frontColor: "", bgColor: "", scale: 0 }
          : {
              data: charData,
              frontColor: fillColorObj.front[index],
              bgColor: fillColorObj.back[index],
              scale: charData.speed / (highestSpeedValue / 100),
            };

        return (
          <React.Fragment key={index}>
            <Hexagon {...hexagonProps} />
            {isBreakIndex && <div className="break" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
