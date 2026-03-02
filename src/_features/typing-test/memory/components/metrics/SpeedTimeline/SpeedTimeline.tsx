import { useEffect, useState, useMemo } from "react";
import { InitialState, Statistics } from "../../../types";
import CustomBarChart from "@/_features/typing-test/memory/components/SpeedTimelineBarChart/SpeedTimelineBarChart";
import { wpmConverter } from "@/_shared/utils";

type SpeedTimelineProps = {
  initialState: InitialState;
  statistics: Statistics;
};

export default function SpeedTimeline({ initialState, statistics }: SpeedTimelineProps) {
  const [speedSegmentsState, setSpeedSegmentState] = useState<[string, number][]>([]);

  const numberOfSegments = 10;

  // Precompute segment length once
  const segmentLen = useMemo(
    () => statistics.rawResponseTimes.length / numberOfSegments,
    [statistics.rawResponseTimes.length]
  );

  useEffect(() => {
    if (initialState.endTime === 0) return;

    const speedSegments: [string, number][] = [];

    for (let i = 0; i < numberOfSegments; i++) {
      const startIndex = Math.floor(segmentLen * i);
      const endIndex =
        Math.floor(segmentLen * (i + 1)) < statistics.rawResponseTimes.length
          ? Math.floor(segmentLen * (i + 1))
          : statistics.rawResponseTimes.length;

      const arrSegment = statistics.rawResponseTimes.slice(startIndex, endIndex);

      let textLength = 0;
      let totalTime = 0;
      let textSegment = "";

      for (const obj of arrSegment) {
        const char = Object.keys(obj)[0];
        const time = Object.values(obj)[0];
        textSegment += char;
        totalTime += time;
        textLength++;
      }

      speedSegments.push([textSegment, wpmConverter(totalTime, textLength)]);
    }

    setSpeedSegmentState(speedSegments);
  }, [initialState.endTime, numberOfSegments, segmentLen, statistics.rawResponseTimes]);

  return (
    <div className="w-[60%] aspect-[100/40] min-h-40 flex flex-col items-center justify-center py-3 ms-5 my-4 rounded-lg border border-blue-100">

      <h2 className="text-center text-3xl">Race Speed Timeline</h2>
      <p className="mb-8 text-slate-500">How your pace changed from start to finish</p>

      <CustomBarChart data={speedSegmentsState} />
    </div>
  );
}
