import { redirect } from "next/navigation";
import { categorizeCharacter } from "../utils";
import { Statistics } from "../types";
import { setPracticeFeedback } from "@/_shared/utils/setPracticeFeedback";



export const handleKeyValidation = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  statistics: Statistics,
  capsLockIndexes: number[],
  targetText: string,
  currentIndex: number,
  shiftSide: "left" | "right",
  LEFT_HAND_CHARS: Set<string>,
  RIGHT_HAND_CHARS: Set<string>
) => {
  
  const key = e.key;
  const expectedChar = targetText[statistics.realTimeCorrectTextLen];
  const isCapsLockOn = e.getModifierState("CapsLock");
  const isCorrectKey = key === expectedChar;

  if (!isCorrectKey) return;

  const isUpper = expectedChar === expectedChar.toUpperCase();
  const isLower = expectedChar === expectedChar.toLowerCase();
  const isInCapsLockSequence = capsLockIndexes.includes(statistics.realTimeCorrectTextLen);

  if (isInCapsLockSequence) {
    if (!isCapsLockOn) {

      setPracticeFeedback(
        `
            
            <p class="text-gray-800 mb-3">
              <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Caps Lock</kbd> was not enabled when typing more than two consecutive uppercase letters.
            </p>
            
            <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
              <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
            </div>

            `,
            "strict"
      );

      setTimeout(()=>{
        redirect('/typing-test');
      }, 700);
    }
    return;
  }

  // Not inside a caps lock sequence
  if (isCapsLockOn && isUpper) {
    
    if(categorizeCharacter(e.key) === 'digit')
    {

      setPracticeFeedback(
        `
            
            <p class="text-gray-800 mb-3">
              <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Caps Lock</kbd> was on while typing digits.
            </p>
            
            <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
              <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
            </div>

            `,
            "strict"
      );

    }
    else if(categorizeCharacter(e.key) === 'punctuation')
    {
      
      setPracticeFeedback(
        `
            
            <p class="text-gray-800 mb-3">
              <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Caps Lock</kbd> was on while typing punctuation.
            </p>
            
            <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
              <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
            </div>

            `,
            "strict"
      );

    }
    else if(categorizeCharacter(e.key) === 'symbol')
    {
      
      setPracticeFeedback(
        `
            
            <p class="text-gray-800 mb-3">
              <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Caps Lock</kbd> was on while typing symbols.
            </p>
            
            <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
              <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
            </div>

            `,
            "strict"
      );

    }
    else if(categorizeCharacter(e.key) === 'space')
    {
      
      setPracticeFeedback(
        `
            
            <p class="text-gray-800 mb-3">
              <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Caps Lock</kbd> was on while typing spaces.
            </p>
            
            <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
              <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
            </div>

            `,
            "strict"
      );

    }
    else
    {
      
      setPracticeFeedback(
        `
            
            <p class="text-gray-800 mb-3">
              <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Caps Lock</kbd> was on, but fewer than three consecutive letters were uppercase.
            </p>
            
            <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
              <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
            </div>

            `,
            "strict"
      );
      
    }

    setTimeout(()=>{
        redirect('/typing-test');
      }, 700);
  } else if (isCapsLockOn && isLower) {

    setPracticeFeedback(
        `
            
          <p class="text-gray-800 mb-3">
            <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Caps Lock</kbd> was on while typing lowercase letters.
          </p>
            
          <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
            <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
          </div>

        `,
        "strict"
    );

    setTimeout(()=>{
        redirect('/typing-test');
      }, 700);
  } else if (e.shiftKey) {
    const expectedCharLower = expectedChar.toLowerCase();

    if (LEFT_HAND_CHARS.has(expectedCharLower) && shiftSide === "left") {

      setPracticeFeedback(
        `
            
          <p class="text-gray-800 mb-3">
            The left <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Shift</kbd> was used for a left-side character.
          </p>
            
          <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
            <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
          </div>

        `,
        "strict"
      );

      setTimeout(()=>{
        redirect('/typing-test');
      }, 700);
    } else if (RIGHT_HAND_CHARS.has(expectedCharLower) && shiftSide === "right") {

      setPracticeFeedback(
        `
            
          <p class="text-gray-800 mb-3">
            The right <kbd class="bg-slate-300 px-2 py-1 rounded-md shadow-sm text-xs">Shift</kbd> was used for a right-side character.
          </p>
            
          <div class="text-sm font-mono bg-gray-100 p-3 rounded mb-4">
            <span class="text-green-600">${ targetText.slice(0, statistics.realTimeCorrectTextLen) }</span><span class="bg-red-200 text-red-700">${ targetText[statistics.realTimeCorrectTextLen] }</span><span class="text-gray-400">${ targetText.slice(statistics.realTimeCorrectTextLen + 1, targetText.length) }</span>
          </div>

        `,
        "strict"
      );

      setTimeout(()=>{
        redirect('/typing-test');
      }, 700);
    }
  }
};