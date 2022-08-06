import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { myInformationState } from '../atoms';
import SignContainer from '../components/common/SignContainer';
import SocialLogginButton from '../components/common/SocialLogginButton';
import Links from '../components/login/Links';
import ThemintLogin from '../components/login/ThemintLogin';
import { LOGIN_MESSAGE, PAGES } from '../utils/constants/constant';
import { SocialLoginContainer } from './Register';
import { setCookie } from '../utils/functions/cookies';
import { postData } from '../utils/api/api';
import { userApis } from '../utils/api/userApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login(props) {
  const [userInfo, setUserInfo] = useRecoilState(myInformationState);

  const navigate = useNavigate();

  const setToken = ({ accessToken }) => {
    setCookie('accessToken', accessToken, {
      path: '/',
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    });
  };

  const login = async (userInfo) => {
    return await postData(userApis.LOGIN, userInfo);
  };

  const moveToMain = (nickname) => {
    toast.success(`${nickname}${LOGIN_MESSAGE.SUCCESS_LOGIN}`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    navigate('/main');
  };

  return (
    <SignContainer pageName={PAGES.LOGIN}>
      <ThemintLogin login={{ setToken, login, setUserInfo, moveToMain }} />
      <Links />
      <SocialLoginContainer>
        <SocialLogginButton text={'네이버 로그인'} social={'네이버'} />
        <SocialLogginButton text={'카카오톡 로그인'} social={'카카오톡'} />
      </SocialLoginContainer>
    </SignContainer>
  );
}

export default Login;
