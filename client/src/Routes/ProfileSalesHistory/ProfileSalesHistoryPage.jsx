import React, { useEffect, useState } from 'react';
import { instance } from '../../utils/apis/api';
import styled from 'styled-components';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import IsSellingCard from './IsSellingCard';
import axios from 'axios';
import Modal from '../../components/common/Modal';
import { Link } from 'react-router-dom';

// 판매중. 판매완료 구분 미해결
function ProfileSalesHistoryPage({ params }) {
  // 판매내역 전체 요청 API

  // 버튼 클릭으로 판매중 판매완료 구분
  const [active, setActive] = useState('inprogress');
  const onSelling = () => {
    setActive('inprogress');
  };
  const onSold = () => {
    setActive('complete');
  };

  // Modal 연결
  const [salesDetail, setSalesDetail] = useState([]); // 판매내역 상세 내용 저장
  const [isModal, setIsModal] = useState(false);

  const getUrl = (paramsnum, size) => {
    return (page) => `/api/history/sales/${active}/${paramsnum}?page=${page}&size=${size}`;
  };

  const ModalHandler = (auction) => {
    const getSalesDetail = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesDetail(`/api/history/sales/detail/${auction.historySeq}`);
    res.then((itemDetail) => {
      setSalesDetail(itemDetail.data); // 상세보기 내용을 salesDetail에 저장
    });
    onChange({ target: { name: 'productSeq', value: auction.productSeq } });
    setIsModal((prev) => !prev);
    setSalesDetail([]);
  };

  // 송장번호 입력& PATCH 요청을 위한 getTrackingNo
  const [getTrackingNo, setGetTrackingNo] = useState({
    productSeq: 1,
    parcelCompanyCode: '',
    trackingNo: '',
  });
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

  // 버튼 클릭하면 송장번호를 patch
  const onClick = () => {
    const patchTrackingNo = async (url, data) => {
      const response = await instance.patch(url, data);
      return response;
    };

    const res = patchTrackingNo(`/api/delivery/trackingno`, getTrackingNo);
    res.then(() => {
      setIsModal((prev) => !prev);
      setGetTrackingNo({});
    });
  };
  return (
    <Container>
      <ButtonNav>
        <StyledBtn
          key={1}
          className={active === 'inprogress' ? 'active' : undefined}
          id={'1'}
          onClick={onSelling}>
          판매중
        </StyledBtn>
        <StyledBtn
          key={2}
          className={active === 'complete' ? 'active' : undefined}
          id={'2'}
          onClick={onSold}>
          판매완료
        </StyledBtn>
      </ButtonNav>
      <InfiniteAuctionList
        getUrl={getUrl(params, 9)}
        queryKey={[`${params}${active}${isModal}`]}
        CardComponent={IsSellingCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'판매 내역이 없습니다'}
        func={ModalHandler}
        active={active}
      />
      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <ModalProfile>
          <picture>
            <img
              src={process.env.REACT_APP_IMAGE_URL + salesDetail.profileUrl}
              alt="프로필이미지"
            />
          </picture>
          <p>{salesDetail.nickname}</p>
        </ModalProfile>
        <ModalMain>
          <p>
            입금자명 : {salesDetail.remitName}
            <StyledLink to={`/auctions/${salesDetail?.hash}`}>제품 정보 상세보기</StyledLink>
          </p>
          <p>입금자 전화번호: {salesDetail.phone}</p>
          <hr />
          <h3>구매자 배송지 </h3>
          <p>우편번호: {salesDetail.zipCode}</p>
          <p>
            {salesDetail.address} {salesDetail.addressDetail}
          </p>
          <select onChange={onChange} name="parcelCompanyCode" value={parcelCompanyCode}>
            <option value="none" hidden>
              택배 회사 선택
            </option>
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
          <Plus onClick={onClick}>송장번호 저장</Plus>
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
  > picture {
    width: 20%;
    height: 100%;
    border-radius: 50%;
    margin-right: 20px;
    border: 2px solid ${(props) => props.theme.colors.subMint};
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  > p {
    font-size: 24px;
    font-weight: bold;
  }
`;

const ModalMain = styled.main`
  width: 100%;
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
  > h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const Plus = styled.button`
  border-radius: 5px;
  padding: 5px;
  background-color: ${(props) => props.theme.colors.mainBlack};
  color: ${(props) => props.theme.colors.subMint};
  border: 1px solid ${(props) => props.theme.colors.subMint};

  :hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px 10px 5px 10px;
  color: ${(props) => props.theme.colors.mainBlack};
  background-color: ${(props) => props.theme.colors.subMint};
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 10px;
`;
