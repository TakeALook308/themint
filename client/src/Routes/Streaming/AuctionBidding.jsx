import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Timer from './Timer';
import { successToast, errorToast } from '../../lib/toast';
import { fetchData } from '../../utils/apis/api';
import { productApis } from '../../utils/apis/productApis';
import GradientButton from '../../components/ButtonList/GradientButton';
import { FaMinus, FaPlus } from 'react-icons/fa';
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
    successToast(`${price[price.length - 1].nickname}님이 낙찰되셨습니다. 축하합니다🥳🎉🎊`);
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
            <div>
              <span>시작가: {products[Number(price[0].index)].startPrice.toLocaleString()}원 </span>
              <span className="now-price">현재가: {nowPrice.toLocaleString()}원</span>
            </div>
          </div>
        </AuctionInfo>
        <Timer delay="30" ref={myRef} finishAuction={finishAuction}></Timer>
        <PriceList>
          {price.map((item, i) => {
            if (i !== 0) {
              return (
                <p key={i}>
                  {item.nickname} 님 <b>{item.price.toLocaleString()}원</b> 입찰
                </p>
              );
            }
          })}
        </PriceList>
        {producter ? (
          <GradientButton
            text="경매시작"
            onClick={startAuction}
            disabled={AuctionStart}></GradientButton>
        ) : (
          <Bidding>
            <div>
              <button
                className="minus"
                onClick={() => {
                  if (Number(myPrice) - 1000 > nowPrice) setMyPrice(Number(myPrice) - 1000);
                  else errorToast('현재 입찰가 보다 낮은 금액입니다.');
                }}>
                <FaMinus size={15} color="white"></FaMinus>
              </button>
              <p>
                <input
                  type="number"
                  min={nowPrice}
                  value={myPrice}
                  onChange={(e) => setMyPrice(e.target.value)}
                  // onKeyDown={(e) => {
                  //   if (e.key === 'Enter' && AuctionStart) {
                  //     if (myPrice > nowPrice) {
                  //       sendPrice(myPrice, nowProduct, products[nowProduct].seq);
                  //       setMyPrice(Number(myPrice) + 1000);
                  //     } else if (
                  //       myPrice === nowPrice &&
                  //       price.length === 1 &&
                  //       price[0].price === -1
                  //     ) {
                  //       sendPrice(myPrice, nowProduct, products[nowProduct].seq);
                  //       setMyPrice(Number(myPrice) + 1000);
                  //     } else errorToast('현재 입찰가 보다 낮은 금액입니다.');
                  //   }
                  // }}
                />
              </p>
              <button
                className="plus"
                onClick={() => {
                  setMyPrice(Number(myPrice) + 1000);
                }}>
                <FaPlus size={15} color="white"></FaPlus>
              </button>
            </div>
            <BidBtn
              className="bidding-btn"
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
            </BidBtn>
          </Bidding>
        )}
      </Article>
    );
  else if (AuctionEnd) {
    return <Article>모든 경매가 종료되었습니다.</Article>;
  } else {
    return (
      <Article>
        <div className="prev">경매 시작 전입니다.</div>
        {producter ? (
          <GradientButton onClick={startAuction} text="경매시작"></GradientButton>
        ) : (
          <div className="blank"></div>
        )}
      </Article>
    );
  }
}

const shine = keyframes`
   0% {
     background-position: 0% 50%;
     }
   50% {
     background-position: 100% 50%;
     }
   100% {
     background-position: 0% 50%;
     }
`;
const BidBtn = styled.button`
  width: 50px;
  height: 40px;
  background: ${(props) => props.theme.colors.gradientMintToPurple};
  border-radius: 5px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => props.theme.colors.white};
  font-weight: bold;
  cursor: pointer;
  background-size: 200% 200%;
  border-radius: 5px;
  transition: all 0.4s ease;
  &:hover {
    animation: ${shine} 3s infinite linear;
  }
  &:disabled {
    background: ${(props) => props.theme.colors.disabledGray};
    color: ${(props) => props.theme.colors.pointGray};
    cursor: not-allowed;
  }
`;
const Article = styled.article`
  height: 300px;
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  .prev {
    height: 230px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .blank {
    height: 40px;
    width: 100%;
  }
`;

const AuctionInfo = styled.div`
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    padding: 10px 15px;
    gap: 10px;
    height: 80px;
    & > p {
      width: 100px;
      white-space: nowrap;
      font-size: 20px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > div {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      & > .now-price {
        color: ${(props) => props.theme.colors.pointRed};
      }
    }
  }
`;

const PriceList = styled.div`
  height: 150px;
  overflow: auto;
  padding: 0 20px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(206, 206, 206, 0.7);
    /* background-color: red; */
  }
  p {
    background-color: ${(props) => props.theme.colors.textGray};
    text-align: center;
    padding: 5px;
    font-size: 14px;
    border-radius: 5px;
    margin: 10px 0;
    &:last-child {
      background-color: ${(props) => props.theme.colors.subMint};
      font-weight: 600;
    }
    color: ${(props) => props.theme.colors.mainBlack};
    b {
      font-weight: 700;
      color: ${(props) => props.theme.colors.pointRed};
    }
  }
`;

const Bidding = styled.div`
  display: flex;
  height: 40px;
  gap: 15px;
  justify-content: center;
  div {
    display: flex;
    justify-content: center;
    button {
      width: 35px;
      height: 40px;
      border: none;
    }
    .minus {
      background-color: ${(props) => props.theme.colors.pointBlue};
      border-radius: 5px 0 0 5px;
      padding-top: 5px;
    }
    .plus {
      background-color: ${(props) => props.theme.colors.pointRed};
      border-radius: 0 5px 5px 0;
    }
    p {
      text-align: center;

      input {
        height: 40px;
        outline: none;
        background-color: ${(props) => props.theme.colors.pointBlack};
        border: none;
        text-align: center;
        color: ${(props) => props.theme.colors.white};
        font-size: 18px;
        width: 120px;
      }
      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

export default AuctionBidding;
