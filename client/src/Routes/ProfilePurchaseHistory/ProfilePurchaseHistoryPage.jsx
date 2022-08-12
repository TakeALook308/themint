import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IsPurchasingCard from './IsPurchasingCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import { myInformationState } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { instance } from '../../utils/apis/api';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import Modal from '../../components/common/Modal';

function ProfilePurchaseHistoryPage({ params }) {
  // 사용자랑 프로필 일치여부 확인
  const myInformation = useRecoilValue(myInformationState);
  const strMemberSeq = `${myInformation.memberSeq}`;
  // 구매내역 API 요청
  const getPurchaseUrl = (paramsnum, size) => {
    return (page) => `/api/history/purchase/${active}?${paramsnum}?page=${page}&size=${size}`;
  };

  // 버튼클릭으로 구매중 구매완료 구분
  const [active, setActive] = useState('inprogress');
  const onSelling = async () => {
    setActive('inprogress');
  };
  const onSold = async () => {
    setActive('complete');
  };
  // Modal 연결
  const [purchaseDetail, setPurchaseDetail] = useState([]); // 판매내역 상세 내용 저장
  const [isModal, setIsModal] = useState(false);

  const ModalHandler = (auction) => {
    const getPurchaseDetail = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getPurchaseDetail(`/api/history/sales/detail/${auction.historySeq}`);
    res.then((itemDetail) => {
      setPurchaseDetail(itemDetail.data); // 상세보기 내용을 salesDetail에 저장
    });
    setIsModal((prev) => !prev);
    setPurchaseDetail([]);
  };

  return (
    <Container>
      <ButtonNav>
        <StyledBtn
          key={1}
          className={active === '1' ? 'active' : undefined}
          id={'1'}
          onClick={onSelling}>
          진행중
        </StyledBtn>
        <StyledBtn
          key={2}
          className={active === '2' ? 'active' : undefined}
          id={'2'}
          onClick={onSold}>
          구매완료
        </StyledBtn>
      </ButtonNav>
      {params === strMemberSeq && (
        <IsUserSame>
          <InfiniteAuctionList
            getUrl={getPurchaseUrl(params, 9)}
            queryKey={[`${params}${active}`]}
            CardComponent={IsPurchasingCard}
            SkeltonCardComponent={SkeletonAuctionCard}
            text={'판매 내역이 없습니다'}
            func={ModalHandler}
            active={active}
          />
        </IsUserSame>
      )}
      <Modal open={isModal} close={ModalHandler} title="구매 내역 관리">
        <ModalMain>
          <p>입금 완료 후, 배송지를 입력해주세요!!!</p>
          <p>
            판매자 계좌: 은행-{purchaseDetail.bankCode} 계좌번호-{purchaseDetail.accountNo}
            계좌소유주-{purchaseDetail.name}
          </p>
          <button>내 정보 불러오기</button>
          <p>입금자명:</p>
          {/* <input placeholder="입금자 명을 입력해 주세요" name="remitName" value={remitName}></input> */}
          <p>배송정보 입력:</p>
          <input
            placeholder="상세 주소를 입력해 주세요"
            name="addressDetail"
            // value={paddressDetail}
          ></input>
          <button>배송정보 저장</button>
          {purchaseDetail.status < 4 && (
            <ModalMain>
              <p>배송정보</p>
              <p>배송조회</p>
              <p>리뷰작성</p>
            </ModalMain>
          )}
        </ModalMain>
      </Modal>
    </Container>
  );
}

export default ProfilePurchaseHistoryPage;

const Container = styled.div`
  width: 100%;
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

const IsUserSame = styled.div`
  width: 100%;
`;

const ModalMain = styled.main`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  > p {
    margin-bottom: 15px;
  }
`;
