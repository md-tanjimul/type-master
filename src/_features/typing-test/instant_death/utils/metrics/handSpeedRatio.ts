const getHandSpeedRatio = (leftSpeed: number, rightSpeed: number, isComplete: boolean): string => {
  
  const leftAndRightSpeed = leftSpeed + rightSpeed;
  const leftRatio = isComplete ? Math.round(((100 / leftAndRightSpeed) * leftSpeed)) : 0;
  const rightRatio = isComplete ? Math.round(((100 / leftAndRightSpeed) * rightSpeed)) : 0;
  
  return ` Left : ${leftRatio}% | Right : ${rightRatio}%`
}

export const handSpeedRatio = (leftSpeed: number, rightSpeed: number, isComplete: boolean): string => {

  return getHandSpeedRatio(leftSpeed, rightSpeed, isComplete)

};