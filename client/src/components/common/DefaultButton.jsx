import React from 'react';
import styled from 'styled-components';

function DefaultButton({ title, widthValue, type, onClick }) {
  return (
    <Button widthValue={widthValue} type={type} onClick={onClick}>
      {title}
    </Button>
  );
}

export default DefaultButton;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.mainBlack};
  border-color: ${(props) => props.theme.colors.mainMint};
  border-width: 2px;
  color: ${(props) => props.theme.colors.mainMint};
  height: 35px;
  border-radius: 5px;
  padding: 0 1rem;
  width: ${(props) => props.widthValue || '450px'};
  cursor: pointer;
`;
