import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function AuctionBidding({ product, sendPrice, price, lastPrice, userInfo }) {
  const nickname = userInfo.nickname;
  const [seconds, setSeconds] = useState(30);
  const [myPrice, setMyPrice] = useState(Number(lastPrice) + 1000);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      } else if (parseInt(seconds) === 0) {
        clearInterval(countdown);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <Article>
      <AuctionInfo>
        <div>
          <p>{product.productName}</p>
          <span>시작가: {product.startPrice} </span>
          <span>현재가: {lastPrice}</span>
        </div>
        <div>{seconds < 10 ? `0${seconds}` : seconds}초</div>
      </AuctionInfo>
      <PriceList>
        {price.map((item, i) => (
          <p key={i}>
            {item.nickname}님 <b>{item.price}원</b> 입찰
          </p>
        ))}
      </PriceList>
      <Bidding>
        <div>
          <button
            onClick={() => {
              if (myPrice - 1000 > lastPrice) setMyPrice(myPrice - 1000);
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
            if (myPrice > lastPrice && seconds !== 0) {
              sendPrice(myPrice);
              setMyPrice(myPrice + 1000);
              // setPriceList([...priceList, { nickname: price.nickname, price: price.price }]);
              // setProductPrice(myPrice);
              // setProductPrice(price[-1].price);
              setSeconds(30);
            } else alert('안돼');
          }}>
          응찰
        </button>
      </Bidding>
    </Article>
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
