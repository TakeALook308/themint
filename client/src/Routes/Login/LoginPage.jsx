import React from 'react';
import SignContainer from '../../components/common/SignContainer';
import Links from './Links';
import ThemintLogin from './ThemintLogin';
import { PAGES } from '../../utils/constants/constant';
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
      </SignContainer>
    </>
  );
}

export default LoginPage;
