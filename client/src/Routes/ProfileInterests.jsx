import React from 'react';
import styled from 'styled-components';
import InterestButton from '../components/ui/profile/InterestButton';
import InterestCardList from '../components/ui/profile/InterestCardList';

function ProfileInterests(props) {
  return (
    <Container>
      <InterestButton />
      <InterestCardList />
    </Container>
  );
}

export default ProfileInterests;

const Container = styled.div`
  width: 100%;
`;
