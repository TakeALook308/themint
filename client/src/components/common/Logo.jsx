import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/themint.png';

function Logo() {
  return (
    <h1>
      <Link to="/main" aria-label="메인페이지로 이동">
        <img src={logo} alt="더민트 로고" width="168" height="76" />
      </Link>
    </h1>
  );
}

export default Logo;
