import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { instance } from '../../../../utils/apis/api';
import styled from 'styled-components';
import IsSellingCard from './IsSellingCard';
import Modal from '../../../common/Modal';

function IsSellingCardList({ sellingItem }) {
  // API 확인후 삭제
  const auctionitem = {
    historyseq: 11,
    memberSeq: 1,
    productSeq: 11,
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
  // Modal 연결
  const [historySeq, setHistorySeq] = useState(0); // 판매내역 상세 요청 seq값 저장
  const [salesDetail, setSalesDetail] = useState([]); // 판매내역 상세 내용 저장
  const [isModal, setIsModal] = useState(false);
  const ModalHandler = () => {
    setIsModal((prev) => !prev);
    setHistorySeq(auctionitem.historyseq); // 모달 버튼 누르면 그 옥션의 historyseq를 historySeq에 저장
    // 판매내역 상세보기 API 요청 -> 상세내역
    const getSalesDetail = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesDetail(`/api/history/sales/detail/${historySeq}`);
    res.then((itemDetail) => {
      setSalesDetail(itemDetail.data); // 상세보기 내용을 salesDetail에 저장 (API연결 500뜸)!!
    });
  };
  // 송장번호 입력& PATCH 요청을 위한 getTrackingNo
  const [getTrackingNo, setGetTrackingNo] = useState({
    productSeq: `${auctionitem.productSeq}`,
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
  const { parcelCompanyCode, trackingNo } = getTrackingNo; // productSeq만 가져오면 해결!
  const onChange = ({ target: { name, value } }) => {
    setGetTrackingNo({
      ...getTrackingNo,
      [name]: value,
    });
  };
  console.log(getTrackingNo);

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
        {/* <IsSellingCard sellingItem={sellingItem} ModalHandler={ModalHandler}></IsSellingCard> */}
        <IsSellingCard
          auctionitem={auctionitem}
          ModalHandler={ModalHandler}
          onChange={onChange}></IsSellingCard>
      </CardContainer>
      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        {/* auctionDetail -> salesDetail로 변경 */}
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
          <select onChange={onChange} name="parcelCompanyCode" value={parcelCompanyCode}>
            {companyList.map((companyList) => (
              <option value={companyList.Code} key={companyList.Code}>
                {companyList.Name}
              </option>
            ))}
          </select>
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
  height: 140px;
  > p {
    margin-bottom: 15px;
  }
`;
