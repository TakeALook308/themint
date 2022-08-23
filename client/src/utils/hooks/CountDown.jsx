import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CountDown = ({ isAuthenticating, setIsAuthenticating }) => {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);

  useEffect(() => {
    if (isAuthenticating) {
      timerId.current = setInterval(() => {
        setMinutes(parseInt(time.current / 60));
        setSeconds(time.current % 60);
        time.current -= 1;
      }, 1000);
      return () => clearInterval(timerId.current);
    }
  }, [isAuthenticating]);

  useEffect(() => {
    if (isAuthenticating && time.current < 0) {
      clearInterval(timerId.current);
      setIsAuthenticating(false);
      time.current = 180;
    }
  }, [seconds, isAuthenticating]);

  return (
    <Container>
      {minutes}분 {seconds}초 후에 다시 시도해주세요.
    </Container>
  );
};

export default CountDown;

const Container = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
`;
