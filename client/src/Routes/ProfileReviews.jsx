import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReviewCard from '../components/ui/profile/ReviewCard';

function ProfileReviews(props) {
  useEffect(() => {
    const res = axios.get(`/api/review/${member_seq}`);
    res.then((reviews) => {
      console.log(reviews.data);
    });
  }, []);

  return (
    <Container>
      {reviews.map((data, index) => (
        <ReviewCard review={data} key={index} />
      ))}
    </Container>
  );
}

export default ProfileReviews;

const Container = styled.div``;
