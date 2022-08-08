import React from 'react';
import { Helmet } from 'react-helmet';
import SignContainer from '../components/common/SignContainer';

function FindPassword(props) {
  return (
    <>
      <Helmet>
        <title>비밀번호 찾기 | 더민트</title>
      </Helmet>
      <SignContainer>비밀번호 찾기</SignContainer>
    </>
  );
}

export default FindPassword;
