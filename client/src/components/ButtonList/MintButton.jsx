import React from 'react';
import styled from 'styled-components';

function MintButton({ text, type, onClick, size }) {
  return (
    <Button type={type} onClick={onClick} size={size}>
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
`;
