import React from 'react';
import { useSetRecoilState } from 'recoil';
import { loggedinState, myInformationState } from '../../atoms';
import SignContainer from '../../components/common/SignContainer';
import SocialLogginButton from '../../components/ButtonList/SocialLogginButton';
import Links from './Links';
import ThemintLogin from './ThemintLogin';
import { LOGIN_MESSAGE, PAGES } from '../../utils/constants/constant';
import { SocialLoginContainer } from '../Register/RegisterPage';
import { setCookie } from '../../utils/functions/cookies';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { Helmet } from 'react-helmet-async';
function LoginPage() {
  const login = async (userInfo) => {
    return await fetchData.post(userApis.LOGIN, userInfo);
  };

  return (
    <>
      <Helmet>
        <title>로그인 | 더민트</title>
      </Helmet>
      <SignContainer pageName={PAGES.LOGIN}>
        <ThemintLogin login={login} />
        <Links />
        <SocialLoginContainer>
          <SocialLogginButton text={'네이버 로그인'} social={'네이버'} />
          <SocialLogginButton text={'카카오톡 로그인'} social={'카카오톡'} />
        </SocialLoginContainer>
      </SignContainer>
    </>
  );
}

export default LoginPage;
