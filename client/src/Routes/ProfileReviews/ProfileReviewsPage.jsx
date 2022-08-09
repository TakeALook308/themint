import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReviewCard from '../components/ui/profile/ReviewCard';

function ProfileReviewsPage(props) {
  // 중첩 라우팅에서 memberSeq를 어떻게 전달할 것인가?
  // 현재 Profile 페이지에서 가지고 있는 memberSeq를 받아서 api 요청을 해야한다.
  // const [memberSeq, setMemberSeq] = useState(0);
  // const [reviews, setReviews] = useState(null);
  // const getReviews = async () => {
  //   const reviews = await axios.get(`/api/review/${memberSeq}`);
  //   setReviews(reviews.data);
  // };
  // useEffect(() => {
  //   getReviews();
  // }, []);

  return (
    <Container>
      {/* {reviews.map((data, index) => (
        <ReviewCard review={data} key={index} />
      ))} */}
      <ReviewCard />
    </Container>
  );
}

export default ProfileReviewsPage;

const Container = styled.div``;
