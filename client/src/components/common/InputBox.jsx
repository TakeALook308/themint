import styled from 'styled-components';
import React from 'react';

function InputBox({ text, type, widthValue }) {
  return (
    <div>
      <Input type={type} widthValue={widthValue}></Input>
      <Label>{text}</Label>
    </div>
  );
}

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.pointBlack};
  height: 35px;
  border: none;
  border-radius: 5px;
  padding: 5px;
  color: ${(props) => props.theme.colors.white};
  width: ${(props) => props.widthValue || '100%'};
`;

const Label = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
  position: absolute;
  left: 0;
  padding: 10px;
  pointer-events: none;
  color: ${(props) => props.theme.colors.textGray};
`;

export default InputBox;
