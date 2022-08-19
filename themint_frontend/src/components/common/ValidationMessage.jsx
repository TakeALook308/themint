import React from 'react';
import styled from 'styled-components';

function ValidationMessage({ text, state }) {
  return <Container state={state}>{text}</Container>;
}

export default ValidationMessage;

const Container = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) =>
    props.state === 'fail'
      ? props.theme.colors.pointRed
      : props.state === 'pass'
      ? props.theme.colors.pointBlue
      : props.theme.colors.white};
`;
