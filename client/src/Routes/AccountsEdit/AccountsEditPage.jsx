import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { getUserSelector, myInformationState } from '../../atoms';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import InformationEdit from './InformationEdit';
import ProfileImage from './ProfileImage';

function AccountsEditPage(props) {
  const queryClient = useQueryClient();

  const userAllInfo = queryClient.getQueryData(['userInformation']);

  return (
    <>
      <Helmet>
        <title>회원 정보 수정 | 더민트</title>
      </Helmet>
      <Container>
        <ProfileImage userAllInfo={userAllInfo} />
        <InformationEdit userAllInfo={userAllInfo} />
      </Container>
    </>
  );
}

export default AccountsEditPage;

const Container = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
