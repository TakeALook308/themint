import React from 'react';
import styled from 'styled-components';
import ReviewCard from '../components/ui/profile/ReviewCard';

function ProfileReviews(props) {
  return (
    <Container>
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </Container>
  );
}

export default ProfileReviews;

const Container = styled.div``;
