import React from 'react';
import styled from 'styled-components';
import IsPurchasingButton from '../../components/ui/profile/Purchase/IsPurchasingButton';
import IsPurchasingCardList from '../../components/ui/profile/Purchase/IsPurchaingCardList';

function ProfilePurchaseHistoryPage(props) {
  return (
    <Container>
      <IsPurchasingButton />
      <IsPurchasingCardList />
    </Container>
  );
}

export default ProfilePurchaseHistoryPage;

const Container = styled.div`
  width: 100%;
`;
