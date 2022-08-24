import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo200 from '../../assets/images/themint200.png';
import logo200webp from '../../assets/images/themint200.webp';

function Logo({ size }) {
  return (
    <LogoContainer size={size}>
      <Link to="/main" aria-label="메인페이지로 이동">
        <picture>
          <source srcSet={logo200webp} type="image/webp" />
          <img src={logo200} alt="더민트 로고" width="500" height="225" />
        </picture>
      </Link>
    </LogoContainer>
  );
}

export default Logo;

const LogoContainer = styled.h1`
  width: ${(props) => (props.size ? props.size : '100%')};
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
`;
