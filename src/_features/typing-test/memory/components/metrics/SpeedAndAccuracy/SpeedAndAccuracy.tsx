"use client";

import "./styles.css";
import HexagonMetrics from "../../HexagonMetrics/HexagonMetrics";
import { cn } from "@/lib/utils";

const fillColorObj = {
  front: ["#6666ff", "#66ff66", "#ff66ff", "#ffc966", "#ff6666", "#8ac7db"],
  back: ["#ccccff", "#ccffcc", "#ffccff", "#ffe4b3", "#ffcccc", "#d8ecf3"],
};

const categories = [
  "uppercase",
  "lowercase",
  "digit",
  "punctuation",
  "symbol",
  "space",
] as const;

type SpeedAndAccuracyProps = {
  allCharsAverageSpeedAndAccuracyByCategory: {
    [key: string]: { speed: number; accuracy: number };
  };
};

export default function SpeedAndAccuracy({
  allCharsAverageSpeedAndAccuracyByCategory,
}: SpeedAndAccuracyProps) {
  return (
    <div className="w-[60%] py-3 ms-5 my-4 px-2 rounded-lg border border-blue-100 flex flex-col">
      {/* Header */}
      <h2 className="text-center text-3xl">Speed & Accuracy</h2>
      <p className="text-slate-500 text-center mb-5">
        See how you perform across every category
      </p>

      <div className="flex gap-4">
        {/* Category Legend */}
        <div className="category_marker_nav">
          <ul>
            {categories.map((category, index) => (
              <li key={category} className="">
                <span
                  className={cn("w-6 aspect-square block")}
                  style={{
                    background: `linear-gradient(90deg, ${fillColorObj.front[index]} 50%, ${fillColorObj.back[index]} 50%)`,
                  }}
                ></span>
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Hexagon Metrics */}
        <HexagonMetrics
          fillColorObj={fillColorObj}
          categories={categories}
          allCharsAverageSpeedAndAccuracyByCategory={
            allCharsAverageSpeedAndAccuracyByCategory
          }
        />
      </div>
    </div>
  );
}
