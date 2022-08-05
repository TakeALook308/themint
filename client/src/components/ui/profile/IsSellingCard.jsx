import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from '../../common/Modal';

function IsSellingCard({ ModalHandler, setModalKey }) {
  // TODO: 데이터 교체하기

  const [statusName, setStatusName] = useState(0);
  useEffect(() => {
    setStatusName(auctionitems.status);
    setModalKey(auctionitems.seq);
  });

  const auctionstr = ['', '입금대기중', '입금완료', '배송완료'];

  const auctionitems = {
    seq: 1,
    memberSeq: 1,
    productName: '닌텐도 스위치',
    startTime: 'Thu Jul 28 2022',
    startPrice: 1000,
    finalPrice: 2000,
    status: 3,
    auctionImage: {
      seq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU',
  };
  return (
    <CardContainer>
      <div>
        <Link to="/">
          <div>
            <picture>
              <img
                src={auctionitems.auctionImage.imageUrl}
                alt="닌텐도 스위치"
                width="400"
                height="300"
              />
            </picture>
            <AuctionInfoContainer>
              <div>
                <h4>{auctionitems.productName}</h4>
                <p>{auctionitems.finalPrice}원</p>
                <AcutionTime>{auctionitems.startTime}</AcutionTime>
                <AuctionStatus auctionstrkey={auctionitems.status}>
                  {auctionstr[auctionitems.status]}
                </AuctionStatus>
              </div>
            </AuctionInfoContainer>
          </div>
        </Link>
        <Link to="/">
          <div>
            <picture>
              <img src={auctionitems.profileUrl} alt="유저 피로필" width="50" height="50" />
            </picture>
          </div>
        </Link>
      </div>
      <Plus type="button" onClick={ModalHandler}>
        +
      </Plus>
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
    h4 {
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 20px;
    }
  }
`;

const AcutionTime = styled.p`
  position: absolute;
  right: 5%;
  top: -5%;
  font-size: 12px;
`;

const AuctionStatus = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 25%;
  height: 25%;
  right: 5%;
  top: -180%;
  border-radius: 10px;
  background-color: ${(props) =>
    props.auctionstrkey === 1 ? 'orange' : props.auctionstrkey === 2 ? 'red' : 'black'};
`;

const Plus = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
`;
