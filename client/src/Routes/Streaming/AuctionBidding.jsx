import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Timer from './Timer';
import { errorToast } from '../../lib/toast';
import { fetchData } from '../../utils/apis/api';
import { productApis } from '../../utils/apis/productApis';

function AuctionBidding({ products, sendPrice, price, producter, setNextProduct }) {
  const [nowProduct, setNowProduct] = useState(-1); // 현재 상품 index
  const [nowPrice, setNowPrice] = useState(0); // 현재 상품의 가격
  const [myPrice, setMyPrice] = useState(0); // 응찰하고자 하는 가격
  const [toggle, setToggle] = useState(2); // props의 변화에 따라 한 번만 실행하게 돕는 toggle
  const [prev, setPrev] = useState(-1); // props의 변화값
  const [AuctionStart, setAuctionStart] = useState(false); //상품별 경매 진행 여부
  const [AuctionEnd, setAuctionEnd] = useState(false); //모든 상품의 경매가 진행되었는지 여부

  useEffect(() => {
    // setNowProduct()
    console.log(products);
  }, []);

  useEffect(() => {
    if (price.length > 0) {
      if (price.length === 1 && price[0].price === -1 && products) {
        //경매 시작 신호가 왔을 때
        setNowProduct(price[0].index);
        setNowPrice(products[price[0].index].startPrice);
        setAuctionStart(true);
        if (toggle === 1) {
          setNextProduct(nowProduct);
          setMyPrice(products[price[0].index].startPrice);
          // console.log('살려주세요');
        }
      } else {
        setNowPrice(price[price.length - 1].price);
      }
    }

    if (toggle === 0) {
      setToggle(1);
      // console.log('0 -> 1');
    } else if (toggle === 2 && prev !== price.length) {
      setPrev(price.length);
      setToggle(0);
      // console.log('2 -> 0');
    }
  });

  useEffect(() => {
    if (toggle === 1) {
      //props의 price 변화에 따라 한번만 실행
      if (myRef.current) {
        resetClick();
        startClick();
      }
      setToggle(2);
      // console.log('1 -> 2');
    }
  }, [toggle]);

  const startAuction = () => {
    // 경매 시작 버튼을 눌렀을 때
    if (nowProduct < products.length - 1) {
      sendPrice(-1, nowProduct + 1, products[nowProduct + 1].seq);
    } else {
      setNextProduct(nowProduct + 1);
      errorToast('경매가 종료되었습니다.');
      setAuctionEnd(true);
    }
  };

  const finishAuction = () => {
    stopClick();
    setAuctionStart(false);
    if (producter)
      fetchData.post(productApis.PRODUCT_SUCCESS_API, {
        memberSeq: price[price.length - 1].memberSeq,
        productSeq: price[price.length - 1].productSeq,
        finalPrice: price[price.length - 1].price,
      });
  };

  const myRef = useRef(null);

  function startClick() {
    myRef.current.handlePlayClick();
  }
  function resetClick() {
    myRef.current.handleResetClick();
  }
  function stopClick() {
    myRef.current.handlePauseClick();
  }

  if (price[0] && !AuctionEnd)
    return (
      <Article>
        <AuctionInfo>
          <div>
            <p>{products[Number(price[0].index)].productName}</p>
            <span>시작가: {products[Number(price[0].index)].startPrice.toLocaleString()}원 </span>
            <span>현재가: {nowPrice.toLocaleString()}원</span>
          </div>
          <Timer delay="30" ref={myRef} finishAuction={finishAuction}></Timer>
        </AuctionInfo>
        <PriceList>
          {price.map((item, i) => {
            if (i !== 0) {
              return (
                <p key={i}>
                  {item.nickname}님 <b>{item.price.toLocaleString()}원</b> 입찰
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
  else if (AuctionEnd) {
    return <Article>모든 경매가 종료되었습니다.</Article>;
  } else {
    return (
      <Article>
        경매 시작 전입니다. {producter ? <button onClick={startAuction}>경매시작</button> : null}
      </Article>
    );
  }
}

const Article = styled.article`
  width: 100%;
  height: 300px;
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
