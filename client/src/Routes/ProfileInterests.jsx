import React from 'react';
import styled from 'styled-components';
import InterestButton from '../components/ui/profile/InterestButton';

function ProfileInterests(props) {
  return (
    <Container>
      <InterestButton />
    </Container>
  );
}

export default ProfileInterests;

const Container = styled.div`
  width: 100%;
`;
