import React, { useEffect, useState } from 'react';
import { instance } from '../../utils/api/api';
import styled from 'styled-components';
import IsSellingCardList from '../../components/ui/profile/Sell/IsSellingCardList';

function ProfileSalesHistoryPage({ params }) {
  console.log(params);
  const [sellingItem, setSellingItem] = useState([]);
  useEffect(() => {
    const getSales = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getSales(`/api/history/sales/${params}?page=${1}&size=${9}`);
    res.then((items) => {
      setSellingItem(items.data);
      console.log(sellingItem);
    });
  }, []);
  // 판매중/ 판매완료 구분 버튼 기능
  const [active, setActive] = useState(1);
  const getActive = (value) => {
    setActive(value);
    console.log(active);
  };

  return (
    <Container>
      <IsSellingCardList sellingItem={sellingItem} />
    </Container>
  );
}

export default ProfileSalesHistoryPage;

const Container = styled.div`
  width: 100%;
`;
