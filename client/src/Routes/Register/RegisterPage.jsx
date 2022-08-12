import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Register1, Register2, Register3 } from '.';
import { userApis } from '../../utils/apis/userApis';
import { fetchData } from '../../utils/apis/api';
import SocialLogginButton from '../../components/ButtonList/SocialLogginButton';
import SignContainer from '../../components/common/SignContainer';
import { LOGIN_MESSAGE, PAGES } from '../../utils/constants/constant';
import { setCookie } from '../../utils/functions/cookies';
import { toast } from 'react-toastify';
import { makeLoginMessageRandomNumber } from '../../utils/functions/util';
import { useSetRecoilState } from 'recoil';
import { loggedinState, myInformationState } from '../../atoms';
import { session } from '../../App';
import { Helmet } from 'react-helmet-async';

function RegisterPage() {
  const [userInfo, setUserInfo] = useState({
    memberId: '',
    memberName: '',
    nickname: '',
    pwd: '',
    email: '',
    address: '',
    addressDetail: '',
    zipCode: '',
    phone: '',
  });
  const [step, setStep] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const setUser = useSetRecoilState(myInformationState);
  const setLogged = useSetRecoilState(loggedinState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!step.step3) return;
    if (!userInfo.address) return;
    (async () => {
      try {
        const response = await register();
        console.log(response);
        const {
          data: { memberId, memberSeq, nickname, accessToken },
        } = response;
        setUser({ memberId, memberSeq, nickname });
        setToken({ accessToken });
        setLogged(true);
        moveToMain(nickname);
        session.set('profile', { memberId, memberSeq, nickname });
      } catch (err) {
        if (err.response.status === 409) {
          return;
        }
      }
    })();
  }, [userInfo, step]);

  const setToken = ({ accessToken }) => {
    setCookie('accessToken', accessToken);
  };

  const moveToMain = (nickname) => {
    toast.success(`${nickname}${LOGIN_MESSAGE.SUCCESS_LOGIN[makeLoginMessageRandomNumber()]}`, {
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

  const register = async () => {
    return await fetchData.post(userApis.REGISTER, userInfo);
  };

  return (
    <>
      <Helmet>
        <title>회원가입 | 더민트</title>
      </Helmet>
      <SignContainer pageName={PAGES.REGISTER}>
        {step.step1 && (
          <>
            <Register1 setUserInfo={setUserInfo} setStep={setStep} />
            <LinkContainer>
              <Link to="/login">
                <h2>로그인</h2>
              </Link>
            </LinkContainer>
            <SocialLoginContainer>
              <SocialLogginButton text={'네이버로 회원가입'} social={'네이버'} />
              <SocialLogginButton text={'카카오톡으로 회원가입'} social={'카카오톡'} />
            </SocialLoginContainer>
          </>
        )}
        {step.step2 && <Register2 setUserInfo={setUserInfo} setStep={setStep} />}
        {step.step3 && <Register3 setUserInfo={setUserInfo} setStep={setStep} />}
      </SignContainer>
    </>
  );
}

export default RegisterPage;

const LinkContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  a {
    position: relative;
    color: ${(props) => props.theme.colors.white};
    &:after {
      content: '';

      width: 100%;
      position: absolute;
      left: 0;
      bottom: -2px;

      border-width: 0 0 1px;
      border-style: solid;
    }
  }
`;

export const SocialLoginContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
