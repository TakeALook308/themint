import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

function SignContainer({ children }) {
  return (
    <RegisterContainer>
      <Header>
        <Logo />
        <h2>회원가입</h2>
      </Header>
      {children}
    </RegisterContainer>
  );
}

export default SignContainer;

const RegisterContainer = styled.section`
  min-width: 450px;
  height: fit-content;
  padding: 4rem 4rem;
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  gap: 2rem;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: 700;
`;
