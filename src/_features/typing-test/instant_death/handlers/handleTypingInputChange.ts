"use client"

import { ChangeEvent } from "react";
import { isInputCorrect, isTypingComplete, getLastChar, calculateResponseTime, shouldCountCorrect } from "../utils";

import { InitialState, Statistics } from "@/_features/typing-test/instant_death/types";
import { redirect } from "next/navigation";
import { setPracticeFeedback } from "@/_shared/utils/setPracticeFeedback";

// Typing the state setters for useImmer
type ImmerSetter<T> = (updater: (draft: T) => void) => void;



let longestStreakLocalVar = 0;



export function handleTypingInputChange(
  e: ChangeEvent<HTMLTextAreaElement>,
  targetText: string,
  statistics: Statistics,
  setStatistics: ImmerSetter<Statistics>,
  initialState: InitialState,
  setInitialState: ImmerSetter<InitialState>,
  setTimeRemain: React.Dispatch<React.SetStateAction<number | null>>,
  inputBoxRef: React.RefObject<HTMLTextAreaElement | null>,
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>,
) {


    if(targetText.startsWith(statistics.lockedText + e.target.value) && e.target.value[e.target.value.length - 1] === ' '){
      setInputBoxCaretPos(0);
    }else{
      const caret = e.currentTarget.selectionStart ?? 0;
      setInputBoxCaretPos(caret);
    }

  
    let localVarForInputBoxValue = e.target.value;
    const isCorrectSoFar = isInputCorrect(targetText, statistics.lockedText, localVarForInputBoxValue);
    const lastChar = getLastChar(localVarForInputBoxValue);
    const isEnd = isTypingComplete(targetText, statistics.lockedText, localVarForInputBoxValue);

    

    

    if(targetText.startsWith(statistics.lockedText + e.target.value) == false && !initialState.isWrongKeyLocked){

      const userInput = e.target.value;
      const match = userInput.match(/(\S+)\s*$/); // Match last word + trailing spaces
      const lastTypedWithSpace = match ? match[0] : ' ';

      setPracticeFeedback(
          `
            <p class="text-gray-800 mb-3">
              Looks like you typed <code class="bg-red-100 px-1 rounded text-red-700 whitespace-pre">${lastTypedWithSpace}</code> instead of <code class="bg-green-100 px-1 rounded text-green-700">${targetText.split(' ')[statistics.lockedText.split(' ').length - 1]}</code>
            </p>
            
            <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
              <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
            </div>
          `,
          "instant-death"
      );


      setTimeout(()=>{
        redirect('/typing-test');
      }, 700);

    }


    if (!isEnd){
      setStatistics(draft => {
        draft.inputBoxValue = e.target.value;
      });
    }

    if (isCorrectSoFar && lastChar === " " || isEnd) {

      setStatistics(draft => {
        draft.lockedText += localVarForInputBoxValue;
      });
      inputBoxRef.current && (inputBoxRef.current.value = "");

      setStatistics(draft => {
        draft.inputBoxValue = e.target.value;
      });

    }

    if (isCorrectSoFar &&
      shouldCountCorrect(statistics.lockedText, localVarForInputBoxValue, statistics.correctPressedKeys.length)
    ) {

      longestStreakLocalVar += 1;

      if(longestStreakLocalVar > statistics.longestStreak){
        const currentStreak = longestStreakLocalVar;
            setStatistics(draft => {
              draft.longestStreak = currentStreak;
            });
      }
      
      if(isEnd){
          longestStreakLocalVar = 0;

          setInitialState(draft => {
            draft.endTime = Date.now();
            draft.isStarted = false;
          });

          setTimeRemain(0);
          
      }

      

      setStatistics(draft => {
        draft.lastKeyPressingTimestamp = Date.now();
        draft.correctPressedKeys.push(lastChar);
        draft.rawResponseTimes.push({
          [lastChar]: calculateResponseTime(initialState.startTime, statistics.lastKeyPressingTimestamp)
        });
        draft.responseTimes.push({
          [lastChar]: calculateResponseTime(initialState.startTime, statistics.lastCorrectStateTimestamp)
        });
        draft.typingCorrectionTime += draft.lastWrongStateTimestamp != 0 ? Date.now() - draft.lastWrongStateTimestamp : 0;
        draft.lastWrongStateTimestamp = 0;
      });

      setInitialState(draft => {
        draft.isWrongKeyLocked = false;
      });

    }

    if (!isCorrectSoFar &&
      !initialState.isWrongKeyLocked &&
      shouldCountCorrect(statistics.lockedText, localVarForInputBoxValue, statistics.correctPressedKeys.length) &&
      !isEnd
    ) {

      longestStreakLocalVar = 0;

      setStatistics(draft => {
        draft.wrongPressedKeys.push(
          targetText[statistics.lockedText.length + localVarForInputBoxValue.length - 1]
        );
        draft.lastWrongStateTimestamp = Date.now();
      });

      setInitialState(draft => {
        draft.isWrongKeyLocked = true;
      });

    }

    if (isCorrectSoFar) {

      setStatistics(draft => {
        draft.realTimeCorrectTextLen = statistics.lockedText.length + localVarForInputBoxValue.length;
        draft.lastCorrectStateTimestamp = Date.now();
      });
    }

}
