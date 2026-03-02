import './styles.css'
import { Statistics } from "@/_features/typing-test/general/types";
import { LoaderCircle } from 'lucide-react'
import { useCountDown } from '../../hooks/useCountDown';
import { useEffect, useRef, useState } from 'react';
import { InitialState } from '@/_features/typing-test/general/types';
import { timeFormat } from '@/_shared/utils';
import { getCommonPrefixLength } from '@/_shared/utils/getCommonPrefixLength';
import { cn } from '@/lib/utils';

// Typing the state setters for useImmer
type ImmerSetter<T> = (updater: (draft: T) => void) => void;

type HighlightedTargetTextProps = {
    targetText: string,
    statistics: Statistics,
    initialState: InitialState,
    setInitialState: ImmerSetter<InitialState>;
    isStarted: boolean,
    isFetchingTargetText: boolean,
    children?: React.ReactNode,
    timeRemain: number | null;
    setTimeRemain: React.Dispatch<React.SetStateAction<number | null>>;
    inputBoxCaretPos: number;
}

const HighlightedTargetText = ({ targetText, statistics, initialState, setInitialState, isStarted, isFetchingTargetText, children, timeRemain, setTimeRemain, inputBoxCaretPos }: HighlightedTargetTextProps) => {

    const [caretXR, setCaretXR] = useState<number | null>(null);
    const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });
    const [caretLastMoveTimestamp, setCaretLastMoveTimestamp] = useState<number>(0);
    const targetTextRefs = useRef<HTMLSpanElement[]>([]);
    const containerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      const containerEl = containerRef.current;

      if (!containerEl) return;

      // Case 1: nothing typed yet
      if (statistics.lockedText.length + statistics.inputBoxValue.length === 0) {
        setCaretPos({ x: 0, y: 0 });
        return;
      }

      // Case 2: typing finished
      if (caretXR !== null) {
        if (initialState.endTime !== 0) {
          setCaretPos((prev) => ({ x: caretXR, y: prev.y }));
          return;
        } else if (targetText.length <= statistics.lockedText.length + inputBoxCaretPos) {
          // alert();
          setCaretPos((prev) => ({ x: caretXR, y: prev.y }));
          return;
        }
      }


      // Otherwise: position caret after the last typed character
      const index = statistics.lockedText.length + inputBoxCaretPos < targetText.length ? statistics.lockedText.length + inputBoxCaretPos : targetText.length - 1;
      const charEl = targetTextRefs.current[index];
      if (!charEl) return;

      const charRect = charEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      setCaretLastMoveTimestamp(Date.now());

      setCaretPos({
        x: charRect.left - containerRect.left,
        y: charRect.top - containerRect.top,
      });

      // Store "right" position for caret positioning in the ending
      if (targetText.length - 1 <= statistics.lockedText.length + inputBoxCaretPos) {
        setCaretXR(charRect.right - containerRect.left);
        return;
      }

    }, [statistics, initialState, caretXR, inputBoxCaretPos]);





  const lockedLen = statistics.lockedText.length;

  // Pre-calculate the next word after locked text
  const remainingText = targetText.slice(lockedLen);
  const nextWordLen = remainingText.split(" ")[0]?.length || 0;
  const nextWord = targetText.substring(lockedLen, lockedLen + nextWordLen);



  const { start, reset } = useCountDown({ setTimeRemain });

  /* ........... static WPM setup starts ............. */

  const minWPM = 5;

  const timeLimitBasedOnMinWPM = Math.round(((targetText.length / 5 / minWPM) * 60));

  /* ........... static WPM setup ends ............. */

  useEffect(()=>{
    if(isStarted){
      start(timeLimitBasedOnMinWPM);
    }
  }, [isStarted]);
  
  useEffect(()=>{
    
    if(timeRemain !== null && timeRemain <= 0 && initialState.endTime === 0){

      setInitialState(draft => {
          draft.endTime = Date.now();
          draft.isStarted = false;
      });

      // alert("Time's Up!");
    }

  }, [timeRemain]);

  return (

    <>

    <div className="w-[60%] py-3 px-5 ms-5 my-4 rounded-lg border border-blue-100">

      <div className="w-full flex justify-between text-md">
        <span className="bg-slate-50 px-2 rounded-sm text-md">Type the text below : { (timeRemain !== 0 && timeRemain !== null && targetText.length !== statistics.lockedText.length) && timeFormat(timeRemain) } </span>
        <span className="bg-slate-50 px-2 rounded-sm text-md">{ `${statistics.realTimeCorrectTextLen} / ${targetText.length} characters` }</span>
      </div>

      {

        isFetchingTargetText ? <LoaderCircle className="animate-spin inline-block my-3" /> :

        <h1
          ref={containerRef}
          className="leading-loose tracking-wide text-lg font-semibold text-gray-800 relative rounded-lg my-3"
        >
          {targetText.split("").map((ch, i) => {
            let className = '';
            if (
              i < statistics.lockedText.length ||
              i < statistics.lockedText.length + getCommonPrefixLength(nextWord, statistics.inputBoxValue)
            ) {
              className = `text-green-600`;
            } else if (i < statistics.lockedText.length + statistics.inputBoxValue.length) {
              className = "bg-red-300 text-white";
            }

            return (
              <span
                key={i}
                ref={(el) => {
                  if (el) targetTextRefs.current[i] = el;
                }}
                className={className}
              >
                {ch}
              </span>
            );
          })}

          {
            initialState.isStarted &&
            
            <span
              className={cn('caret', Date.now() - caretLastMoveTimestamp < 150 && 'moving')}
              style={{
                left: caretPos.x,
                top: caretPos.y === 0 ? '0.33em' : caretPos.y,
              }}
            />
          }

        </h1>

      }

      { children }

    </div>

    </>
    
  );
};

export default HighlightedTargetText;