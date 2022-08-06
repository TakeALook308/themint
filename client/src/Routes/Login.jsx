import React, { useState } from 'react';
import SignContainer from '../components/common/SignContainer';
import SocialLogginButton from '../components/common/SocialLogginButton';
import Links from '../components/login/Links';
import ThemintLogin from '../components/login/ThemintLogin';
import { PAGES } from '../utils/constants/constant';
import { SocialLoginContainer } from './Register';

function Login(props) {
  const [loginInfo, setLoginInfo] = useState({
    memberId: '',
    pwd: '',
  });
  return (
    <SignContainer pageName={PAGES.LOGIN}>
      <ThemintLogin />
      <Links />
      <SocialLoginContainer>
        <SocialLogginButton text={'네이버 로그인'} social={'네이버'} />
        <SocialLogginButton text={'카카오톡 로그인'} social={'카카오톡'} />
      </SocialLoginContainer>
    </SignContainer>
  );
}

export default Login;
