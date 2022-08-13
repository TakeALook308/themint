import React from 'react';
import styled from 'styled-components';
import StarRating from './Star';
import { Link } from 'react-router-dom';

function ReviewCard({ review }) {
  return (
    <Wrapper>
      <ProfileImgContainer>
        <ProfileImg>
          <div>
            <Link to="/profile/:id">
              <picture>
                <img src={review.writerProfileUrl} alt="유저 프로필" width="168" height="168" />
              </picture>
            </Link>
          </div>
        </ProfileImg>
      </ProfileImgContainer>
      <ReviewArticle>
        <ReviewHeader>
          <Link to="/profile/:id">{review.writerNickName}</Link>
          <StarContainer>
            <StarRating rating={review.score} />
          </StarContainer>
          <p>{review.date}</p>
        </ReviewHeader>
      </ReviewArticle>
    </Wrapper>
  );
}
export default ReviewCard;

const Wrapper = styled.main`
  width: 100%;
  height: 165px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.subBlack};
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProfileImgContainer = styled.div`
  width: 10%;
  height: 70%;
`;

const ProfileImg = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  overflow: hidden;
  border-radius: 50%;
  background-image: ${(props) =>
    `linear-gradient(#fff, #fff), linear-gradient(to right, ${props.theme.colors.mainMint} 0%, ${props.theme.colors.subMint} 100%)`};
  background-origin: border-box;
  background-clip: content-box, border-box;
  > div {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 100%;
    picture {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
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
  margin-bottom: 10px;
  position: relative;

  > p {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: ${(props) => props.theme.fontSizes.p};
    font-weight: normal;
  }
`;

const ReviewText = styled.div`
  width: 100%;
  height: 60%;
  overflow: hidden;
  line-height: 30px;
`;

const StarContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 80px;
`;
