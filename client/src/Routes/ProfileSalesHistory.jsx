import React from 'react';
import styled from 'styled-components';
import IsellingButton from '../components/ui/profile/IsSellingButton';

function ProfileSalesHistory(props) {
  return (
    <Container>
      <IsellingButton />
    </Container>
  );
}

export default ProfileSalesHistory;

const Container = styled.div`
  width: 100%;
`;
