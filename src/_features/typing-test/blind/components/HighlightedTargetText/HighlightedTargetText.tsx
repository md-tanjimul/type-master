import './styles.css'
import { InitialState, Statistics } from "@/_features/typing-test/blind/types";
import { LoaderCircle } from 'lucide-react'
import { useCountDown } from '../../hooks/useCountDown';
import { useEffect } from 'react';
import { timeFormat } from '@/_shared/utils';


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
}

const HighlightedTargetText = ({ targetText, statistics, initialState, setInitialState, isStarted, isFetchingTargetText, children, timeRemain, setTimeRemain }: HighlightedTargetTextProps) => {

  const { start, reset } = useCountDown({ setTimeRemain });

  /* ........... static WPM setup starts ............. */

  const minWPM = 30;

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

      <h1 className="leading-loose text-lg font-semibold text-gray-800 relative rounded-lg my-3">

        {

          targetText.split("").map((item, index) => {
                let className = '';
                if ( index < statistics.lockedText.length && targetText.length !== statistics.lockedText.length ) {
                    className = `bg-green-400 text-white`;
                } else if (index < statistics.lockedText.length + statistics.inputBoxValue.length && targetText.startsWith(statistics.lockedText + statistics.inputBoxValue) === false && statistics.inputBoxValue.includes(' ') ) {
                    className = "bg-red-300 text-white";
                }else if(targetText.length === statistics.lockedText.length){
                    className = `text-green-500`;
                }
                return className ? (
                    <span key={index} className={`${className}`}>
                        {item}
                    </span>
                    ) : (
                    <span>{ item }</span>
                );
          })

        }


      </h1>

      }

      { children }

    </div>

    </>
    
  );
};

export default HighlightedTargetText;