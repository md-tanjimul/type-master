import { CharCategory } from "@/_features/typing-test/general/types";

export function categorizeCharacter(char: string): CharCategory {
  if (/[A-Z]/.test(char)) return "uppercase";
  if (/[a-z]/.test(char)) return "lowercase";
  if (/[0-9]/.test(char)) return "digit";
  if (/[\p{P}]/u.test(char)) return "punctuation";
  if (/[\p{S}]/u.test(char)) return "symbol";
  return "space";
}