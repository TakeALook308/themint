import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { instance } from '../../../../utils/apis/api';
import styled from 'styled-components';
import IsSellingCard from './IsSellingCard';
import Modal from '../../../common/Modal';

function IsSellingCardList({ sellingItem }) {
  // Modal 연결
  const [historySeq, setHistorySeq] = useState(1); // 판매내역 상세 요청 seq값 저장
  const [salesDetail, setSalesDetail] = useState([]); // 판매내역 상세 내용 저장
  const [isModal, setIsModal] = useState(false);
  const ModalHandler = () => {
    setIsModal((prev) => !prev);
    setHistorySeq(sellingItem.historyseq); // 모달 버튼 누르면 그 옥션의 historyseq를 historySeq에 저장

    // 판매내역 상세보기 API 요청 -> 상세내역
  };
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
    productSeq: `${sellingItem.productSeq}`,
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
      <CardContainer>
        <IsSellingCard
          sellingItem={sellingItem}
          ModalHandler={ModalHandler}
          onChange={onChange}></IsSellingCard>
      </CardContainer>
      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <ModalProfile>
          <img src={salesDetail.profileUrl} alt="프로필이미지" />
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
