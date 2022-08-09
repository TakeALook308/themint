import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SignContainer from '../../components/common/SignContainer';
import EmailCheck from './EmailCheck';
import NewPassword from './NewPassword';
import { PAGES } from '../../utils/constants/constant';

function PasswordResetPage(props) {
  const [isPassed, setIsPassed] = useState(false);
  const [memberId, setMemberId] = useState('');
  return (
    <>
      <Helmet>
        <title>비밀번호 찾기 | 더민트</title>
      </Helmet>
      <SignContainer pageName={PAGES.FIND_PASSWORD}>
        {!isPassed ? (
          <EmailCheck setIsPassed={setIsPassed} memberId={memberId} setMemberId={setMemberId} />
        ) : (
          <NewPassword memberId={memberId} />
        )}
      </SignContainer>
    </>
  );
}

export default PasswordResetPage;
