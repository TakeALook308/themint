import React from 'react';
import styled from 'styled-components';
import IsellingButton from '../../components/ui/profile/IsSellingButton';
import IsSellingCardList from '../../components/ui/profile/IsSellingCardList';

function ProfileSalesHistoryPage(props) {
  // /api/history/sales/{memberSeq}?page=&size=
  return (
    <Container>
      <IsellingButton />
      <IsSellingCardList />
    </Container>
  );
}

export default ProfileSalesHistoryPage;

const Container = styled.div`
  width: 100%;
`;
