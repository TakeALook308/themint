import React from 'react';
import styled from 'styled-components';

function StepSignal({ step }) {
  return (
    <Container>
      <Step active={'register2' === step}></Step>
      <Step active={'register3' === step}></Step>
    </Container>
  );
}

export default StepSignal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Step = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? props.theme.colors.subMint : props.theme.colors.disabledGray};
`;
