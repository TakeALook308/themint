import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function StreamCard() {
  const auctions = {
    seq: 1,
    memberSeq: 1,
    title: '닌텐도 스위치 이것만 있으면 그냥 인생은 끝장난거 입니다.',
    content:
      '닌텐도 스위치 새로 나온 기종 지금 당장 구매하신다면 포켄몬 껴 드립니다.이게 글이 자꾸 늘어지다가 범위를 초과하면 알아서 없어져야 하는데과연 어디까지 글씨가 나오다가 사라질까요 알아맞춰 보세요 딩동댕동 삐뽀삐뽀삐!',
    startTime: 'Thu Jul 28 2022 09:00:00 GMT+0900 ',
    auctionImage: {
      seq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
  };
  const profiles = {
    nickName: '닉네임',
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU',
  };

  return (
    <Wrapper>
      <ImgContainer>
        <StyledImg
          src={auctions.auctionImage.imageUrl}
          alt="닌텐도 스위치"
          width="400"
          height="300"
        />
      </ImgContainer>
      <AuctionInfoContainer>
        <AuctionText>
          <h4>{auctions.title}</h4>
          <ProfileCard>
            <StreamProfile>
              <Link to="/">
                <picture>
                  <img src={profiles.profileUrl} alt="유저 프로필" width="50" height="50" />
                </picture>
              </Link>
            </StreamProfile>
            <p>{profiles.nickName}</p>
          </ProfileCard>
          <p>{auctions.content}</p>
        </AuctionText>
        <Link to="/categories/:categoryName">
          <StreamGo>
            <p>경매참여</p>
          </StreamGo>
        </Link>
      </AuctionInfoContainer>
    </Wrapper>
  );
}

export default StreamCard;

const Wrapper = styled.div`
  width: 535px;
  height: 350px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.mainBlack};
`;

const ImgContainer = styled.div`
  width: 335px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const AuctionInfoContainer = styled.div`
  width: 200px;
  background-color: ${(props) => props.theme.colors.mainBlack};
`;

const AuctionText = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 240px;
  > h4 {
    padding-left: 10px;
    padding-right: 10px;
    height: 55px;
    margin: auto;
    font-size: 20px;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    line-height: 30px;
    font-weight: bold;
  }
  overflow: hidden;
  > p {
    height: 100px;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const ProfileCard = styled.div`
  width: 70%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  > p {
    font-size: 12px;
    margin-left: 10px;
  }
`;

const StreamProfile = styled.div`
  width: 35px;
  height: 35px;
  border: 2px solid transparent;
  overflow: hidden;
  border-radius: 50%;
  margin-left: 10px;
  background-image: ${(props) =>
    `linear-gradient(#fff, #fff), linear-gradient(to right, ${props.theme.colors.mainMint} 0%, ${props.theme.colors.subMint} 100%)`};
  background-origin: border-box;
  background-clip: content-box, border-box;
  > picture {
    position: relative;
    height: 35px;
    width: 35px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const StreamGo = styled.div`
  width: 100px;
  height: 35px;
  margin-top: 20px;
  margin-left: 50px;
  background-color: ${(props) => props.theme.colors.mainBlack};
  border: 2px solid ${(props) => props.theme.colors.subMint};
  color: ${(props) => props.theme.colors.subMint};
  border-radius: 5px;
  text-align: center;
  > p {
    margin-top: 6px;
  }
`;
