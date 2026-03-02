import { Statistics } from "@/_features/typing-test/memory/types";

// Typing the state setters for useImmer
type ImmerSetter<T> = (updater: (draft: T) => void) => void;

export function handleTypingInputOnKeyDown(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  statistics: Statistics,
  setStatistics: ImmerSetter<Statistics>
) {
  
  // backspace counting

  if(e.key == 'Backspace'){
    
    setStatistics(draft => {
      draft.backspaceCount += 1;
    })
    
  }


}