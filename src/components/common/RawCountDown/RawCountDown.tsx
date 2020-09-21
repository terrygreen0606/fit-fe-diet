import React, { useState, useEffect } from 'react';

type RawCountDownProps = {
  seconds: number;
};

const RawCountDown = ({ seconds }: RawCountDownProps) => {
  const [minutesCount, setMinutesCount] = useState(Math.floor(seconds / 60));
  const [secondsCount, setSecondsCount] =  useState(seconds - Math.floor(seconds / 60) * 60);

  useEffect(() => {
    let timer = null;

    if (minutesCount > 0 || secondsCount > 0) {
      timer = setInterval(() => {  
        if (secondsCount > 0) {
          setSecondsCount(secondsCount - 1);
        }

        if (secondsCount === 0) {
          if (minutesCount === 0) {
            clearInterval(timer);
          } else {
            setMinutesCount(minutesCount - 1);
            setSecondsCount(59);
          }
        } 
      }, 1000);
    }
    
    return () => {
      if (minutesCount > 0 || secondsCount > 0) {
        clearInterval(timer);
      }
    };
  });

  return (
    <>
      {minutesCount < 10 ? `0${minutesCount}` : minutesCount}:{secondsCount < 10 ? `0${secondsCount}` : secondsCount}
    </>
  );
};

export default RawCountDown;
