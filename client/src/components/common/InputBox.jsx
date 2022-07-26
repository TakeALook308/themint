import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.pointBlack};
  height: 35px;
  border: none;
  border-radius: 5px;
  padding: 5px;
  color: ${(props) => props.theme.colors.white};
  width: ${(props) => props.widthValue || '100%'};
`;

const Title = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
  padding: 5px;
`;

function InputBox({ text, type, placeholder, widthValue }) {
  return (
    <div>
      <Title>{text}</Title>
      <Input type={type} placeholder={placeholder} widthValue={widthValue}></Input>
    </div>
  );
}

export default InputBox;
