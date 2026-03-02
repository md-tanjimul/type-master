export const setPracticeFeedback = (msg: string, mode: string) => {

  sessionStorage.setItem("practiceModeFeedback", JSON.stringify({
        feedback: msg,
        modeName: mode
      }));

}