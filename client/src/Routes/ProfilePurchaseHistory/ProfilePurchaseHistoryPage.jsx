import React from 'react';
import styled from 'styled-components';
import IsPurchasingCardList from '../../components/ui/profile/IsPurchaingCardList';
import IsPurchasingButton from '../../components/ui/profile/IsPurchasingButton';

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
