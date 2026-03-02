import { Statistics } from "@/_features/typing-test/hardcore/types";
import { InitialState } from "../../hardcore/types";
import { handleKeyValidation } from "./handleKeyValidation";

// Typing the state setters for useImmer
type ImmerSetter<T> = (updater: (draft: T) => void) => void;


// Define which characters are typed with the left and right hands
const LEFT_HAND_CHARS = new Set(['`', '~', '1', '2', '3', '4', '5', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b']);

const RIGHT_HAND_CHARS = new Set(['6', '7', '8', '9', '0', '-', '=', '^', '&', '*', '(', ')', '_', '+', 'y', 'u', 'i', 'o', 'p', '[', ']', '{', '}', 'h', 'j', 'k', 'l', ';', ':', "'", '"', '\\', '|', 'n', 'm', ',', '.', '/', '<', '>', '?']);

let shiftSide: "left" | "right";
let ctrlSide: "left" | "right";


export function handleTypingInputOnKeyDown(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  targetText: string,
  statistics: Statistics,
  setStatistics: ImmerSetter<Statistics>,
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>,
) {


  if(targetText.startsWith(statistics.lockedText + statistics.inputBoxValue + e.key) === false && e.key !== ' '){
    const caret = e.currentTarget.selectionStart ?? 0;
    setInputBoxCaretPos(caret);
  }




  if(sessionStorage.getItem('practiceModeFeedback') !== null) return;

  if(e.code === 'ShiftLeft') shiftSide = 'left';
  if(e.code === 'ShiftRight') shiftSide = 'right';
  if(e.code === 'ControlLeft') ctrlSide = 'left';
  if(e.code === 'ControlRight') ctrlSide = 'right';

  var currentIndex = targetText[statistics.realTimeCorrectTextLen] == e.key ? statistics.realTimeCorrectTextLen : statistics.realTimeCorrectTextLen - 1;


  handleKeyValidation(
    e,
    statistics,
    statistics.capsLockIndexes,
    targetText,
    currentIndex,
    shiftSide,
    LEFT_HAND_CHARS,
    RIGHT_HAND_CHARS,
  ); 

  
  
  // backspace counting

  if(e.key === 'Backspace'){
    
    setStatistics(draft => {
      draft.backspaceCount += 1;
    })
    
  }


}