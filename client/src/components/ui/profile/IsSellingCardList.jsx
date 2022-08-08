import React, { useState } from 'react';
import styled from 'styled-components';
import IsSellingCard from './IsSellingCard';
import Modal from '../../common/Modal';

function IsSellingCardList() {
  const [isModal, setIsModal] = useState(false);
  const [modalKey, setModalKey] = useState(1);

  const ModalHandler = () => {
    setIsModal((prev) => !prev);
  };

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
  return (
    <Container>
      {[1, 2, 3].map((item) => (
        <div>
          <IsSellingCard
            auctionitem={auctionitem}
            ModalHandler={ModalHandler}
            setModalKey={setModalKey}></IsSellingCard>
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
