import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import * as Common from '../style/common';
import GradientButton from '../components/common/GradientButton';
import Logo from '../components/common/Logo';
import { Link } from 'react-router-dom';
import { Register1, Register2, Register3 } from '../register/RegisterIndex';
import { postData, userApis } from '../utils/api/userApi';
import SocialLogginButton from '../components/common/SocialLogginButton';
import SignContainer from '../components/common/SignContainer';
// import Register1 from '../register/Register1';

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

  const register = async () => {
    const response = await postData(userApis.REGISTER, userInfo);
  };

  return (
    <SignContainer>
      {step.step1 && (
        <>
          <Register1 setUserInfo={setUserInfo} setStep={setStep} />
          <LinkContainer>
            <Link to="/login">
              <h2>로그인</h2>
            </Link>
            <p>or</p>
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

const Container = styled(Common.Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const SocialLoginContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
