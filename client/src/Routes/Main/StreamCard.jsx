import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function StreamCard({ auction }) {
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
    <Container>
      <Wrapper>
        <ImgContainer>
          <StyledImg
            src={process.env.REACT_APP_IMAGE_URL + auction.auctionImage?.imageUrl}
            alt={`${auction.title} 썸네일`}
            width="400"
            height="300"
          />
        </ImgContainer>
        <AuctionInfoContainer>
          <AuctionText>
            <h3>{auction.title}</h3>
            <ProfileCard>
              <StreamProfile>
                <Link to={`/profile/${auction.memberSeq}`}>
                  <picture>
                    <img
                      src={process.env.REACT_APP_IMAGE_URL + auction.profileUrl}
                      alt={`${auction.nickname} 프로필 이미지`}
                      width="50"
                      height="50"
                    />
                  </picture>
                </Link>
              </StreamProfile>
              <p>{auction.nickname}</p>
            </ProfileCard>
            <p>{auctions.content}</p>
          </AuctionText>
          <Move to={`/streamings/${auction.hash}`}>
            <StreamGo>
              <p>경매참여</p>
            </StreamGo>
          </Move>
        </AuctionInfoContainer>
      </Wrapper>
    </Container>
  );
}

export default StreamCard;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 65%;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.mainBlack};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.mainBlack};
`;

const ImgContainer = styled.div`
  width: 65%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 5px;
`;

const AuctionInfoContainer = styled.div`
  width: 35%;
  background-color: ${(props) => props.theme.colors.mainBlack};
  text-align: left;
`;

const AuctionText = styled.div`
  padding: 1rem;
  width: 100%;
  height: 75%;
  > h3 {
    font-size: ${(props) => props.theme.fontSizes.h5};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 30px;
    width: 100%;
    font-weight: bold;
  }
  > p {
    font-size: ${(props) => props.theme.fontSizes.p};
    line-height: 20px;
    overflow: hidden;
    height: 50%;
    white-space: wrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: block;
    display: -webkit-box;
  }
`;

const ProfileCard = styled.div`
  width: 80%;
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
  width: 30px;
  border: 2px solid transparent;
  overflow: hidden;
  border-radius: 50%;
  background-image: ${(props) =>
    `linear-gradient(#fff, #fff), linear-gradient(to right, ${props.theme.colors.mainMint} 0%, ${props.theme.colors.subMint} 100%)`};
  background-origin: border-box;
  background-clip: content-box, border-box;
  > picture {
    position: relative;
    height: 100%;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const StreamGo = styled.div`
  width: 50%;
  height: fit-content;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.mainBlack};
  border: 2px solid ${(props) => props.theme.colors.subMint};
  color: ${(props) => props.theme.colors.subMint};
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Move = styled(Link)`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
