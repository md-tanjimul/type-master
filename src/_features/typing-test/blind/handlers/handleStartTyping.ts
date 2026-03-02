import { getStartedState } from "../utils";

export function handleStartTyping(
  // e: React.MouseEvent<HTMLButtonElement>,
  setInitialState: (updater: (draft: any) => void) => void
) {
  // e.preventDefault();

  const state = getStartedState();
  setInitialState((draft) => {
    draft.startTime = state.startTime;
    draft.isStarted = state.isStarted;
  });
}
