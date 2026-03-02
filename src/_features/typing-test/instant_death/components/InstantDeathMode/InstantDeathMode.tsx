"use client"

import { useImmer } from 'use-immer';

// ----- Types importing -----

import {
  AllCharsAverageSpeedAndAccuracyByCategory,
  EachCharAverageSpeedByCategory,
  InitialState,
  Statistics
} from '@/_features/typing-test/instant_death/types';


// ----- handlers importing -----

import { handleStartTyping, handleTypingInputChange, handleTypingInputOnClick, handleTypingInputOnKeyDown, handleTypingInputOnKeyUp } from '../../handlers';

// ----- components importing -----

import HighlightedTargetText from "../HighlightedTargetText/HighlightedTargetText";
import TypingForm from "../TypingForm/TypingForm";
import SummaryCard from "../metrics/SummaryCard/SummaryCard";
import { useAverageSpeedAndAccuracyCalculation } from "../../hooks/useAverageSpeedAndAccuracyCalculation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import SpeedTimeline from '../metrics/SpeedTimeline/SpeedTimeline';
import SpeedAndAccuracy from '../metrics/SpeedAndAccuracy/SpeedAndAccuracy';
import { AlarmClock } from 'lucide-react';





// ----- Component -----

export default function InstantDeathMode({ mode }: { mode: string }) {

  // const [TARGET_TEXT, setTARGET_TEXT] = useState('');
  // const [isFetchingTargetText, setIsFetchingTargetText] = useState(false);

  // const fetchQuote = async () => {

  //   setIsFetchingTargetText(true); // Start loading

  //   try {
  //     const response = await axios.get('/api/quote'); // Axios auto-parses JSON

  //     // response.data is already the parsed object
  //     setTARGET_TEXT(response.data.quote);
  //   } catch (error) {
  //     console.error('Client-side fetch failed:', error);
  //     setTARGET_TEXT('Failure is just a step on the way to mastery.');
  //   } finally {
  //     setIsFetchingTargetText(false); // Stop loading
  //   }

  // };


  //.........................................
  // for our own serve code 

  const [TARGET_TEXT, setTARGET_TEXT] = useState('');
  const [isFetchingTargetText, setIsFetchingTargetText] = useState(false);
  const [isFetchingTargetTextDone, setIsFetchingTargetTextDone] = useState(false);

  const fetchQuote = async () => {
    setIsFetchingTargetText(true);
    try {
      const response = await axios.get('/api/quote');
      const { quote, author } = response.data;
      setTARGET_TEXT(quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setIsFetchingTargetText(false);
      setIsFetchingTargetTextDone(true);
    }
  };

  // for our own serve code 
  //..........................................





  useEffect(() => {

    // fetchQuote();

  }, []); // Empty dependency array ensures this runs once on mount and also we are using this as the initial TARGET_TEXT data fetching





    // const TARGET_TEXT = "There are no differences but differences of degree between different degrees of difference and no difference.";


  // const TARGET_TEXT = "Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They're not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can't do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do.";

  // const TARGET_TEXT = "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.";

  const [timeRemain, setTimeRemain] = useState<number | null>(null);

  const [inputBoxCaretPos, setInputBoxCaretPos] = useState<number>(0);

  const [initialState, setInitialState] = useImmer<InitialState>({
    startTime: 0,
    endTime: 0,
    isStarted: false,
    isWrongKeyLocked: false,
  });

  const [statistics, setStatistics] = useImmer<Statistics>({
    correctPressedKeys: [],
    wrongPressedKeys: [],
    rawResponseTimes: [],
    responseTimes: [],
    typingCorrectionTime: 0,
    lockedText: "",
    inputBoxValue: '',
    realTimeCorrectTextLen: 0,
    lastKeyPressingTimestamp: 0,
    lastCorrectStateTimestamp: 0,
    lastWrongStateTimestamp: 0,
    backspaceCount: 0,
    longestStreak: 0,
    individualHandAvgSpeedPercent: { left: 0, right: 0 },
  });

  const [eachCharAverageSpeedByCategory, setEachCharAverageSpeedByCategory] = useImmer<EachCharAverageSpeedByCategory>({
    uppercase: {},
    lowercase: {},
    digit: {},
    punctuation: {},
    symbol: {},
    space: {}
  });

  const [allCharsAverageSpeedAndAccuracyByCategory, setAllCharsAverageSpeedAndAccuracyByCategory] =
  useImmer<AllCharsAverageSpeedAndAccuracyByCategory>({
    uppercase: { speed: 0, accuracy: 0 },
    lowercase: { speed: 0, accuracy: 0 },
    digit: { speed: 0, accuracy: 0 },
    punctuation: { speed: 0, accuracy: 0 },
    symbol: { speed: 0, accuracy: 0 },
    space: { speed: 0, accuracy: 0 },
    leftHand: { speed: 0, accuracy: 0 },
    rightHand: { speed: 0, accuracy: 0 },
  });













  useAverageSpeedAndAccuracyCalculation(
    initialState.endTime !== 0,
    statistics,
    setAllCharsAverageSpeedAndAccuracyByCategory
  );


  // ----- JSX Render -----
  return (
    <>

      <h1 className="text-center text-3xl w-[60%] capitalize">{mode} Mode</h1>

      {
        initialState.endTime != 0 && (TARGET_TEXT.length > 0 && TARGET_TEXT.length !== statistics.lockedText.length) &&
        
        <div className="flex w-[60%] py-3 px-5 ms-5 my-4 rounded-lg p-4 mb-4 text-md text-red-800 bg-red-50">
          <AlarmClock className='me-2' /> Time's up! Don't worry, consistency creates success.
        </div>
      }

      {/* Displays the target text with highlighting for correct/incorrect input */}
      <HighlightedTargetText targetText={TARGET_TEXT} statistics={statistics} initialState={initialState} setInitialState={setInitialState} isStarted={initialState.isStarted} isFetchingTargetText={isFetchingTargetText} timeRemain={timeRemain} setTimeRemain={setTimeRemain} inputBoxCaretPos={inputBoxCaretPos}>
        

        {/* Typing input form and handlers */}
        <TypingForm
          initialState={initialState}
          handleTypingInputChange={handleTypingInputChange}
          handleTypingInputOnKeyDown={handleTypingInputOnKeyDown}
          handleTypingInputOnClick={handleTypingInputOnClick}
          handleTypingInputOnKeyUp={handleTypingInputOnKeyUp}
          targetText={TARGET_TEXT}
          statistics={statistics}
          setStatistics={setStatistics}
          setInitialState={setInitialState}
          setTimeRemain={setTimeRemain}
          handleStartTyping={handleStartTyping}
          fetchQuote={fetchQuote}
          setAllCharsAverageSpeedAndAccuracyByCategory={setAllCharsAverageSpeedAndAccuracyByCategory}
          isFetchingTargetText={isFetchingTargetText}
          isFetchingTargetTextDone={isFetchingTargetTextDone}
          setInputBoxCaretPos={setInputBoxCaretPos}
        />

      </HighlightedTargetText>

      <SummaryCard
        targetText={TARGET_TEXT}
        initialState={initialState}
        statistics={statistics}
        allCharsAverageSpeedAndAccuracyByCategory={allCharsAverageSpeedAndAccuracyByCategory}
        timeRemain={timeRemain}
      />

      {TARGET_TEXT.length === statistics.lockedText.length && initialState.endTime !== 0 && (
        <SpeedAndAccuracy allCharsAverageSpeedAndAccuracyByCategory={allCharsAverageSpeedAndAccuracyByCategory} />
      )}
      

      {TARGET_TEXT.length === statistics.lockedText.length && initialState.endTime !== 0 && (
        <SpeedTimeline 
          initialState={initialState}
          statistics={statistics}
        />
      )}

      <br />
      <br />
      <br />
      

    </>
  );
}