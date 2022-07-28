import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function StreamCard() {
  const [auctionTime, setAuctionTime] = useState({ moreThenOneDay: false, time: '' });
  const auctions = {
    seq: 1,
    memberSeq: 1,
    title: '닌텐도 스위치 이것만 있으면 그냥 인생은 끝장난거 입니다.',
    content: '닌텐도 스위치 새로 나온 기종 지금 당장 구매하신다면 포켄몬 껴 드립니다.',
    startTime: 'Thu Jul 28 2022 09:00:00 GMT+0900 ',
    auctionImage: {
      seq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
  };
  const profileUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU';

  const CalculateTime = () => {
    const auctionStartTime = new Date(auctions.startTime);
    const today = new Date();
    const diff = auctionStartTime - today;
    const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const diffMin = Math.floor((diff / (1000 * 60)) % 60);

    if (diffDay > 1) {
      const year = auctionStartTime.getFullYear();
      const month = makeTwoDigitNumber(auctionStartTime.getMonth() + 1);
      const date = makeTwoDigitNumber(auctionStartTime.getDate());
      const hour = makeTwoDigitNumber(auctionStartTime.getHours());
      const miniute = makeTwoDigitNumber(auctionStartTime.getMinutes());

      setAuctionTime({
        time: `${year}년 ${month}월 ${date}일 ${hour}시 ${miniute}분`,
        moreThenOneDay: true,
      });
    } else if (diffHour >= 1) {
      setAuctionTime({ time: `${diffHour} 시간 전`, moreThenOneDay: false });
    } else {
      setAuctionTime({ time: `${diffMin} 분 전`, moreThenOneDay: false });
    }
  };

  const makeTwoDigitNumber = (time) => String(time).padStart(2, '0');

  useEffect(() => {
    CalculateTime();
  }, []);

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
        <StreamProfile>
          <Link to="/">
            <picture>
              <img src={profileUrl} alt="유저 피로필" width="50" height="50" />
            </picture>
          </Link>
        </StreamProfile>
        <div>
          <h4>{auctions.title}</h4>
          <hr></hr>
          <p>{auctions.content}</p>
          <AuctionTimeMessage time={auctionTime.moreThenOneDay}>
            경매시작: {auctionTime.time}
          </AuctionTimeMessage>
        </div>
        <StreamGo>경매 참여</StreamGo>
      </AuctionInfoContainer>
    </Wrapper>
  );
}

export default StreamCard;

const Wrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.mainBlack};
`;

const ImgContainer = styled.div`
  width: 300px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const AuctionInfoContainer = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  width: 200px;
  background-color: ${(props) => props.theme.colors.mainBlack};
  overflow: hidden;
`;

const AuctionTimeMessage = styled.p`
  color: ${(props) => (props.time ? props.theme.colors.white : props.theme.colors.pointRed)};
`;

const StreamProfile = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: 2px solid transparent;
  overflow: hidden;
  border-radius: 50%;
  background-image: ${(props) =>
    `linear-gradient(#fff, #fff), linear-gradient(to right, ${props.theme.colors.mainMint} 0%, ${props.theme.colors.subMint} 100%)`};
  background-origin: border-box;
  background-clip: content-box, border-box;
  > picture {
    position: relative;
    height: 50px;
    width: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const StreamGo = styled.button`
  position: absolute;
  bottom: 20px;
  right: 80px;
  background-color: ${(props) => props.theme.colors.mainBlack};
  border-color: ${(props) => props.theme.colors.subMint};
  border-width: 2px;
  color: ${(props) => props.theme.colors.subMint};
  height: 35px;
  border-radius: 5px;
  margin: 5px;
  width: 100px;
`;
