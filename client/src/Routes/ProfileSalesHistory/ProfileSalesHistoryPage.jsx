import React, { useEffect, useState } from 'react';
import { instance } from '../../utils/apis/api';
import styled from 'styled-components';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import IsSellingCard from '../../components/ui/profile/Sell/IsSellingCard';
import axios from 'axios';
import Modal from '../../components/common/Modal';

function ProfileSalesHistoryPage({ params }) {
  const [sellingItem, setSellingItem] = useState([]);
  const [sellingStatus, setSellingStatus] = useState(0);
  //판매내역 API 요청
  useEffect(() => {
    const getSales = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSales(`/api/history/sales/${params}?page=${0}&size=${100}`);
    res.then((items) => {
      setSellingItem(items.data.resultList);
      setSellingStatus(items.data.resultList.status);
    });
    console.log(sellingItem);
  }, []);
  const getSalesUrl = (paramsnum, size) => {
    return (page) => `/api/history/sales/${paramsnum}?page=${page}&size=${size}`;
  };
  // 버튼 클릭으로 판매중 판매완료 구분
  const [active, setActive] = useState('1');
  const numActive = active * 1;
  const onSelling = () => {
    setActive('1');
  };
  const onSold = async () => {
    setActive('2');
  };

  // Modal 연결
  const [historySeq, setHistorySeq] = useState(1); // 판매내역 상세 요청 seq값 저장
  const [salesDetail, setSalesDetail] = useState([]); // 판매내역 상세 내용 저장
  const [isModal, setIsModal] = useState(false);
  const ModalHandler = (number) => {
    setIsModal((prev) => !prev);
    setHistorySeq(number); // 모달 버튼 누르면 그 옥션의 historyseq를 historySeq에 저장
    // 판매내역 상세보기 API 요청 -> 상세내역
  };
  console.log('historySeq', historySeq);

  useEffect(() => {
    const getSalesDetail = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesDetail(`/api/history/sales/detail/${historySeq}`); // 테스트는 32넣어서 확인
    console.log(historySeq);
    res.then((itemDetail) => {
      setSalesDetail(itemDetail.data); // 상세보기 내용을 salesDetail에 저장
    });
  }, [historySeq]);
  console.log(salesDetail);
  // 송장번호 입력& PATCH 요청을 위한 getTrackingNo
  const [getTrackingNo, setGetTrackingNo] = useState({
    productSeq: sellingItem.productSeq,
    parcelCompanyCode: '',
    trackingNo: '',
  });
  console.log(sellingItem.productSeq);
  // 택배사 코드 이름 리스트
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    const getCompanyCode = async (url) => {
      const response = await axios.get(url);
      return response;
    };
    const res = getCompanyCode(
      `http://info.sweettracker.co.kr/api/v1/companylist?t_key=F021Ir60YiVKvqs5Fx4AXw`,
    );
    res.then((codelist) => {
      setCompanyList(codelist.data.Company);
    });
  }, []);
  // 송장번호 입력, 택배사 코드 저장하기
  const { parcelCompanyCode, trackingNo } = getTrackingNo;
  const onChange = ({ target: { name, value } }) => {
    setGetTrackingNo({
      ...getTrackingNo,
      [name]: value,
    });
  };
  console.log(sellingItem);

  // 버튼 클릭하면 송장번호를 patch
  const onClick = () => {
    const patchTrackingNo = async (url) => {
      const response = await instance.patch(url);
      return response;
    };
    const res = patchTrackingNo(`/api/delivery/trackingno`, getTrackingNo);
    res.then(() => {});
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
      {/* {numActive === 1 && (
        <IsSellingContainer>
          {sellingStatus < 3 && <IsSellingCardList sellingItem={sellingItem} />}
        </IsSellingContainer>
      )}
      {numActive === 2 && (
        <IsSellingContainer>
          {sellingStatus >= 3 && <IsSellingCardList sellingItem={sellingItem} />}
        </IsSellingContainer>
      )} */}
      <InfiniteAuctionList
        getUrl={getSalesUrl(params, 9)}
        queryKey={['imminentAuctionList']}
        CardComponent={IsSellingCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'실시간 임박 경매가 없습니다.'}
        func={ModalHandler}
      />
      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <ModalProfile>
          <img src={process.env.REACT_APP_IMAGE_URL + salesDetail.profileUrl} alt="프로필이미지" />
          <p>{salesDetail.nickname}</p>
        </ModalProfile>
        <ModalMain>
          <p>입금자명 : {salesDetail.remitName}</p>
          <p>입금자 전화번호: {salesDetail.phone}</p>
          <p>
            구매자 배송지: {salesDetail.address}
            <span>{salesDetail.addressDetail}</span>
          </p>
          <select onChange={onChange} name="parcelCompanyCode" value={parcelCompanyCode}>
            {companyList.map((companyList) => (
              <option value={companyList.Code} key={companyList.Code}>
                {companyList.Name}
              </option>
            ))}
          </select>
          <br />
          <input
            placeholder="송장번호 입력"
            onChange={onChange}
            name="trackingNo"
            value={trackingNo}></input>
          <button onClick={onClick}>송장번호 저장</button>
        </ModalMain>
      </Modal>
    </Container>
  );
}

export default ProfileSalesHistoryPage;

const Container = styled.div`
  width: 100%;
  min-height: calc(100% - 258px);
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

const ModalProfile = styled.div`
  border-radius: 10px;
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
  height: 200px;
  > p {
    margin-bottom: 15px;
  }
  > select {
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
  }
  > input {
    padding: 5px 30px 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
  }
  > button {
    padding: 5px;
  }
`;
