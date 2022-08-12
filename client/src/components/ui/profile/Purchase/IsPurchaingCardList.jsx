import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { instance } from '../../../../utils/apis/api';
import styled from 'styled-components';
import IsPurchasingCard from './IsPurchasingCard';
import Modal from '../../../common/Modal';

function IsPurchasingCardList({ buyItems }) {
  // API 확인후 삭제
  const auctionitem = {
    historySeq: 1,
    productSeq: 1,
    auctionSeq: 1,
    productName: '닌텐도 스위치',
    startPrice: 1000,
    finalPrice: 2000,
    status: 5, // 0: 판매중, 1:입금대기, 2:입금완료, 3: 판매완료, 4: 유찰, 5: 거래취소
    startTime: 'Thu Jul 28 2022',
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU',
    auctionImage: {
      seq: 1,
      auctionSeq: 1,
      imageUrl: 'https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg',
    },
  };
  const auctionDetail = {
    historySeq: 1,
    productSeq: 1,
    productDeliverySeq: 1,
    bankCode: 1234,
    accountNo: null,
    status: 5,
    remitName: '민호',
    name: '민호',
    phone: '01012345678',
    address: '서울시 역삼동',
    addressDetail: '11층',
    zipCode: '008912',
    trackingNo: '123124325345451234',
  };
  // Modal 연결
  const [historySeq, setHistorySeq] = useState(1); // 구매내역 상세 요청 seq값 저장
  const [buyDetail, setBuyDetail] = useState([]); // 구매내역 상세 내용 저장
  const [isModal, setIsModal] = useState(false);
  const ModalHandler = () => {
    setIsModal((prev) => !prev);
    // auctionitem => buyItems으로 변경
    setHistorySeq(auctionitem.data.historyseq); // 모달 버튼 누르면 그 옥션의 historyseq를 historySeq에 저장
  };
  console.log(historySeq);
  // 모달 열었을 때 상세 보기 API 요청
  useEffect(() => {
    const getSalesDetail = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesDetail(`/api/history/purchase/${historySeq}`);
    res.then((itemDetail) => {
      setBuyDetail(itemDetail.data); // 상세보기 요청이 buyDetail에 저장
    });
  });
  console.log(buyDetail);
  // 배송정보 입력 & POST 요청을 위한 registerPurchase
  const [registerPurchase, setRegisterPurchase] = useState({
    address: `${auctionDetail.address}`,
    addressDetail: `${auctionDetail.addressDetail}`,
    name: `${auctionDetail.productDeliverySeq}`,
    phone: `${auctionDetail.phone}`,
    productDeliverySeq: `${auctionDetail.productDeliverySeq}`,
    remitName: `${auctionDetail.remitName}`,
    zipCode: `${auctionDetail.zipCode}`,
  });

  const { remitName, address, addressDetail } = registerPurchase;

  return (
    <Container>
      <CardContainer>
        {/* auctionitem => buyItems  */}
        <IsPurchasingCard auctionitem={auctionitem} ModalHandler={ModalHandler}></IsPurchasingCard>
      </CardContainer>
      <Modal open={isModal} close={ModalHandler} title="구매 내역">
        {auctionitem.status > 4 && (
          <ModalMain>
            <p>입금 완료 후, 배송지를 입력해주세요!!!</p>
            <p>
              판매자 계좌: 은행-{auctionDetail.bankCode} 계좌번호-{auctionDetail.accountNo}
              계좌소유주-{auctionDetail.name}
            </p>
            <button>내 정보 불러오기</button>
            <p>입금자명:</p>
            <input
              placeholder="입금자 명을 입력해 주세요"
              name="remitName"
              value={remitName}></input>
            <p>배송정보 입력:</p>
            <input
              placeholder="상세 주소를 입력해 주세요"
              name="addressDetail"
              value={addressDetail}></input>
          </ModalMain>
        )}
        {auctionitem.status < 4 && (
          <ModalMain>
            <p>배송정보</p>
            <p>배송조회</p>
            <p>리뷰작성</p>
          </ModalMain>
        )}
      </Modal>
    </Container>
  );
}

export default IsPurchasingCardList;

const Container = styled.div`
  width: 100%;
`;

const CardContainer = styled.div`
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
  height: 300px;
  border-radius: 10px;
  > p {
    margin-bottom: 15px;
  }
`;
