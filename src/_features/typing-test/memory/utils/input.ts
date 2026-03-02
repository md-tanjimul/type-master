export function isInputCorrect(target: string, locked: string, current: string) {
  return target.startsWith(locked + current);
}

export function isTypingComplete(target: string, locked: string, current: string) {
  return target === locked + current;
}

export function getLastChar(input: string): string {
  return input[input.length - 1];
}
