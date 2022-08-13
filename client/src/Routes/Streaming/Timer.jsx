import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';

function useInterval(callback, delay) {
  const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
    }
    if (delay !== null) {
      // 만약 delay가 null이 아니라면
      let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
    }
  }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
}

const TimerBox = styled.div``;

const Controls = styled.div``;

const Timer = forwardRef((props, ref) => {
  const [isPlay, setIsPlay] = useState(false);
  const [second, setSecond] = useState(0);
  const [timerInterval, setTimerInterval] = useState(0);

  const tick = () => {
    if (second > 0) {
      setSecond((sec) => sec - 1);
    }

    if (second === 0) {
      setIsPlay(false);
    }
  };

  const getTime = () => {
    setSecond(parseInt(props.delay));
  };

  const customInterval = useInterval(
    () => {
      tick();
    },
    isPlay ? 1000 : null,
  );

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    getTime();
  }, [props.delay]);

  useEffect(() => {
    if (second === 0) {
      clearInterval(timerInterval);
    }
  }, [second]);

  useEffect(() => {
    if (isPlay) {
      setTimerInterval(customInterval);
    }
  }, [isPlay]);

  const handleResetClick = () => {
    getTime();
  };

  const handlePauseClick = () => {
    setIsPlay(false);
    clearInterval(timerInterval);
  };

  const handlePlayClick = () => {
    setIsPlay(true);
  };

  useImperativeHandle(ref, () => ({
    handleResetClick,
    handlePlayClick,
  }));

  return (
    <>
      <TimerBox>{second < 10 ? `0${second}` : second}초</TimerBox>
    </>
  );
});

export default Timer;
