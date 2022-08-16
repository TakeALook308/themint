import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import IsPurchasingCard from './IsPurchasingCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import { instance } from '../../utils/apis/api';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import Modal from '../../components/common/Modal';
import GradientButton from '../../components/ButtonList/GradientButton';
import { FaStar } from 'react-icons/fa';
import { MemoizedInformation } from '../AccountsEdit/Information';
import { useQueryClient } from 'react-query';
import { BsHouseFill } from 'react-icons/bs';
import AddressInput from '../AccountsEdit/AddressInput';
import { useRecoilValue } from 'recoil';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { myInformationState } from '../../atoms';
import { useQuery } from 'react-query';
import { ActiveInput } from '../../style/style';
import MintButton from '../../components/ButtonList/MintButton';

function ProfilePurchaseHistoryPage({ params }) {
  const myInformation = useRecoilValue(myInformationState);
  const getUserInfo = async () => {
    const response = await fetchData.get(userApis.USER_INFORMATION(myInformation?.memberSeq));
    return response?.data;
  };

  const { isLoading, error, data, isFetching } = useQuery(['userInformation'], getUserInfo);
  const queryClient = useQueryClient();
  const userAllInfo = queryClient.getQueryData(['userInformation']);

  // 구매내역과 판매내역 차이 구분
  const [isPurchase, setIsPurchase] = useState('purchase');
  useEffect(() => {
    setIsPurchase('purchase');
  });
  const getPurchaseUrl = (size) => {
    return (page) => `/api/history/${isPurchase}/${active}?page=${page}&size=${size}`;
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
    const res = getPurchaseDetail(`/api/history/purchase/detail/${auction.historySeq}`);
    res.then((itemDetail) => {
      setPurchaseDetail(itemDetail.data); // 상세보기 내용을 salesDetail에 저장
      console.log(itemDetail.data);
      setAuctionProductSeq(itemDetail.data.productSeq);
      onChange2({ target: { name: 'receiverSeq', value: itemDetail.data.sellerMemberSeq } });
      setDeliveryData((prevState) => {
        return { ...prevState, productDeliverySeq: itemDetail.data.productDeliverySeq };
      });
      // setDeliveryData((prevState) => {
      //   return { ...prevState, name: userAllInfo.memberName };
      // });
      // setDeliveryData((prevState) => {
      //   return { ...prevState, phone: userAllInfo.phone };
      // });
      // setDeliveryData((prevState) => {
      //   return { ...prevState, address: userAllInfo.address };
      // });
      // setDeliveryData((prevState) => {
      //   return { ...prevState, addressDetail: userAllInfo.addressDetail };
      // });
      // setDeliveryData((prevState) => {
      //   return { ...prevState, zipCode: userAllInfo.zipCode };
      // });
      setSearchDeliveryData((prevState) => {
        return { ...prevState, t_code: itemDetail.data.parcelCompanyCode };
      });
      setSearchDeliveryData((prevState) => {
        return { ...prevState, t_invoice: itemDetail.data.trackingNo };
      });
    });

    setIsModal((prev) => !prev);
    setPurchaseDetail([]);
    setReviewData([]);
  };
  // 입금완료
  const [auctionProductSeq, setAuctionProductSeq] = useState(0);

  const patchRemit = () => {
    console.log(auctionProductSeq);
    const getPatchRemit = async (url) => {
      const response = await instance.patch(url);
      return response;
    };
    const res = getPatchRemit(`/api/product/remit/${auctionProductSeq}`);
    res.then(() => {
      setIsModal((prev) => !prev);
    });
  };

  // 은행 이름으로 변경
  const bankList = {
    0: '테스트용은행',
    2: 'KDB산업은행',
    3: 'IBK기업은행',
    4: 'KB국민은행',
    7: '수협은행',
    11: 'NH농협은행',
    12: '농협중앙회(단위농축협)',
    20: '우리은행',
    23: 'SC제일은행',
    27: '한국씨티은행',
    31: '대구은행',
    32: '부산은행',
    34: '광주은행',
    35: '제주은행',
    37: '전북은행',
    39: '경남은행',
    45: '새마을금고중앙회',
    48: '신협중앙회',
    50: '저축은행중앙회',
    64: '산림조합중앙회',
    71: '우체국',
    81: '하나은행',
    88: '신한은행',
    89: '케이뱅크',
    90: '카카오뱅크',
    92: '토스뱅크',
    218: 'KB증권',
    238: '미래에셋대우',
    240: '삼성증권',
    243: '한국투자증권',
    247: 'NH투자증권',
    261: '교보증권',
    262: '하이투자증권',
    263: '현대차증권',
    264: '키움증권',
    265: '이베스트투자증권',
    266: 'SK증권',
    267: '대신증권',
    269: '한화투자증권',
    278: '신한금융투자',
    279: 'DB금융투자',
    280: '유진투자증권',
    287: '메리츠증권',
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
  const onChange = (e) => {
    setDeliveryData((prevState) => {
      console.log(e.target.value);
      return { ...prevState, remitName: e.target.value };
    });
  };
  // console.log(userAllInfo.address);
  const onClick = () => {
    const data = queryClient.getQueryData(['userInformation']);
    const newData = {
      productDeliverySeq: deliveryData.productDeliverySeq,
      name: data.memberName,
      remitName: deliveryData.remitName,
      phone: data.phone,
      address: data.address,
      addressDetail: data.addressDetail,
      zipCode: data.zipCode,
    };
    const patchDeliveryData = (url, data) => {
      const response = instance.patch(url, data);
      return response;
    };
    const res = patchDeliveryData(`/api/delivery`, newData);
    res.then(() => {
      setIsModal((prev) => !prev);
      console.log(newData);
    });
    // 버튼 클릭하면 배송정보를 patch
  };

  // 배송 조회
  const [searchDeliveryData, setSearchDeliveryData] = useState({
    t_key: 'F021Ir60YiVKvqs5Fx4AXw',
    t_code: '',
    t_invoice: '',
  });

  // 리뷰 작성
  const [reviewData, setReviewData] = useState({
    content: '',
    receiverSeq: 1,
    score: 1,
  });
  const { content, score } = reviewData;
  const onChange2 = ({ target: { name, value } }) => {
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };
  // 버튼 클릭하면 리뷰 정보를 post
  const postReview = () => {
    console.log(reviewData);
    const postReviewData = async (url, data) => {
      const response = await instance.post(url, data);
      return response;
    };
    const res = postReviewData(`/api/review`, reviewData);
    res.then(() => {
      setIsModal((prev) => !prev);
    });
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
  const ConsoleD = () => {
    console.log(searchDeliveryData);
  };
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
        queryKey={[`${params}${active}${isPurchase}${isModal}`]}
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
              {purchaseDetail.status === 1 && (
                <PutMoney>
                  <p>입금을 완료 하셨나요??</p>
                  <MintButton onClick={patchRemit} text="입금완료" size="30%" />
                </PutMoney>
              )}
              {purchaseDetail.status === 2 && (
                <PutAddress>
                  <h3>배송지를 입력해주세요!!!</h3>
                  <p>판매자 계좌 정보</p>
                  <SellerInfo>
                    <p>은행명: {bankList[purchaseDetail.bankCode]}</p>
                    <p>계좌번호: {purchaseDetail.accountNo}</p>
                    <p>계좌소유주: {purchaseDetail.name}</p>
                  </SellerInfo>
                  <ActiveInput active={true}>
                    <input
                      name="remitName"
                      id="remitName"
                      type="text"
                      autoComplete="off"
                      required
                      onChange={onChange}
                      placeholder=""
                    />
                    <label htmlFor="nickname">입금자명</label>
                  </ActiveInput>
                  <p>배송 정보 입력</p>
                  <MemoizedInformation
                    icon={<BsHouseFill aria-label="주소" />}
                    textList={[
                      userAllInfo?.zipCode,
                      userAllInfo?.address,
                      userAllInfo?.addressDetail,
                    ]}
                    Component={AddressInput}
                    userAllInfo={userAllInfo}
                  />
                  <ButtonContainer>
                    <GradientButton
                      onClick={onClick}
                      text="배송지 입력"
                      size="30%"></GradientButton>
                  </ButtonContainer>
                </PutAddress>
              )}
            </Purchasing>
          )}
          {active === 'complete' && (
            <Purchased>
              <p>배송주소: {purchaseDetail.address}</p>
              <p>상세 배송주소: {purchaseDetail.addressDetail}</p>
              <p>배송조회</p>
              <form
                action="http://info.sweettracker.co.kr/tracking/2"
                method="post"
                target="_blank">
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control"
                    id="t_key"
                    name="t_key"
                    placeholder="제공받은 APIKEY"
                    value={'F021Ir60YiVKvqs5Fx4AXw'}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control"
                    name="t_code"
                    id="t_code"
                    placeholder="택배사 코드"
                    value={searchDeliveryData.t_code}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control"
                    name="t_invoice"
                    id="t_invoice"
                    placeholder="운송장 번호"
                    value={searchDeliveryData.t_invoice}
                  />
                </div>
                <Button type="submit" className="btn btn-default" onClick={ConsoleD}>
                  배송 조회
                </Button>
              </form>
              <p>리뷰 작성</p>
              <p>별점을 선택해 주세요!</p>
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
              <textarea
                type="text"
                onChange={onChange2}
                name="content"
                value={content}
                cols="70"
                rows="4"
                placeholder="리뷰를 작성해 주세요"></textarea>
              <Button onClick={postReview}>리뷰작성</Button>
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
  border-radius: 10px;
  > p {
    margin-bottom: 15px;
  }
`;

const Purchasing = styled.div`
  width: 100%;
  > p {
    margin-bottom: 10px;
  }
  > input {
    margin-bottom: 10px;
  }
  > button {
    margin-bottom: 10px;
  }
  > div {
    margin-bottom: 15px;
  }
`;

const Purchased = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 별점기능
const Stars = styled.div`
  display: flex;
  margin-bottom: 10px;
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

const SellerInfo = styled.article`
  background-color: ${(props) => props.theme.colors.pointBlack};
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  > p {
    padding: 5px 10px 5px 10px;
  }
`;

const PutMoney = styled.div`
  > p {
    margin-bottom: 10px;
  }
`;

const PutAddress = styled.div`
  > h3 {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  > p {
    margin-bottom: 10px;
  }
  > div {
    margin-bottom: 10px;
  }
  > textarea {
    margin-bottom: 10px;
    padding: 10px;
  }
  > form {
    margin-bottom: 10px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const shine = keyframes`
   0% {
     background-position: 0% 50%;
     }
   50% {
     background-position: 100% 50%;
     }
   100% {
     background-position: 0% 50%;
     }
`;

const Button = styled.button`
  margin: 10px 0px;
  width: ${(props) => (props.size ? props.size : '30%')};
  height: 25px;
  background: ${(props) => props.theme.colors.gradientMintToPurple};
  border-radius: 5px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: bold;
  cursor: pointer;
  background-size: 200% 200%;
  border-radius: 5px;
  transition: all 0.4s ease;
  &:hover {
    animation: ${shine} 3s infinite linear;
  }
  &:disabled {
    background: ${(props) => props.theme.colors.disabledGray};
    color: ${(props) => props.theme.colors.pointGray};
    cursor: not-allowed;
  }
`;
