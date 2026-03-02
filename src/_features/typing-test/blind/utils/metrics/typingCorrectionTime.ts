import { timeFormat } from "@/_shared/utils";

export const typingCorrectionTime = (typingCorrectionTime: number, isComplete: boolean): string => {
    return isComplete ? timeFormat(Math.round(typingCorrectionTime / 1000)) : '00:00'
}