import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { auctionApis } from '../../utils/apis/auctionApis';
import { getData } from '../../utils/apis/api';
import moment from 'moment';
import Timer from './Timer';
import { errorToast } from '../../lib/toast';
import { fetchData } from '../../utils/apis/api';
import { productApis } from '../../utils/apis/productApis';
import { useParams } from 'react-router-dom';
function AuctionBidding({ products, sendPrice, price, producter, setNextProduct }) {
  const [nowProduct, setNowProduct] = useState(-1);
  const [nowPrice, setNowPrice] = useState(0);
  const [myPrice, setMyPrice] = useState(0);
  const [resetTime, setResetTime] = useState(moment());
  const [second, setSecond] = useState(0);
  const [start, setStart] = useState(false);
  const { auctionId } = useParams();
  const [test, setTest] = useState(2);
  const [prev, setPrev] = useState(-1);

  const [AuctionStart, setAuctionStart] = useState(false);

  const startAuction = () => {
    if (nowProduct < products.length - 1) {
      sendPrice(-1, nowProduct + 1, products[nowProduct + 1].seq);
    } else alert('경매 끝남');
  };

  const finishAuction = () => {
    console.log('감사합니다');
    stopClick();
    setAuctionStart(false);
    if (producter)
      fetchData
        .post(productApis.PRODUCT_SUCCESS_API, {
          memberSeq: price[price.length - 1].memberSeq,
          productSeq: price[price.length - 1].productSeq,
          finalPrice: price[price.length - 1].price,
        })
        .then((res) => {
          // getData(auctionApis.AUCTION_DETAIL_API(auctionId)).then((res) => {
          //   setProducts(res.data.productList);
          // });
        });
    // if (producter)
    //   console.log(
    //     price[price.length - 1].memberSeq,
    //     price[price.length - 1].productSeq,
    //     price[price.length - 1].price,
    //   );
  };

  useEffect(() => {
    if (price.length > 0) {
      if (price.length === 1 && price[0].price === -1 && products) {
        //경매 시작 신호가 왔을 때
        setNowProduct(price[0].index);
        setNowPrice(products[price[0].index].startPrice);
        setAuctionStart(true);
        // setMyPrice(products[nowProduct + 1].startPrice);
        if (test === 1) {
          setNextProduct(nowProduct);
          setMyPrice(products[price[0].index].startPrice);
          console.log('살려주세요');
        }
      } else {
        setNowPrice(price[price.length - 1].price);
      }
    }

    if (test === 0) {
      setTest(1);
      console.log('0 -> 1');
    } else if (test === 2 && prev !== price.length) {
      setPrev(price.length);
      setTest(0);
      console.log('2 -> 0');
    }
  });
  const myRef = useRef(null);

  useEffect(() => {
    if (test === 1) {
      //props의 price 변화에 따라 한번만 실행
      if (myRef.current) {
        resetClick();
        startClick();
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
  function stopClick() {
    myRef.current.handlePauseClick();
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
          <Timer delay="30" ref={myRef} finishAuction={finishAuction}></Timer>
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
          <button onClick={startAuction} disabled={AuctionStart}>
            경매시작
          </button>
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
                  sendPrice(myPrice, nowProduct, products[nowProduct].seq);
                  setMyPrice(Number(myPrice) + 1000);
                } else if (myPrice === nowPrice && price.length === 1 && price[0].price === -1) {
                  sendPrice(myPrice, nowProduct, products[nowProduct].seq);
                  setMyPrice(Number(myPrice) + 1000);
                } else errorToast('현재 입찰가 보다 낮은 금액입니다.');
              }}
              disabled={!AuctionStart}>
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
