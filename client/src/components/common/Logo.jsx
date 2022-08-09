import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/themint.png';

function Logo() {
  return (
    <LogoContainer>
      <Link to="/main" aria-label="메인페이지로 이동">
        <img src={logo} alt="더민트 로고" width="168" height="76" />
      </Link>
    </LogoContainer>
  );
}

export default Logo;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
