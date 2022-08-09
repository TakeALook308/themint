import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Links() {
  return (
    <Container>
      <Link to="/register">회원가입</Link>
      <Link to="/help/password">비밀번호 찾기</Link>
    </Container>
  );
}

export default Links;

const Container = styled.article`
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
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
