import styled from 'styled-components';
import React from 'react';

function InputBox({ text, type, placeholder, widthValue }) {
  return (
    <div>
      <Label>{text}</Label>
      <Input type={type} placeholder={placeholder} widthValue={widthValue}></Input>
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

const Label = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
  padding: 5px;
`;

export default InputBox;
