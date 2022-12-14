import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function CateAuctionCard({ auction }) {
  const [auctionTime, setAuctionTime] = useState({ moreThenOneDay: false, time: '' });

  const CalculateTime = () => {
    const auctionStartTime = new Date(auction.startTime);
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
    <CardContainer>
      <div>
        <Link to="/">
          <div>
            <picture>
              <img
                src={process.env.REACT_APP_IMAGE_URL + auction.auctionImage.imageUrl}
                alt="카드 이미지"
                width="400"
                height="300"
              />
            </picture>
            <AuctionInfoContainer>
              <div>
                <p>{auction.title}</p>
                <AuctionTimeMessage time={auctionTime.moreThenOneDay}>
                  경매시작: {auctionTime.time}
                </AuctionTimeMessage>
              </div>
            </AuctionInfoContainer>
          </div>
        </Link>
        <Link to="/">
          <picture>
            <img src={auction.profileUrl} alt="유저 프로필" width="50" height="50" />
          </picture>
        </Link>
      </div>
    </CardContainer>
  );
}

export default CateAuctionCard;

const CardContainer = styled.article`
  position: relative;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease-in;
  &:hover {
    transform: scale(1.03);
  }
  > div {
    width: 100%;
    padding-top: 75%;
    position: relative;
    a {
      &:first-child {
        > div {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          > picture {
            position: relative;
            width: 100%;
            height: 100%;
            > img {
              position: relative;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      &:last-child {
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
        picture {
          position: relative;
          height: 50px;
          width: 50px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
`;

const AuctionInfoContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 33%;
  background: linear-gradient(
    1.15deg,
    #0d0c0f 1.06%,
    rgba(13, 12, 15, 0.73) 54.67%,
    rgba(13, 12, 15, 0) 99.1%
  );
  left: 0;
  bottom: 0;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    p {
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: ${(props) => props.theme.fontSizes.p};
    }
  }
`;

const AuctionTimeMessage = styled.p`
  color: ${(props) => (props.time ? props.theme.colors.white : props.theme.colors.pointRed)};
`;
