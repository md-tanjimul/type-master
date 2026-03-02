import { InitialState, Statistics } from "@/_features/typing-test/hardcore/types";


import { grossWpm, netWpm, netAccuracy, longestStreak, mistypedCharacters, backspaceCounter, typingCorrectionTime, totalTime, handSpeedRatio } from '@/_features/typing-test/instant_death/utils/metrics';

import { CheckCircle, Clock, CornerUpLeft, Flame, GaugeCircle, Hand, History, XCircle, Zap } from "lucide-react";

type SummaryCardProps = {
  targetText: string;
  initialState: InitialState;
  statistics: Statistics,
  allCharsAverageSpeedAndAccuracyByCategory: {[key: string]: { speed: number, accuracy: number }}
  timeRemain: number | null;
};



export default function SummaryCard({
  targetText,
  initialState,
  statistics,
  allCharsAverageSpeedAndAccuracyByCategory,
  timeRemain
}: SummaryCardProps){

    return <>

        <div className="w-[60%] py-3 ms-5 my-4 rounded-lg border border-blue-100">

          <h1 className="text-center text-4xl mb-5">Summary</h1>

          <div className="mx-auto p-2 flex flex-wrap justify-evenly">

            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <Zap />
              </div>
              <div className="value text-blue-600 text-xl">
                  { grossWpm(initialState.endTime - initialState.startTime, targetText.length, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
                <span className="text-xs"> WPM</span>
              </div>
              <div className="title text-xs text-center text-slate-500">Speed</div>
            </div>

            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <Clock />
              </div>
              <div className="value text-blue-600 text-xl">
                { totalTime(initialState.endTime - initialState.startTime, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
              </div>
              <div className="title text-xs text-center text-slate-500">Time taken</div>
            </div>

          </div>

        </div>

        

    </>

}