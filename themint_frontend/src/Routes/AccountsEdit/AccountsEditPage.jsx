import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import InformationEdit from './InformationEdit';
import ProfileImage from './ProfileImage';

function AccountsEditPage() {
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
