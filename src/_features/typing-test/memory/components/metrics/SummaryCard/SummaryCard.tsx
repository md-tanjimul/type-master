import { InitialState, Statistics } from "@/_features/typing-test/memory/types";

// import { BarChartHorizontal, CheckCircle, Clock, CornerUpLeft, Delete, FastForward, Flame, GaugeCircle, Hand, History, Move, Timer, XCircle, Zap } from "lucide-react";

import { grossWpm, netWpm, netAccuracy, longestStreak, mistypedCharacters, backspaceCounter, typingCorrectionTime, totalTime, handSpeedRatio } from '@/_features/typing-test/memory/utils/metrics';

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

          <h2 className="text-center text-3xl mb-5">Summary</h2>

          <div className="mx-auto p-2 flex flex-wrap justify-between">

            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <Zap />
              </div>
              <div className="value text-blue-600 text-xl">
                  { grossWpm(initialState.endTime - initialState.startTime, targetText.length, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
                <span className="text-xs"> WPM</span>
              </div>
              <div className="title text-xs text-center text-slate-500">Gross WPM</div>
            </div>

            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <GaugeCircle />
              </div>
              <div className="value text-blue-600 text-xl">
                { netWpm(initialState.endTime - initialState.startTime, targetText.length, statistics.wrongPressedKeys.length, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
                <span className="text-xs"> WPM</span>
              </div>
              <div className="title text-xs text-center text-slate-500">Net WPM <br /> (based on accuracy)</div>
            </div>

            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <CheckCircle />
              </div>
              <div className="value text-blue-600 text-xl">
                { netAccuracy(targetText.length, statistics.wrongPressedKeys.length, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
                <span className="text-xs"> %</span>
              </div>
              <div className="title text-xs text-center text-slate-500">Accuracy</div>
            </div>



            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <Flame />
              </div>
              <div className="value text-blue-600 text-xl">
                { longestStreak(statistics.longestStreak, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
                <span className="text-xs"> characters</span>
              </div>
              <div className="title text-xs text-center text-slate-500">Longest streak</div>
            </div>

            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <XCircle />
              </div>
              <div className="value text-blue-600 text-xl">
                { mistypedCharacters(statistics.wrongPressedKeys.length, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
              </div>
              <div className="title text-xs text-center text-slate-500">Mistyped character</div>
            </div>

            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <CornerUpLeft />
              </div>
              <div className="value text-blue-600 text-xl">
                { backspaceCounter(statistics.backspaceCount, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
              </div>
              <div className="title text-xs text-center text-slate-500">Backspace used</div>
            </div>



            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <History />
              </div>
              <div className="value text-blue-600 text-xl">
                { typingCorrectionTime(statistics.typingCorrectionTime, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
              </div>
              <div className="title text-xs text-center text-slate-500">Correction time</div>
            </div>

            <div className="w-[24%] py-2 rounded-lg flex flex-col justify-center items-center my-1 border border-blue-100 shadow-xs">
              <div className="icon text-blue-600">
                <Clock />
              </div>
              <div className="value text-blue-600 text-xl">
                { totalTime(initialState.endTime - initialState.startTime, targetText.length > 0 ? targetText.length === statistics.lockedText.length : false) }
              </div>
              <div className="title text-xs text-center text-slate-500">Total time</div>
            </div>

          </div>

        </div>

        

    </>

}