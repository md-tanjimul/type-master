
export function handleTypingInputOnKeyUp(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>,
) {

  if(e.key !== ' '){
    const caret = e.currentTarget.selectionStart ?? 0;
    setInputBoxCaretPos(caret);
  }
  
}
