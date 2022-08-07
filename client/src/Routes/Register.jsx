import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Register1, Register2, Register3 } from '../components/register/RegisterIndex';
import { userApis } from '../utils/api/userApi';
import { postData } from '../utils/api/api';
import SocialLogginButton from '../components/common/SocialLogginButton';
import SignContainer from '../components/common/SignContainer';
import { LOGIN_MESSAGE, PAGES } from '../utils/constants/constant';
import { setCookie } from '../utils/functions/cookies';
import { toast } from 'react-toastify';
import { makeLoginMessageRandomNumber } from '../utils/functions/util';
import { useRecoilState } from 'recoil';
import { loggedinState, myInformationState } from '../atoms';
import { session } from '../App';

function Register() {
  const [userInfo, setUserInfo] = useState({
    memberId: '',
    memberName: '',
    nickname: '',
    pwd: '',
    email: '',
    address: '',
    addressDetail: '',
    phone: '',
  });
  const [step, setStep] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const [user, setUser] = useRecoilState(myInformationState);
  const [logged, setLogged] = useRecoilState(loggedinState);
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
    return await postData(userApis.REGISTER, userInfo);
  };

  return (
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
  );
}

export default Register;

const LinkContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  h2 {
    margin: 0 auto;
    width: fit-content;
    text-decoration: underline;
  }
`;

export const SocialLoginContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
