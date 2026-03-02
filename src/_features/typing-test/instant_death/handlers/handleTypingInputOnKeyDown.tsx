import { Statistics } from "@/_features/typing-test/instant_death/types";

// Typing the state setters for useImmer
type ImmerSetter<T> = (updater: (draft: T) => void) => void;

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

  
  // backspace counting

  if(e.key == 'Backspace'){
    
    setStatistics(draft => {
      draft.backspaceCount += 1;
    })
    
  }


}