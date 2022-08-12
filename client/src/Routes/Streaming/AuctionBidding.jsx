import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { auctionApis } from '../../utils/apis/auctionApis';
import { getData } from '../../utils/apis/api';
import moment from 'moment';
import { useInterval } from './useInterval';
function AuctionBidding({ products, sendPrice, price }) {
  const [nowProduct, setNowProduct] = useState(-1);
  const [nowPrice, setNowPrice] = useState(0);
  const [myPrice, setMyPrice] = useState(0);
  const [resetTime, setResetTime] = useState(moment());
  const [second, setSecond] = useState(30);
  const startAuction = () => {
    // setNowProduct(nowProduct + 1);
    setNowPrice(products[nowProduct + 1].startPrice);
    setMyPrice(products[nowProduct + 1].startPrice + 1000);
    // getData(auctionApis.AUCTION_DATE_API).then((res) => setResetTime(new Date(res.data)));
    setSecond(29);
    sendPrice(-1);
  };
  // useInterval()

  // useEffect(() => {
  //   const a = setInterval(() => {
  //     if (second > 0) {
  //       setSecond(second - 1);
  //       console.log('hi');
  //     } else clearInterval(a);
  //   }, 1000);
  // }, [resetTime]);
  let timer;

  // const countDownTimer = (sec) => {
  //   function show() {
  //     try {
  //       const nowTime = moment();
  //       let showtime = sec + (resetTime - nowTime) / 1000;
  //       if (showtime < 0) {
  //         clearInterval(timer);
  //         document.getElementById('timer').innerHTML = 0;
  //         return;
  //       } else {
  //         document.getElementById('timer').innerHTML = showtime.toFixed(1);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   timer = setInterval(show, 100);
  //   return () => clearInterval(timer);
  // };

  useEffect(() => {
    if (price.length > 0) {
      if (price.length === 1 && price[0].price === -1) {
        // setNowProduct(nowProduct + 1);
        console.log('조건성립');
      } else setNowPrice(price[price.length - 1].price);
    }
  });

  if (products[nowProduct])
    return (
      <Article>
        <AuctionInfo>
          <div>
            <p>{products[nowProduct].productName}</p>
            <span>시작가: {products[nowProduct].startPrice} </span>
            <span>현재가: {nowPrice}</span>
          </div>
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
        <Bidding>
          <div>
            <button
              onClick={() => {
                if (myPrice - 1000 > nowPrice) setMyPrice(myPrice - 1000);
                else alert('안돼');
              }}>
              -
            </button>
            <p>{myPrice}원</p>
            <button
              onClick={() => {
                setMyPrice(myPrice + 1000);
              }}>
              +
            </button>
          </div>
          <button
            onClick={() => {
              sendPrice(myPrice);
              setMyPrice(myPrice + 1000);
            }}>
            응찰
          </button>
        </Bidding>
        <button onClick={startAuction}>경매시작</button>
      </Article>
    );
  else
    return (
      <p>
        경매 시작 전입니다. <button onClick={startAuction}>경매시작</button>
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
