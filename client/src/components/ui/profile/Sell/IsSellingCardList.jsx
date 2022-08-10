import React, { useState, useEffect } from 'react';
import { instance } from '../../../../utils/api/api';
import styled from 'styled-components';
import IsSellingCard from './IsSellingCard';
import Modal from '../../../common/Modal';

function IsSellingCardList({ sellingItem }) {
  // Modal 연결
  const [historySeq, setHistorySeq] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const ModalHandler = () => {
    setIsModal((prev) => !prev);
    console.log(sellingItem);
    setHistorySeq(sellingItem.data.historyseq);
    const getSalesDetail = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesDetail(`/api/history/sales/${historySeq}`);
    res.then((itemDetail) => {
      console.log(itemDetail.data);
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
    status: 5, // 0: 판매중, 1:입금대기, 2:입금완료, 3: 판매완료, 4: 유찰, 5: 거래취소
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

  // 버튼 Filter
  const [active, setActive] = useState('1');

  const onSelling = () => {
    setActive('1');
    const nextItems = sellingItem.filter((sellingItem) => sellingItem.status <= 2);
  };
  const onSold = async () => {
    setActive('2');
    const 
  };
  return (
    <Container>
      <ButtonNav>
        <StyledBtn
          key={1}
          className={active === '1' ? 'active' : undefined}
          id={'1'}
          onClick={onSelling}>
          판매중
        </StyledBtn>
        <StyledBtn
          key={2}
          className={active === '2' ? 'active' : undefined}
          id={'2'}
          onClick={onSold}>
          판매완료
        </StyledBtn>
      </ButtonNav>
      <CardContainer>
        <IsSellingCard sellingItem={sellingItem} ModalHandler={ModalHandler}></IsSellingCard>
      </CardContainer>
      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <ModalProfile>
          <img src={auctionDetail.profileUrl} alt="프로필이미지" />
          <p>{auctionDetail.nickname}</p>
        </ModalProfile>
        <ModalMain>
          <p>입금자명 : {auctionDetail.remitName}</p>
          <p>입금자 전화번호: {auctionDetail.phone}</p>
          <p>
            구매자 배송지: {auctionDetail.address}
            <span>{auctionDetail.addressDetail}</span>
          </p>
          <input placeholder="송장번호 입력"></input>
        </ModalMain>
      </Modal>
    </Container>
  );
}

export default IsSellingCardList;

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
  height: 140px;
  > p {
    margin-bottom: 15px;
  }
`;

const ButtonNav = styled.nav`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const StyledBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px 10px 0px;
  font-size: 16px;
  width: 13%;
  height: 40px;
  margin-right: 20px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlack};
  border: 2px solid ${(props) => props.theme.colors.white};
  border-radius: 24px;
  &:link {
    transition: 0.8s;
    text-decoration: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.subMint};
    border-color: ${(props) => props.theme.colors.subMint};
    cursor: pointer;
  }

  &.active {
    font-weight: 900;
    color: ${(props) => props.theme.colors.mainBlack};
    background-color: ${(props) => props.theme.colors.subMint};
    border-color: ${(props) => props.theme.colors.subMint};
    position: relative;
  }
`;
