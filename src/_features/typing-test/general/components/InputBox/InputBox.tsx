import { RefObject } from "react";
import { handleTypingInputOnClick } from "../../handlers";

type InputBoxProps = {
  isDisabled: boolean;
  inputBoxRef: RefObject<HTMLTextAreaElement | null>;
  handleTypingInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTypingInputOnKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleTypingInputOnClick: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  handleTypingInputOnKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const InputBox = ({
  isDisabled,
  inputBoxRef,
  handleTypingInputChange,
  handleTypingInputOnKeyDown,
  handleTypingInputOnClick,
  handleTypingInputOnKeyUp
}: InputBoxProps) => {
  return (
    <textarea
      disabled={isDisabled}
      ref={inputBoxRef}
      onChange={handleTypingInputChange}
      onKeyDown={handleTypingInputOnKeyDown}
      onClick={handleTypingInputOnClick}
      onKeyUp={handleTypingInputOnKeyUp}
      className="w-full resize-none px-2 py-1 rounded-xs !bg-slate-50 !outline-0 focus:!outline-2 focus:!outline-blue-100"
      
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      data-gramm="false"
      data-lt-active="false"
      data-enable-grammarly="false"
      data-ms-editor="false"
    />
  );
};

export default InputBox;
