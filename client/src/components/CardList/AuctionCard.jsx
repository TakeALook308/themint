import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function AuctionCard({ auction }) {
  const [auctionTime, setAuctionTime] = useState({ moreThenOneDay: false, time: '' });

  const CalculateTime = () => {
    const auctionStartTime = new Date(auction?.startTime);
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
        time: `${year}.${month}.${date}. ${hour}:${miniute}`,
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
        <Link to={`/auctions/${auction?.hash}`}>
          <div>
            <picture>
              <img
                src={process.env.REACT_APP_IMAGE_URL + auction?.auctionImage?.imageUrl}
                loading="lazy"
                alt="닌텐도 스위치"
                width="400"
                height="300"
              />
            </picture>
            <AuctionInfoContainer>
              <div>
                <p>{auction?.title || auction?.productName}</p>
                <AuctionTimeMessage time={auctionTime.moreThenOneDay}>
                  {auction?.status === 1 ? '실시간 경매 진행 중' : `경매시작: ${auctionTime.time}`}
                </AuctionTimeMessage>
              </div>
            </AuctionInfoContainer>
          </div>
        </Link>
        <Link to={`/profile/${auction?.memberSeq}`}>
          <div>
            <picture>
              <img
                src={process.env.REACT_APP_IMAGE_URL + auction?.profileUrl}
                alt={`${auction?.nickname} 프로필 이미지`}
                width="50"
                height="50"
              />
            </picture>
          </div>
        </Link>
      </div>
    </CardContainer>
  );
}

export default AuctionCard;

const CardContainer = styled.article`
  position: relative;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease-in;
  background-color: ${(props) => props.theme.colors.textGray};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75));
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.75);

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
        right: 5%;
        width: 15%;
        overflow: hidden;
        border-radius: 50%;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        > div {
          position: relative;
          width: 100%;
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
              object-fit: contain;
            }
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
  padding: 5%;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:first-child {
        font-weight: bold;
        font-size: ${(props) => props.theme.fontSizes.p};
      }
      &:last-child {
        font-size: 12px;
      }
    }
  }
`;

const AuctionTimeMessage = styled.p`
  color: ${(props) => (props.time ? props.theme.colors.white : props.theme.colors.pointRed)};
`;
