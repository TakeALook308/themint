import { instance } from '../../utils/apis/api';
import React, { useEffect, useState, useParams } from 'react';
import styled from 'styled-components';
import ReviewCard from './ReviewCard';

function ProfileReviewsPage({ params }) {
  console.log(params);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReview = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getReview(`/api/review/${params}`);
    res.then((reviews) => {
      setReviews(reviews.data);
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

export default ProfileReviewsPage;

const Container = styled.div``;
