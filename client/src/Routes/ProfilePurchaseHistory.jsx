import React from 'react';
import styled from 'styled-components';
import IsPurchasingCardList from '../components/ui/profile/IsPurchaingCardList';
import IsPurchasingButton from '../components/ui/profile/IsPurchasingButton';

function ProfilePurchaseHistory(props) {
  return (
    <Container>
      <IsPurchasingButton />
      <IsPurchasingCardList />
    </Container>
  );
}

export default ProfilePurchaseHistory;

const Container = styled.div`
  width: 100%;
`;
