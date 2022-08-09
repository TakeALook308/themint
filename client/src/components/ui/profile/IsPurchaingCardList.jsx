import React, { useState, useEffect } from 'react';
import { instance } from '../../../utils/api/api';
import styled from 'styled-components';
import Modal from '../../common/Modal';
import IsPurchasingCard from './IsPurchasingCard';

function IsPurchasingCardList() {
  const [historySales, setHistorySales] = useState(null);
  const [historySeq, setHistorySeq] = useState(0);
  const [historyDetail, setHistoryDetail] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [memberSeq, setMemberSeq] = useState(1);

  // memberSeq를 어디서 가져와야 하지?
  const getMemberSeq = (value) => {
    setMemberSeq(value);
  };

  useEffect(() => {
    const getSalesAuction = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesAuction(`/api/history/sales/${memberSeq}?page${1}=&size=${9}`);
    res.then((auctionitem) => {
      setHistorySales(auctionitem.data);
      console.log(auctionitem.data);
    });
  }, [memberSeq]);

  const ModalHandler = () => {
    setIsModal((prev) => !prev);
    setHistorySeq(auctionitem.data.historyseq);
    const getSalesDetail = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesDetail(`/api/history/sales/${historySeq}`);
    res.then((auctionDetail) => {
      setHistoryDetail(auctionDetail.data);
      console.log(auctionDetail.data);
    });
  };

  // API 확인후 삭제
  const auctionitem = {
    historyseq: 1,
    memberSeq: 1,
    productName: '닌텐도 스위치',
    startTime: 'Thu Jul 28 2022',
    startPrice: 1000,
    finalPrice: 2000,
    status: 1, // 0: 판매중, 1:입금대기, 2:입금완료, 3: 판매완료, 4: 유찰, 5: 거래취소
    auctionImage: {
      seq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU',
  };

  const auctionDetail = {
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

  return (
    <Container>
      <div>
        <IsPurchasingCard
          historySales={historySales}
          auctionitem={auctionitem}
          ModalHandler={ModalHandler}
          key={historySeq}
        />
      </div>
      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <ModalProfile>
          <img src={auctionDetail.profileUrl} alt="프로필이미지" />
          <p>{auctionDetail.nickname}</p>
        </ModalProfile>
        {auctionitem.status > 4 && (
          <ModalMain>
            <p>입금 완료 후, 배송지를 입력해주세요!!!</p>
            <p>판매자 계좌: </p>
            <p>입금자명:</p>
            <p>배송정보 입력: </p>
            <p>내 정보 불러오기</p>
          </ModalMain>
        )}
        <ModalMain>
          <p>배송정보</p>
          <p>배송조회</p>
          <p>리뷰작성</p>
        </ModalMain>
      </Modal>
    </Container>
  );
}

export default IsPurchasingCardList;

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
