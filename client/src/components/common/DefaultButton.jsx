import React from 'react';
import styled from 'styled-components';

function DefaultButton({ title, widthValue }) {
  return <Button widthValue={widthValue}>{title}</Button>;
}

export default DefaultButton;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.mainBlack};
  border-color: ${(props) => props.theme.colors.mainMint};
  border-width: 2px;
  color: ${(props) => props.theme.colors.mainMint};
  height: 35px;
  border-radius: 5px;
  margin: 5px;
  width: ${(props) => props.widthValue || '450px'};
`;
