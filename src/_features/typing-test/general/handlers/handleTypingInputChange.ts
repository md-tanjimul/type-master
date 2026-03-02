import { ChangeEvent } from "react";
import { isInputCorrect, isTypingComplete, getLastChar, calculateResponseTime, shouldCountCorrect } from "../utils";

import { InitialState, Statistics } from "@/_features/typing-test/general/types";

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

    

    
    // console.log(statistics.rawResponseTimes);
    


    // if(isEnd){

    //     setInitialState(draft => {
    //       draft.isEnded = true;
    //     });
    // }



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

      // alert('wait...'); // important

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
        draft.listOfWrongPressedKeysIndex.push(statistics.realTimeCorrectTextLen);
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
