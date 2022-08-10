import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IsPurchasingCardList from '../../components/ui/profile/Purchase/IsPurchaingCardList';
import { myInformationState } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { instance } from '../../utils/apis/api';

function ProfilePurchaseHistoryPage({ params }) {
  const [buyItems, setBuyItems] = useState([]);
  const [buyStatus, setBuyStatus] = useState(0);
  // 사용자랑 프로필 일치여부 확인
  const myInformation = useRecoilValue(myInformationState);
  const strMemberSeq = `${myInformation.memberSeq}`;
  // 구매내역 API 요청
  useEffect(() => {
    const getSalesAuction = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSalesAuction(`/api/history/sales/${params}?page${1}=&size=${9}`);
    res.then((items) => {
      console.log(items.data.resultList);
      setBuyItems(items.data.resultList);
      setBuyStatus(items.data.resultList.status);
    });
  }, [params]);

  // 버튼클릭으로 구매중 구매완료 구분
  const [active, setActive] = useState('1');
  const numActive = active * 1;
  const onSelling = async () => {
    setActive('1');
  };
  const onSold = async () => {
    setActive('2');
  };
  console.log(active);
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
          {numActive === 1 && (
            <IsBuyingContainer>
              {buyStatus < 3 && <IsPurchasingCardList params={params} auctionItems={buyItems} />}
            </IsBuyingContainer>
          )}
          {numActive === 2 && (
            <IsBuyingContainer>
              {buyStatus >= 3 && <IsPurchasingCardList params={params} auctionItems={buyItems} />}
            </IsBuyingContainer>
          )}
        </IsUserSame>
      )}
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

const IsBuyingContainer = styled.div`
  width: 100%;
`;

const IsUserSame = styled.div`
  width: 100%;
`;
