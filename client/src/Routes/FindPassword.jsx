import React from 'react';
import { Helmet } from 'react-helmet';
import SignContainer from '../components/common/SignContainer';
import EmailCheck from '../components/findPassword/EmailCheck';

function FindPassword(props) {
  return (
    <>
      <Helmet>
        <title>비밀번호 찾기 | 더민트</title>
      </Helmet>
      <SignContainer>
        <EmailCheck />
        <Find
      </SignContainer>
    </>
  );
}

export default FindPassword;
