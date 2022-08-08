import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function IsSellingCard({ imageUrl2 }) {
  const [auctionTime, setAuctionTime] = useState({ moreThenOneDay: false, time: '' });
  // TODO: 데이터 교체하기
  const auctions = {
    seq: 1,
    memberSeq: 1,
    title: '닌텐도 스위치 이것만 있으면 그냥 인생은 끝장난거 입니다.',
    startTime: '2022/07/10 18:00',
    status: 0,
    auctionImage: {
      seq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
  };
  const profileUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU';

  return (
    <CardContainer>
      <div>
        <Link to="/">
          <div>
            <picture>
              <img
                src={auctions.auctionImage.imageUrl}
                alt="닌텐도 스위치"
                width="400"
                height="300"
              />
            </picture>
            <AuctionInfoContainer>
              <div>
                <p>{auctions.title}</p>
              </div>
            </AuctionInfoContainer>
          </div>
        </Link>
        <Link to="/">
          <div>
            <picture>
              <img src={profileUrl} alt="유저 피로필" width="50" height="50" />
            </picture>
          </div>
        </Link>
      </div>
    </CardContainer>
  );
}

export default IsSellingCard;

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
        right: 5%;
        width: 15%;
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
