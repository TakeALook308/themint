import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myInformationState } from '../../atoms';
import { getData } from '../../utils/apis/api';
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

  const getUserData = async () => {
    const response = await getData(userApis.USER_INFORMATION(myInformation.memberSeq));
    return response?.data;
  };

  const myInformation = useRecoilValue(myInformationState);

  useEffect(() => {
    (async () => {
      const response = await getUserData();
      console.log(response);
      setUserAllInfo(response);
    })();
  }, []);

  return (
    <Container>
      <ProfileImage src={userAllInfo.profileUrl} />
      <InformationEdit />
    </Container>
  );
}

export default AccountsEditPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
