import { useRef, useEffect } from "react";

// Typing the state setters for useImmer
type ImmerSetter<T> = (updater: (draft: T) => void) => void;

type countDownProps = {
    setTimeRemain: React.Dispatch<React.SetStateAction<number | null>>;
}

export function useCountDown({ setTimeRemain }: countDownProps) {
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = (initial: number) => {

    setTimeRemain(() => initial);


    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimeRemain(prev => {
        if (prev !== null && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(intervalRef.current!);
          return 0;
        }
      });
    }, 1000);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeRemain(() => null);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { start, reset };
}
