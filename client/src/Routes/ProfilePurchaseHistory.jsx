import React from 'react';
import styled from 'styled-components';
import IsPurchasingButton from '../components/ui/profile/IsPurchasingButton';

function ProfilePurchaseHistory(props) {
  return (
    <Container>
      <IsPurchasingButton />
    </Container>
  );
}

export default ProfilePurchaseHistory;

const Container = styled.div`
  width: 100%;
`;
