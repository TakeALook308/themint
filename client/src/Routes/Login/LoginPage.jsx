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
import { postData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { successToast } from '../../lib/toast';
function LoginPage() {
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
    successToast(`${nickname}${LOGIN_MESSAGE.SUCCESS_LOGIN[makeRandomNumber()]}`);
    navigate('/main');
  };

  return (
    <>
      <Helmet>
        <title>로그인 | 더민트</title>
      </Helmet>
      <SignContainer pageName={PAGES.LOGIN}>
        <ThemintLogin login={{ setToken, login, setUserInfo, moveToMain, setLogged }} />
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

const makeRandomNumber = () => {
  const len = LOGIN_MESSAGE.SUCCESS_LOGIN.length;
  return Math.floor(Math.random() * len);
};
