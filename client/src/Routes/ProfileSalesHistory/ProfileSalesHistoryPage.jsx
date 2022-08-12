import React, { useEffect, useState } from 'react';
import { instance } from '../../utils/apis/api';
import styled from 'styled-components';
import IsSellingCardList from '../../components/ui/profile/Sell/IsSellingCardList';

function ProfileSalesHistoryPage({ params }) {
  const [sellingItem, setSellingItem] = useState([]);
  const [sellingStatus, setSellingStatus] = useState(0);
  //판매내역 API 요청
  useEffect(() => {
    const getSales = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSales(`/api/history/sales/${params}?page=${1}&size=${9}`);
    res.then((items) => {
      setSellingItem(items.data.resultList);
      setSellingStatus(items.data.resultList.status);
    });
    console.log(sellingItem);
  }, []);
  // 버튼 클릭으로 판매중 판매완료 구분
  const [active, setActive] = useState('1');
  const numActive = active * 1;
  const onSelling = () => {
    setActive('1');
  };
  const onSold = async () => {
    setActive('2');
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
      {numActive === 1 && (
        <IsSellingContainer>
          {sellingStatus < 3 && <IsSellingCardList sellingItem={sellingItem} />}
        </IsSellingContainer>
      )}
      {numActive === 2 && (
        <IsSellingContainer>
          {sellingStatus >= 3 && <IsSellingCardList sellingItem={sellingItem} />}
        </IsSellingContainer>
      )}
    </Container>
  );
}

export default ProfileSalesHistoryPage;

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

const IsSellingContainer = styled.div`
  width: 100%;
`;
