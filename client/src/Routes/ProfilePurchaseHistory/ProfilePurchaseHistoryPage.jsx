import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IsPurchasingCard from './IsPurchasingCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import { instance } from '../../utils/apis/api';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import Modal from '../../components/common/Modal';
import GradientButton from '../../components/ButtonList/GradientButton';
import PopupDom from '../Register/PopupDom';
import PopupPostCode from '../Register/PopupPostCode';
import { InputContainer } from '../Register/Register2';
import { ActiveInput } from '../../style/style';
import MintButton from '../../components/ButtonList/MintButton';
import { REGISTER_MESSAGE } from '../../utils/constants/constant';
import { useForm } from 'react-hook-form';

// 별점기능
import { FaStar } from 'react-icons/fa';
// let currentPath = '';
function ProfilePurchaseHistoryPage({ params }) {
  // 새로고침?
  // let location = useLocation();
  // useEffect(() => {
  //   if (currentPath === location.pathname) window.location.reload();

  //   currentPath = location.pathname;
  // }, [location]);
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
    const res = getPurchaseDetail(`/api/history/purchase/detail/${auction.historySeq}`);
    res.then((itemDetail) => {
      setPurchaseDetail(itemDetail.data); // 상세보기 내용을 salesDetail에 저장
      console.log(itemDetail.data);
      onChange({
        target: { name: 'productDeliverySeq', value: itemDetail.data.productDeliverySeq },
      });
      onChange({ target: { name: 'name', value: itemDetail.data.name } });
      onChange({ target: { name: 'phone', value: itemDetail.data.phone } });
    });
    onChange({ target: { name: 'name', value: auction.name } });
    onChange({ target: { name: 'phone', value: auction.phone } });

    setIsModal((prev) => !prev);
    setPurchaseDetail([]);
  };
  // 입금완료
  const patchRemit = () => {
    // const getPatchRemit = async (url) => {
    //   const response = await instance.get(url);
    //   return response;
    // };
    // const res = getPatchRemit(`/api/product/remit/${auction.productSeq}`);
    // res.then(() => {});
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
  const { remitName, address, addressDetail, zipCode } = deliveryData;
  const onChange = ({ target: { name, value } }) => {
    setDeliveryData({
      ...deliveryData,
      [name]: value,
    });
  };
  // 주소입력 API 활용
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPostCode = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  const {
    register,
    setError,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      address: '',
    },
    mode: 'onChange',
  });
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
    console.log(purchaseDetail);
    console.log(reviewData);
    // const postReviewData = async (url, data) => {
    //   const response = await instance.post(url, data);
    //   return response;
    // };
    // const res = postReviewData(`/api/delivery`, reviewData);
    // res.then(() => {});
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
    console.log(purchaseDetail);
    onChange2({ target: { name: 'receiverSeq', value: purchaseDetail.receiverSeq } });
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
              <button onClick={patchRemit}>입금완료!</button>
              <p>입금 완료 후, 배송지를 입력해주세요!!!</p>
              <p>판매자 계좌: </p>
              <p>은행-{bankList[purchaseDetail.bankCode]}</p>
              <p>계좌번호-{purchaseDetail.accountNo}</p>
              <p>계좌소유주-{purchaseDetail.name}</p>
              <p>입금자명:</p>
              <StyledInput
                placeholder="입금자 명을 입력해 주세요"
                name="remitName"
                value={remitName}
                onChange={onChange}
              />
              <p>배송정보 입력:</p>
              {/* <StyledInput
                placeholder="우편번호를 입력해 주세요"
                name="zipCode"
                value={zipCode}
                onChange={onChange}
                size="30%"
              />
              <StyledInput
                placeholder="주소를 입력해 주세요"
                name="address"
                value={address}
                onChange={onChange}
              />
              <StyledInput
                placeholder="상세 주소를 입력해 주세요"
                name="addressDetail"
                value={addressDetail}
                onChange={onChange}
              /> */}
              <InputContainer>
                <ActiveInput active={true}>
                  <input
                    name="zipCode"
                    id="zipCode"
                    type="text"
                    {...register('zipCode', {
                      required: REGISTER_MESSAGE.REQUIRED_ADDRESS,
                      disabled: true,
                    })}
                    disabled
                    placeholder=" "
                    required
                  />
                  <label htmlFor="zipCode">우편번호</label>
                </ActiveInput>
                <MintButton text={'조회'} type={'button'} onClick={openPostCode} />
              </InputContainer>
              <div id="popupDom">
                {isPopupOpen && (
                  <PopupDom>
                    <PopupPostCode onClose={closePostCode} setAddress={setValue} />
                  </PopupDom>
                )}
              </div>
              <AddressContainer>
                <ActiveInput active={true}>
                  <input
                    name="address"
                    id="address"
                    type="text"
                    {...register('address', {
                      disabled: true,
                    })}
                    placeholder=" "
                  />
                  <label htmlFor="address">주소</label>
                </ActiveInput>
                <ActiveInput active={true}>
                  <input
                    name="addressDetail"
                    id="addressDetail"
                    type="text"
                    {...register('addressDetail')}
                    disabled
                    placeholder=" "
                  />
                  <label htmlFor="addressDetail">상세주소</label>
                </ActiveInput>
              </AddressContainer>
              {/* <div>
                <button type="button" onClick={openPostCode}>
                  우편번호 검색
                </button>
                <div id="popupDom">
                  {isPopupOpen && (
                    <PopupDom>
                      <PopupPostCode onClose={closePostCode} />
                    </PopupDom>
                  )}
                </div>
              </div> */}
              <button onClick={patchDelivery}>배송정보 저장</button>
            </Purchasing>
          )}
          {active === 'complete' && (
            <Purchased>
              <p>배송주소: {purchaseDetail.address}</p>
              <p>상세 배송주소: {purchaseDetail.addressDetail}</p>

              <p>배송조회</p>
              <p>리뷰 작성</p>
              <input type="text" onChange={onChange2} name="content" value={content}></input>
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
              <GradientButton onClick={postReview} text="리뷰작성" size="20%"></GradientButton>
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
  > ActiveInputBox {
    margin-bottom: 10px;
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
`;

const Purchased = styled.div`
  width: 100%;
  > p {
    margin-bottom: 10px;
  }
  > input {
    margin-bottom: 10px;
  }
`;

// 별점기능
const Stars = styled.div`
  display: flex;
  padding-top: 5px;
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

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.colors.pointBlack};
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: ${(props) => (props.active ? '20px 10px 10px' : '10px')};
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  outline: none;
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
