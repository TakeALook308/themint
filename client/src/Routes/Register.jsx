import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import * as Common from '../style/common';
import GradientButton from '../components/common/GradientButton';
import Logo from '../components/common/Logo';
import { Link } from 'react-router-dom';
import { Register1, Register2, Register3 } from '../register/RegisterIndex';
// import Register1 from '../register/Register1';

function Register() {
  const [userInfo, setUserInfo] = useState({
    memberId: '',
    memberName: '',
    nickname: '',
    pwd: '',
    email: '',
    address: '',
    phone: '',
  });
  const [step, setStep] = useState({
    step1: true,
    step2: false,
    step3: false,
  });

  console.log(userInfo);

  return (
    <Container nonMember={true}>
      <RegisterContainer>
        <Header>
          <Logo />
        </Header>
        <p>회원가입</p>
        {step.step1 && (
          <>
            <Register1 setUserInfo={setUserInfo} setStep={setStep} />
            <LinkContainer>
              <Link to="/login">
                <h2>로그인</h2>
              </Link>
            </LinkContainer>
            <div>or</div>
            <GradientButton text={'카카오톡으로 회원가입'} />
            <GradientButton text={'네이버로 회원가입'} />
          </>
        )}
        {step.step2 && <Register2 setUserInfo={setUserInfo} setStep={setStep} />}
      </RegisterContainer>
    </Container>
  );
}

export default Register;

const Container = styled(Common.Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterContainer = styled.div`
  min-width: 400px;
  height: fit-content;
  padding: 4rem 3rem;
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const LinkContainer = styled.div`
  width: 100%;
  h2 {
    margin: 0 auto;
    width: fit-content;
    text-decoration: underline;
  }
`;
