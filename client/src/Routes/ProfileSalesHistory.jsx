import React from 'react';
import styled from 'styled-components';
import IsellingButton from '../components/ui/profile/IsSellingButton';
import SalesHistoryCard from '../components/ui/profile/SalesHistoryCard';
import SalesHistoryCard2 from '../components/ui/profile/SalesHistoryCard2';

function ProfileSalesHistory(props) {
  return (
    <Container>
      <IsellingButton />
      <SalesHistoryCard2 />
    </Container>
  );
}

export default ProfileSalesHistory;

const Container = styled.div`
  width: 100%;
`;
