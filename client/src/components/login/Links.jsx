import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Links() {
  return (
    <Container>
      <Link to="/register">회원가입</Link>
      <Link to="/">비밀번호 찾기</Link>
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
    text-decoration: underline;
    line-height: 2.5;
  }
`;
