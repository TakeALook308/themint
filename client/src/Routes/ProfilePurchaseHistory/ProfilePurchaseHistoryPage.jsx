import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IsPurchasingCard from './IsPurchasingCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import { instance } from '../../utils/apis/api';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import Modal from '../../components/common/Modal';

// 별점기능
import { FaStar } from 'react-icons/fa';

function ProfilePurchaseHistoryPage({ params }) {
  // 구매내역 API 요청
  const getPurchaseUrl = (paramsnum, size) => {
    return (page) => `/api/history/purchase/${active}?page=${page}&size=${size}`;
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
    onChange({ target: { name: 'productDeliverySeq', value: auction.productDeliverySeq } });
    onChange({ target: { name: 'name', value: auction.name } });
    onChange({ target: { name: 'phone', value: auction.phone } });
  };

  // 배송정보 수정
  const [deliveryData, setDeliveryData] = useState({
    productDeliverySeq: 1,
    name: '',
    remitName: '',
    phone: '',
    address: '',
    addressDetail: '',
    zipCode: '',
  });
  const { remitName, address, addressDetail, zipCode } = deliveryData;
  const onChange = ({ target: { name, value } }) => {
    setDeliveryData({
      ...deliveryData,
      [name]: value,
    });
  };
  // 버튼 클릭하면 배송정보를 patch
  const patchDelivery = () => {
    console.log(deliveryData);
    // const patchDeliveryData = async (url, data) => {
    //   const response = await instance.patch(url, data);
    //   return response;
    // };
    // const res = patchDeliveryData(`/api/delivery`, deliveryData);
    // res.then(() => {});
  };

  // 리뷰 작성
  const [reviewData, setReviewData] = useState({
    receiverSeq: 1,
    content: '',
    score: 1,
  });
  const { content, score } = reviewData;
  const onChange2 = ({ target: { name, value } }) => {
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };
  // 버튼 클릭하면 배송정보를 patch
  const postReview = () => {
    const postReviewData = async (url, data) => {
      const response = await instance.post(url, data);
      return response;
    };
    const res = postReviewData(`/api/delivery`, reviewData);
    res.then(() => {});
  };

  // 별점기능
  const ARRAY = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  useEffect(() => {
    sendReview();
  }, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    onChange2({ target: { name: 'score', value: score } });
  };
  console.log(reviewData);

  return (
    <Container>
      <ButtonNav>
        <StyledBtn
          key={1}
          className={active === 'inprogress' ? 'active' : undefined}
          id={'inprogress'}
          onClick={onSelling}>
          진행중
        </StyledBtn>
        <StyledBtn
          key={2}
          className={active === 'complete' ? 'active' : undefined}
          id={'complete'}
          onClick={onSold}>
          구매완료
        </StyledBtn>
      </ButtonNav>
      <InfiniteAuctionList
        getUrl={getPurchaseUrl(params, 9)}
        queryKey={[`${params}${active}`]}
        CardComponent={IsPurchasingCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'구매 내역이 없습니다'}
        func={ModalHandler}
        active={active}
      />
      <Modal open={isModal} close={ModalHandler} title="구매 내역 관리">
        <ModalMain>
          {active === 'inprogress' && (
            <Purchasing>
              <p>입금 완료 후, 배송지를 입력해주세요!!!</p>
              <p>
                판매자 계좌: 은행-{purchaseDetail.bankCode} 계좌번호-{purchaseDetail.accountNo}
                계좌소유주-{purchaseDetail.name}
              </p>
              <p>입금자명:</p>
              <input
                placeholder="입금자 명을 입력해 주세요"
                name="remitName"
                value={remitName}
                onChange={onChange}></input>
              <p>배송정보 입력:</p>
              <input
                placeholder="우편번호를 입력해 주세요"
                name="zipCode"
                value={zipCode}
                onChange={onChange}></input>
              <input
                placeholder="상세 주소를 입력해 주세요"
                name="address"
                value={address}
                onChange={onChange}></input>
              <input
                placeholder="상세 주소를 입력해 주세요"
                name="addressDetail"
                value={addressDetail}
                onChange={onChange}></input>
              <button onClick={patchDelivery}>배송정보 저장</button>
            </Purchasing>
          )}
          {active === 'complete' && (
            <Purchased>
              <p>배송주소: {purchaseDetail.address}</p>
              <p>상세 배송주소: {purchaseDetail.addressDetail}</p>

              <p>배송조회</p>
              <p>리뷰 작성</p>
              <p>별점을 작성해 주세요!</p>
              <Stars>
                {ARRAY.map((el, idx) => {
                  return (
                    <FaStar
                      key={idx}
                      size="25"
                      onClick={() => handleStarClick(el)}
                      className={clicked[el] && 'yellowStar'}
                    />
                  );
                })}
              </Stars>
            </Purchased>
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

const ModalMain = styled.main`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  > p {
    margin-bottom: 15px;
  }
`;

const Purchasing = styled.div`
  width: 100%;
`;

const Purchased = styled.div`
  width: 100%;
`;

// 별점기능
const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
