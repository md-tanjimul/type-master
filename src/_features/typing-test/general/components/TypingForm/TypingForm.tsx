import { ChangeEvent, MouseEvent, useEffect, useRef } from "react";
import InputBox from "../InputBox/InputBox";
import { InitialState, Statistics, AllCharsAverageSpeedAndAccuracyByCategory } from "@/_features/typing-test/general/types";
import { useAutoFocusOnStart } from "../../hooks";
import { Keyboard, LogOut, PenLine, Play, RefreshCcw, Timer, Type } from "lucide-react";
import Countdown from "../Countdown/Countdown";
import { useImmer } from "use-immer";
import { useRouter } from "next/navigation";

// Typing the state setters for useImmer
type ImmerSetter<T> = (updater: (draft: T) => void) => void;


type HandleTypingInputChange = (
  e: ChangeEvent<HTMLTextAreaElement>,
  targetText: string,
  statistics: Statistics,
  setStatistics: ImmerSetter<Statistics>,
  initialState: InitialState,
  setInitialState: ImmerSetter<InitialState>,
  setTimeRemain: React.Dispatch<React.SetStateAction<number | null>>,
  inputBoxRef: React.RefObject<HTMLTextAreaElement | null>,
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>,
) => void;

type HandleTypingInputOnKeyDown = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  targetText: string,
  statistics: Statistics,
  setStatistics: ImmerSetter<Statistics>,
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>,
) => void;

type handleTypingInputOnClick = (
  e: React.MouseEvent<HTMLTextAreaElement>,
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>,
) => void;

type handleTypingInputOnKeyUp = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>,
) => void;



type HandleStartTyping = (
  // e: MouseEvent<HTMLButtonElement>,
  setInitialState: ImmerSetter<InitialState>
) => void;

type TypingFormProps = {
  initialState: InitialState;
  handleTypingInputChange: HandleTypingInputChange;
  handleTypingInputOnKeyDown: HandleTypingInputOnKeyDown;
  handleTypingInputOnClick: handleTypingInputOnClick;
  handleTypingInputOnKeyUp: handleTypingInputOnKeyUp;
  targetText: string;
  statistics: Statistics;
  setStatistics: ImmerSetter<Statistics>;
  setInitialState: ImmerSetter<InitialState>;
  setTimeRemain: React.Dispatch<React.SetStateAction<number | null>>;
  handleStartTyping: HandleStartTyping;
  fetchQuote: () => Promise<void>;
  setAllCharsAverageSpeedAndAccuracyByCategory: ImmerSetter<AllCharsAverageSpeedAndAccuracyByCategory>;
  isFetchingTargetText: boolean;
  isFetchingTargetTextDone: boolean;
  setInputBoxCaretPos: React.Dispatch<React.SetStateAction<number>>;
};

