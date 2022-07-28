import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function AuctionCard() {
  return (
    <CardContainer>
      <Link to="#">
        <div>
          <div>
            <picture>
              <img
                src="https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg"
                alt="닌텐도 스위치"
                width="400"
                height="300"
              />
            </picture>
            <AuctionInfoContainer>
              <div>
                <p>소개팅</p>
                <p>경매시작: 3시간 전</p>
              </div>
              <Link to="#">
                <picture>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU"
                    alt="유저 피로필"
                    width="50"
                    height="50"
                  />
                </picture>
              </Link>
            </AuctionInfoContainer>
          </div>
        </div>
      </Link>
    </CardContainer>
  );
}

export default AuctionCard;

const CardContainer = styled.article`
  position: relative;
  background-color: blue;
  width: 300px;
  border-radius: 5px;
  overflow: hidden;
  a {
    > div {
      width: 100%;
      background-color: tomato;
      padding-top: 75%;
      position: relative;
      > div {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: teal;
        left: 0;
        top: 0;
        > picture {
          background-color: sandybrown;
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
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  a {
    width: 50px;
    height: 50px;
    border: 2px solid black;
    overflow: hidden;
    border-radius: 50px;
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
`;
