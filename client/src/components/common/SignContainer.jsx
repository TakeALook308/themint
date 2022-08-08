import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import * as Common from '../../style/common';

function SignContainer({ children, pageName }) {
  return (
    <Container nonMember={true}>
      <RegisterContainer>
        <Header>
          <Logo />
          <h2>{pageName}</h2>
        </Header>
        {children}
      </RegisterContainer>
    </Container>
  );
}

export default SignContainer;

const Container = styled(Common.Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
