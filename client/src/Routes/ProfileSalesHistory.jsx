import React from 'react';
import styled from 'styled-components';
import IsellingButton from '../components/ui/profile/IsSellingButton';
import IsSellingCardList from '../components/ui/profile/IsSellingCardList';

function ProfileSalesHistory(props) {
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
