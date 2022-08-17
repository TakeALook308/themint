import { instance } from '../../utils/apis/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReviewCard from './ReviewCard';

function ProfileReviewsPage({ params }) {
  // 리뷰 표시
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
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
  }, [params]);

  return (
    <Container>
      {reviews.length > 1 ? (
        <ReviewContainer>
          {reviews.map((data, index) => (
            <ReviewCard review={data} key={index} />
          ))}
        </ReviewContainer>
      ) : (
        <p>리뷰가 없습니다</p>
      )}
    </Container>
  );
}

export default ProfileReviewsPage;

const Container = styled.div`
  > p {
    font-size: 20px;
    padding-left: 20px;
  }
`;
const ReviewContainer = styled.div``;
