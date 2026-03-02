import { redirect } from "next/navigation";
import { Statistics } from "../types";
import { setPracticeFeedback } from "@/_shared/utils/setPracticeFeedback";



export const handleBackspace =  (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  statistics: Statistics,
  lockedText: string,
  inputBoxValue: string,
  targetText: string,
  realTimeCorrectTextLen: number,
  ctrlSide: "left" | "right"
) => {
  if (e.key !== "Backspace") return;

  const incorrectCharsLen =
    lockedText.length +
    inputBoxValue.length -
    realTimeCorrectTextLen;

  const isCtrl = e.ctrlKey;

  if (isCtrl) {
    if (incorrectCharsLen > 0 && incorrectCharsLen <= 2) {

      setPracticeFeedback(
        `
            
          <p class="text-gray-800 mb-3">
            <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Ctrl</kbd> + 
            <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Backspace</kbd> 
            was used to remove two or fewer incorrect characters.
          </p>

            
          <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
            <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText.slice(statistics.realTimeCorrectTextLen, statistics.realTimeCorrectTextLen + incorrectCharsLen) }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + incorrectCharsLen, targetText.length) }</span>
          </div>

        `,
        "strict"
      );

      setTimeout(()=>{
        redirect('/typing-test');
      }, 700);
    } else if (ctrlSide === "right") {

      setPracticeFeedback(
        `
            
          <p class="text-gray-800 mb-3">
            Right <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Ctrl</kbd> was used when performing <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Ctrl</kbd> + <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Backspace<kbd>
          </p>
            
          <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
            <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText.slice(statistics.realTimeCorrectTextLen, statistics.realTimeCorrectTextLen + incorrectCharsLen) }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + incorrectCharsLen, targetText.length) }</span>
          </div>

        `,
        "strict"
      );

      setTimeout(()=>{
        redirect('/typing-test');
      }, 700);
    }
  } else {
    if (incorrectCharsLen > 3) {

      setPracticeFeedback(
        `
            
          <p class="text-gray-800 mb-3">
            Only <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Backspace</kbd> was used to remove four or more incorrect characters.
          </p>
            
          <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
            <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText.slice(statistics.realTimeCorrectTextLen, statistics.realTimeCorrectTextLen + incorrectCharsLen) }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + incorrectCharsLen, targetText.length) }</span>
          </div>

        `,
        "strict"
      );

      setTimeout(()=>{
        redirect('/typing-test');
      }, 700);
    }
  }
};