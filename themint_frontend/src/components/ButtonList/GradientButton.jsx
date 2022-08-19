import React from 'react';
import styled, { keyframes } from 'styled-components';

function GradientButton({ text, type, onClick, size, disabled, fontsize }) {
  return (
    <Button type={type} onClick={onClick} size={size} disabled={disabled} fontsize={fontsize}>
      {text}
    </Button>
  );
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

export const Button = styled.button`
  width: ${(props) => (props.size ? props.size : '100%')};
  height: 40px;
  background: ${(props) => props.theme.colors.gradientMintToPurple};
  border-radius: 5px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => (props.fontsize ? props.fontsize : props.theme.fontSizes.h5)};
  font-weight: bold;
  cursor: pointer;
  background-size: 200% 200%;
  border-radius: 5px;
  transition: all 0.4s ease;
  &:hover {
    animation: ${shine} 3s infinite linear;
  }
  &:disabled {
    background: ${(props) => props.theme.colors.disabledGray};
    color: ${(props) => props.theme.colors.pointGray};
    cursor: not-allowed;
  }
`;
