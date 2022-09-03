import React from 'react';
import styled from 'styled-components';

function MintButton({ text, type, onClick, size, disabled }) {
  return (
    <Button type={type} onClick={onClick} size={size} disabled={disabled}>
      {text}
    </Button>
  );
}

export default MintButton;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.subMint};
  height: 40px;
  width: ${(props) => (props.size ? props.size : '100%')};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.p};
  font-weight: 600;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:disabled {
    background-color: ${(props) => props.theme.colors.disabledGray};
    cursor: not-allowed;
  }
`;
