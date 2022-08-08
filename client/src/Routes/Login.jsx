import React from 'react';
import { useSetRecoilState } from 'recoil';
import { loggedinState, myInformationState } from '../atoms';
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
import { toast } from 'react-toastify';
function Login() {
  const setUserInfo = useSetRecoilState(myInformationState);
  const setLogged = useSetRecoilState(loggedinState);
  const navigate = useNavigate();
  const setToken = ({ accessToken }) => {
    setCookie('accessToken', accessToken);
  };

  const login = async (userInfo) => {
    return await postData(userApis.LOGIN, userInfo);
  };

  const moveToMain = (nickname) => {
    toast.success(`${nickname}${LOGIN_MESSAGE.SUCCESS_LOGIN[makeRandomNumber()]}`, {
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
      <ThemintLogin login={{ setToken, login, setUserInfo, moveToMain, setLogged }} />
      <Links />
      <SocialLoginContainer>
        <SocialLogginButton text={'네이버 로그인'} social={'네이버'} />
        <SocialLogginButton text={'카카오톡 로그인'} social={'카카오톡'} />
      </SocialLoginContainer>
    </SignContainer>
  );
}

export default Login;

const makeRandomNumber = () => {
  const len = LOGIN_MESSAGE.SUCCESS_LOGIN.length;
  return Math.floor(Math.random() * len);
};
