"use client"

import { useEffect } from "react";

export function useAutoFocusOnStart(
  isStarted: boolean,
  ref: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (isStarted && ref.current) {
      ref.current.focus();
    }
  }, [isStarted]);
}
