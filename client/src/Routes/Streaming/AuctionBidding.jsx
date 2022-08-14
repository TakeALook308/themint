import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { auctionApis } from '../../utils/apis/auctionApis';
import { getData } from '../../utils/apis/api';
import moment from 'moment';

import Timer from './Timer';
import { errorToast } from '../../lib/toast';
function AuctionBidding({ products, sendPrice, price, producter }) {
  const [nowProduct, setNowProduct] = useState(-1);
  const [nowPrice, setNowPrice] = useState(0);
  const [myPrice, setMyPrice] = useState(0);
  const [resetTime, setResetTime] = useState(moment());
  const [second, setSecond] = useState(0);
  const [start, setStart] = useState(false);

  const [test, setTest] = useState(2);
  const [prev, setPrev] = useState(-1);

  const [AuctionStart, setAuctionStart] = useState(true);

  const startAuction = () => {
    if (nowProduct < products.length - 1) {
      sendPrice(-1, nowProduct + 1);
      setAuctionStart(false);
    } else alert('경매 끝남');
  };

  useEffect(() => {
    if (price.length > 0) {
      if (price.length === 1 && price[0].price === -1 && products) {
        setNowProduct(price[0].index);
        setNowPrice(products[price[0].index].startPrice);
        resetClick();
        startClick();
        if (test === 0) {
          setTest(1);
        }
        // setMyPrice(products[nowProduct + 1].startPrice);
      } else {
        setNowPrice(price[price.length - 1].price);
      }
    }

    if (test === 0) {
      setTest(1);
      console.log('0 -> 1');
    } else if (test === 2 && prev < price.length) {
      setPrev(price.length);
      setTest(0);
      console.log('2 -> 0');
    }
  });
  const myRef = useRef(null);

  useEffect(() => {
    if (test === 1) {
      if (myRef.current) {
        resetClick();
      }
      setTest(2);
      console.log('1 -> 2');
    }
  }, [test]);

  function startClick() {
    myRef.current.handlePlayClick();
  }
  function resetClick() {
    myRef.current.handleResetClick();
  }

  if (price[0])
    return (
      <Article>
        <AuctionInfo>
          <div>
            <p>{products[Number(price[0].index)].productName}</p>
            <span>시작가: {products[Number(price[0].index)].startPrice} </span>
            <span>현재가: {nowPrice}</span>
          </div>
          <Timer delay="5" ref={myRef}></Timer>
          {/* <div id="timer">{countDownTimer(30)}</div> */}
          {/* <div>{second < 10 ? `0${second}` : second}초</div> */}
          {/* <Timer></Timer> */}
        </AuctionInfo>
        <PriceList>
          {price.map((item, i) => {
            if (i !== 0) {
              return (
                <p key={i}>
                  {item.nickname}님 <b>{item.price}원</b> 입찰
                </p>
              );
            }
          })}
        </PriceList>
        {producter ? (
          <button onClick={startAuction}>경매시작</button>
        ) : (
          <Bidding>
            <div>
              <button
                onClick={() => {
                  if (Number(myPrice) - 1000 > nowPrice) setMyPrice(Number(myPrice) - 1000);
                  else errorToast('현재 입찰가 보다 낮은 금액입니다.');
                }}>
                -
              </button>
              <p>
                <input
                  type="number"
                  min={nowPrice}
                  value={myPrice}
                  onChange={(e) => setMyPrice(e.target.value)}
                />
                원
              </p>
              <button
                onClick={() => {
                  setMyPrice(Number(myPrice) + 1000);
                }}>
                +
              </button>
            </div>
            <button
              onClick={() => {
                if (myPrice > nowPrice) {
                  sendPrice(myPrice);
                  setMyPrice(Number(myPrice) + 1000);
                } else errorToast('현재 입찰가 보다 낮은 금액입니다.');
              }}>
              응찰
            </button>
          </Bidding>
        )}
      </Article>
    );
  else
    return (
      <p>
        경매 시작 전입니다. {producter ? <button onClick={startAuction}>경매시작</button> : null}
      </p>
    );
}

const Article = styled.article`
  height: 40%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;
`;

const AuctionInfo = styled.div`
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
    & > p {
      width: 100px;
      white-space: nowrap;
      font-size: 20px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const PriceList = styled.div`
  height: 150px;
  overflow: auto;
  p {
    background-color: ${(props) => props.theme.colors.textGray};
    text-align: center;
    padding: 5px;
    font-size: 14px;
    border-radius: 5px;
    margin: 10px 0;

    color: ${(props) => props.theme.colors.mainBlack};
    b {
      font-weight: 700;
      color: ${(props) => props.theme.colors.pointRed};
    }
  }
`;

const Bidding = styled.div`
  display: flex;
  div {
    display: flex;
  }
`;

export default AuctionBidding;
