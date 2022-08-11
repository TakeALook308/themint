import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myInformationState } from '../../atoms';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import InformationEdit from './InformationEdit';
import ProfileImage from './ProfileImage';

function AccountsEditPage(props) {
  const [userAllInfo, setUserAllInfo] = useState({
    memberId: '',
    memberName: '',
    nickname: '',
    email: '',
    address: '',
    phone: '',
    profileUrl: '',
    account: '',
    noticeKakao: '',
    noticeEmail: '',
    score: '',
  });

  console.log(userAllInfo);
  const getUserData = async () => {
    const response = await fetchData.get(userApis.USER_INFORMATION(myInformation.memberSeq));
    return response?.data;
  };

  const myInformation = useRecoilValue(myInformationState);

  useEffect(() => {
    (async () => {
      const response = await getUserData();
      setUserAllInfo(response);
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>회원 정보 수정 | 더민트</title>
      </Helmet>
      <Container>
        <ProfileImage userAllInfo={userAllInfo} setUserAllInfo={setUserAllInfo} />
        <InformationEdit userAllInfo={userAllInfo} setUserAllInfo={setUserAllInfo} />
      </Container>
    </>
  );
}

export default AccountsEditPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
