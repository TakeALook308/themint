import React from 'react';
import styled from 'styled-components';
import StarRating from './Star';
import { Link } from 'react-router-dom';

function ReviewCard(props) {
  const review = {
    writerNickName: '미노',
    writerProfileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU',

    content:
      '친절하고 상품도 괜찮았어요 다음 번에도 경매 열어주세요. 계속해서 작성해 보겠습니다 이렇게 계속 작성하는 경우 글이 범위를 초과하면 알아서 ... 으로 바뀌면서 글의 내용이 요약되어야 하는데요 과연 이게 잘 이루어 질까요? 어디한번 알아맞춰 봅시다 딩동댕동 삐뽀삐뽀삐~계속해서 작성해 보겠습니다 이렇게 계속 작성하는 경우 글이 범위를 초과하면 알아서 ... 으로 바뀌면서 글의 내용이 요약되어야 하는데요 과연 이게 잘 이루어 질까요? 어디한번 알아맞춰 봅시다 딩동댕동 삐뽀삐뽀삐~계속해서 작성해 보겠습니다 이렇게 계속 작성하는 경우 글이 범위를 초과하면 알아서 ... 으로 바뀌면서 글의 내용이 요약되어야 하는데요 과연 이게 잘 이루어 질까요? 어디한번 알아맞춰 봅시다 딩동댕동 삐뽀삐뽀삐~',
    score: 3.3,
    date: '2022.07.01',
  };
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
        {review.content}
      </ReviewArticle>
    </Wrapper>
  );
}
export default ReviewCard;

const Wrapper = styled.main`
  width: 100%;
  height: 165px;
  display: flex;
  background-color: ${(props) => props.theme.colors.subBlack};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProfileImgContainer = styled.div`
  width: 16%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileImg = styled.main`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
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
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 30px;
`;

const ReviewHeader = styled.header`
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-bottom: 10px;
  position: relative;

  > p {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: ${(props) => props.theme.fontSizes.p};
  }
`;

const StarContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 90px;
  width: 80px;
`;
