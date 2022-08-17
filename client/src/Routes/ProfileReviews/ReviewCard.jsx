import React from 'react';
import styled from 'styled-components';
import StarRating from './Star';
import { Link } from 'react-router-dom';

function ReviewCard({ review }) {
  return (
    <Wrapper>
      <Link to={`/profile/${review.writerSeq}`}>
        <ProfileImgContainer>
          <img
            src={process.env.REACT_APP_IMAGE_URL + review.writerProfileUrl}
            alt="유저 프로필"
            width="168"
            height="168"
          />
        </ProfileImgContainer>
      </Link>
      <ReviewArticle>
        <ReviewHeader>
          <Link to={`/profile/${review.writerSeq}`}>{review.writerNickname}</Link>
          <StarContainer>
            <StarRating rating={review.score} />
          </StarContainer>
          <p>{review.date}</p>
        </ReviewHeader>
        <p>{review.content}</p>
      </ReviewArticle>
    </Wrapper>
  );
}
export default ReviewCard;

const Wrapper = styled.main`
  width: 100%;
  height: 160px;
  display: flex;
  background-color: ${(props) => props.theme.colors.subBlack};
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProfileImgContainer = styled.div`
  display: flex;
  align-items: center;
  width: 96px;
  height: 100%;
  margin: auto;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.subMint};
  > img {
    object-fit: scale-down;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const ReviewArticle = styled.article`
  width: 100%;
  height: 100%;
  margin-left: 30px;
`;

const ReviewHeader = styled.header`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;

  > p {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: ${(props) => props.theme.fontSizes.p};
    font-weight: normal;
  }
`;

const StarContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 25%;
`;
