import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import IsSellingCard from './IsSellingCard';
import Modal from '../../common/Modal';

function IsSellingCardList() {
  const [historySales, setHistorySales] = useState(null); 
  const [ historySeq, SetHistorySeq] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [memberSeq, setMemberSeq] = useState(0);
  const [historySeq, setHistorySeq] = useState(0);
  // memberSeq를 어디서 가져와야 하지?
  const getMemberSeq = (value) => {
    setMemberSeq(value);
  };
  const getHistorySeq = (value) => {
    setHistoryDetailSeq(value);
  };

  const ModalHandler = () => {
    setIsModal((prev) => !prev);
    setHistorySeq(auctionitem.historyseq) 
  };
  useEffect(() => {
    const res = async () => {
      await axios.get(`/api/history/sales/${memberSeq}?page${1}=&size=${9}`);
    };
    res.then((auctions) => {
      setHistorySales(auctions.data);
      console.log(auctions.data);
    });
  }, [memberSeq]);

  useEffect(() => {
    const res = async () => {
      await axios.get(`/api/history/sales/${historySeq}`);
    };
    res.then((auction) => {
      setHistoryDetailSeq(auction.data);
      console.log(auction.data);
    });
  }, [historySeq]);
  const auctionitem = {
    historyseq: 1,
    memberSeq: 1,
    productName: '닌텐도 스위치',
    startTime: 'Thu Jul 28 2022',
    startPrice: 1000,
    finalPrice: 2000,
    status: 5, // 0: 판매중, 1:입금대기, 2:입금완료, 3: 판매완료, 4: 유찰, 5: 거래취소
    auctionImage: {
      seq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
    nickname: '미노',
    remitName: '민호', // 입금자명
    name: '민호',
    phone: '01012345678',
    address: '서울시 역삼동',
    addressDetail: '11층',
    trackingNo: '',
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU',
  };
  const auctionitem2 = {
    historyseq: 1,
    memberSeq: 1,
    productName: '닌텐도 스위치',
    startTime: 'Thu Jul 28 2022',
    startPrice: 1000,
    finalPrice: 2000,
    status: 2, // 0: 판매중, 1:입금대기, 2:입금완료, 3: 판매완료, 4: 유찰, 5: 거래취소
    auctionImage: {
      seq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
    nickname: '미노',
    remitName: '민호', // 입금자명
    name: '민호',
    phone: '01012345678',
    address: '서울시 역삼동 이것은 두번째 카드',
    addressDetail: '11층 두번째이므로 내용이 달라야한다',
    trackingNo: '',
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU',
  };
  return (
    <Container>
      {[1, 2, 3].map((item) => (
        <div>
          <IsSellingCard
            auctionitem={auctionitem}
            ModalHandler={ModalHandler}
            getHistorySeq={getHistorySeq}
            key={item}></IsSellingCard>
        </div>
      ))}
      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <ModalProfile>
          <img src={auctionitem.profileUrl} alt="프로필이미지" />
          <p>{auctionitem.nickname}</p>
        </ModalProfile>
        <ModalMain>
          <p>입금자명 : {auctionitem.remitName}</p>
          <p>입금자 전화번호: {auctionitem.phone}</p>
          <p>
            구매자 배송지: {auctionitem.address}
            <span>{auctionitem.addressDetail}</span>
          </p>
          <input placeholder="송장번호 입력"></input>
        </ModalMain>
      </Modal>
      {[1, 2, 3].map((item) => (
        <div>
          <IsSellingCard auctionitem={auctionitem2} ModalHandler={ModalHandler}></IsSellingCard>
          <Modal open={isModal} close={ModalHandler} title="상품 관리">
            <ModalProfile>
              <img src={auctionitem2.profileUrl} alt="프로필이미지" />
              <p>{auctionitem2.nickname}</p>
            </ModalProfile>
            <ModalMain>
              <p>입금자명 : {auctionitem2.remitName}</p>
              <p>입금자 전화번호: {auctionitem2.phone}</p>
              <p>
                구매자 배송지: {auctionitem2.address}
                <span>{auctionitem2.addressDetail}</span>
              </p>
              <input placeholder="송장번호 입력"></input>
            </ModalMain>
          </Modal>
        </div>
      ))}
    </Container>
  );
}

export default IsSellingCardList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const ModalProfile = styled.div`
  padding-left: 20px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  > img {
    width: 20%;
    height: 100%;
    border-radius: 50%;
    margin-right: 20px;
  }
  > p {
    font-size: 24px;
    font-weight: bold;
  }
`;

const ModalMain = styled.main`
  width: 100%;
  height: 140px;
  > p {
    margin-bottom: 15px;
  }
`;
