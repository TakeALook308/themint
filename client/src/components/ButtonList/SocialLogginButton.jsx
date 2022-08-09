import React from 'react';
import styled from 'styled-components';
import { Button } from '../ButtonList/GradientButton';

function SocialLogginButton({ text, social }) {
  return <SocialButton social={social}>{text}</SocialButton>;
}

export default SocialLogginButton;

const SocialButton = styled(Button)`
  background: ${(props) =>
    props.social === '네이버'
      ? 'linear-gradient(91.05deg, #58be80 0.16%, #107537 114.85%)'
      : 'linear-gradient(90.67deg, #FFDA7B 0.03%, #BF8E10 99.91%)'};
  font-size: ${(props) => props.theme.fontSizes.p};
`;
