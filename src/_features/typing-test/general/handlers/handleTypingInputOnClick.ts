
export function handleTypingInputOnClick(
  e: React.MouseEvent<HTMLTextAreaElement>,
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>,
) {

  const caret = e.currentTarget.selectionStart ?? 0;
  setInputBoxCaretPos(caret);

}
