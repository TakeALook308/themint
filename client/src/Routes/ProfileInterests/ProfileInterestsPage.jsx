import React from 'react';
import styled from 'styled-components';
import InterestButton from '../components/ui/profile/InterestButton';
import InterestCardList from '../components/ui/profile/InterestCardList';

function ProfileInterestsPage(props) {
  return (
    <Container>
      <InterestButton />
      <InterestCardList />
    </Container>
  );
}

export default ProfileInterestsPage;

const Container = styled.div`
  width: 100%;
`;