const TypingForm = ({
  initialState,
  handleTypingInputChange,
  handleTypingInputOnKeyDown,
  handleTypingInputOnClick,
  handleTypingInputOnKeyUp,
  targetText,
  statistics,
  setStatistics,
  setInitialState,
  setTimeRemain,
  handleStartTyping,
  fetchQuote,
  setAllCharsAverageSpeedAndAccuracyByCategory,
  isFetchingTargetText,
  isFetchingTargetTextDone,
  setInputBoxCaretPos
}: TypingFormProps) => {

  const [isStartAnimStarted, setIsStartAnimStarted] = useImmer(false);

  // Ref for the typing input box, used for programmatic focus
  const inputBoxRef = useRef<HTMLTextAreaElement>(null);


  const router = useRouter();

  useEffect(() => {
    let startTimeout: NodeJS.Timeout;
    let stopAnimTimeout: NodeJS.Timeout;

    const run = async () => {
      await fetchQuote();

      setIsStartAnimStarted(true);

      startTimeout = setTimeout(() => {
        handleStartTyping(setInitialState);
      }, 3000);

      stopAnimTimeout = setTimeout(() => {
        setIsStartAnimStarted(false);
      }, 5000);
    };

    run();

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(stopAnimTimeout);
    };
  }, []);




  useAutoFocusOnStart(initialState.isStarted, inputBoxRef);

  // Prevent form submit if endTime !== 0
  const onButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {


    if(initialState.isStarted == false && isFetchingTargetText == false && isStartAnimStarted == false){

      inputBoxRef.current && (inputBoxRef.current.value = "");

      await fetchQuote();

      // Reset stats
      setStatistics(draft => {
        draft.correctPressedKeys = [];
        draft.wrongPressedKeys = [];
        draft.listOfWrongPressedKeysIndex = [];
        draft.rawResponseTimes = [];
        draft.responseTimes = [];
        draft.typingCorrectionTime = 0;
        draft.lockedText = "";
        draft.inputBoxValue = '';
        draft.realTimeCorrectTextLen = 0;
        draft.lastKeyPressingTimestamp = 0,
        draft.lastCorrectStateTimestamp = 0;
        draft.lastWrongStateTimestamp = 0;
        draft.backspaceCount = 0;
        draft.longestStreak = 0;
        draft.individualHandAvgSpeedPercent = { left: 0, right: 0 };
      });

      // Reset character speed/accuracy by category
      setAllCharsAverageSpeedAndAccuracyByCategory(draft => {
        draft.uppercase = { speed: 0, accuracy: 0 };
        draft.lowercase = { speed: 0, accuracy: 0 };
        draft.digit = { speed: 0, accuracy: 0 };
        draft.punctuation = { speed: 0, accuracy: 0 };
        draft.symbol = { speed: 0, accuracy: 0 };
        draft.space = { speed: 0, accuracy: 0 };
        draft.leftHand = { speed: 0, accuracy: 0 };
        draft.rightHand = { speed: 0, accuracy: 0 };
      });

      // Reset initial state
      setInitialState(draft => {
        draft.startTime = 0;
        draft.endTime = 0;
        draft.isStarted = false;
        draft.isWrongKeyLocked = false;
      });

      setIsStartAnimStarted(true);

      setTimeout(()=>{

          handleStartTyping(setInitialState);

      }, 3000);

      setTimeout(()=>{
        setIsStartAnimStarted(false);
      }, 5000);

    }

    
    
  };

  



  return (
    <form className="flex flex-col">

      {
        isStartAnimStarted ? <Countdown /> : ''
      }

      <InputBox
        isDisabled={!initialState.isStarted || initialState.endTime !== 0}
        inputBoxRef={inputBoxRef}
        handleTypingInputChange={(e) =>
          handleTypingInputChange(
            e,
            targetText,
            statistics,
            setStatistics,
            initialState,
            setInitialState,
            setTimeRemain,
            inputBoxRef,
            setInputBoxCaretPos
          )
        }
        handleTypingInputOnKeyDown={ (e) => handleTypingInputOnKeyDown(e, targetText, statistics, setStatistics, setInputBoxCaretPos) }
        handleTypingInputOnClick={(e)=>{
          handleTypingInputOnClick(
            e,
            setInputBoxCaretPos
          )
        }}
        handleTypingInputOnKeyUp={(e)=>{
          handleTypingInputOnKeyUp(
            e,
            setInputBoxCaretPos
          )
        }}
      />
      {/* Explicitly set type="button" to prevent form submission */}
      
      {
        (initialState.isStarted == false && isFetchingTargetText == false && isStartAnimStarted == false) && isFetchingTargetTextDone ?

        <button type="button" onClick={onButtonClick} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex justify-center cursor-pointer">
          <RefreshCcw className="me-3" /> Try Another Practice
        </button> : ''
      }

      <button type="button" onClick={() => router.replace('/typing-test')} className="mt-6 px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition flex justify-center cursor-pointer">
        <LogOut className="me-3" /> Leave Practice
      </button>

    </form>
  );
};

export default TypingForm;
