import React, { useState } from 'react';

import useInterval from 'components/hooks/useInterval';

type RawCountDownProps = {
  seconds: number;
};

const RawCountDown = ({ seconds }: RawCountDownProps) => {
  const [minutesCount, setMinutesCount] = useState(Math.floor(seconds / 60));
  const [secondsCount, setSecondsCount] = useState(seconds - Math.floor(seconds / 60) * 60);

  useInterval(() => {
    if (minutesCount > 0 || secondsCount > 0) {
      if (secondsCount > 0) {
        setSecondsCount(secondsCount - 1);
      }

      if (secondsCount === 0) {
        if (minutesCount !== 0) {
          setMinutesCount(minutesCount - 1);
          setSecondsCount(59);
        }
      }
    }
  }, 1000);

  return (
    <>
      {minutesCount < 10 ? `0${minutesCount}` : minutesCount}
      :
      {secondsCount < 10 ? `0${secondsCount}` : secondsCount}
    </>
  );
};

export default RawCountDown;
