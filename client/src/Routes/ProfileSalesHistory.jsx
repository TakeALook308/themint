import React from 'react';
import styled from 'styled-components';
import IsellingButton from '../components/ui/profile/IsSellingButton';
import IsSellingCardList from '../components/ui/profile/IsSellingCardList';

function ProfileSalesHistory(props) {
  // /api/history/sales/{memberSeq}?page=&size=
  return (
    <Container>
      <IsellingButton />
      <IsSellingCardList />
    </Container>
  );
}

export default ProfileSalesHistory;

const Container = styled.div`
  width: 100%;
`;
