import React from 'react';
import styled, { keyframes } from 'styled-components';

function GradientButton({ text, func }) {
  return <Button type="submit">{text}</Button>;
}

export default GradientButton;

const shine = keyframes`
   0% {
     background-position: 0% 50%;
     }
   50% {
     background-position: 100% 50%;
     }
   100% {
     background-position: 0% 50%;
     }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background: ${(props) => props.theme.colors.gradientMintToPurple};
  border-radius: 5px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: bold;
  cursor: pointer;
  background-size: 200% 200%;
  border-radius: 5px;
  transition: all 0.4s ease;
  &:hover {
    animation: ${shine} 3s infinite linear;
  }
`;
