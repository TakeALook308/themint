import { instance } from '../../utils/apis/api';
import React, { useEffect, useState, useParams } from 'react';
import styled from 'styled-components';
import ReviewCard from './ReviewCard';

function ProfileReviewsPage({ params }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReview = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getReview(`/api/review/${params}`);
    res.then((reviews) => {
      setReviews(reviews.data);
    });
    return () => {
      setReviews([]);
    };
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
