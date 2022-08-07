import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CateCardList from '../components/ui/category/CateCardList';
import Dropdown from '../components/ui/category/SelectBox';
import { getAuctionList } from '../utils/api/getAuctionApi';

function Category({ categoryName }) {
  const [categorySeq, setCategorySeq] = useState('0');
  const [sortKey, setSortKey] = useState('startTime');

  const getcategorySeq = (number) => {
    setCategorySeq(number);
  };

  const getSortKey = (value) => {
    setSortKey(value);
  };
  useEffect(() => {
    const res = getAuctionList(
      `/api/auction/category?categorySeq=${categorySeq}&page=${0}&size=${9}&sort=${sortKey}`,
    );
    return res?.data;
  }, [sortKey, categorySeq]);
  return (
    <Container>
      <CateListContainer>
        <CateCardList categoryName={categoryName} getcategorySeq={getcategorySeq} />
      </CateListContainer>
      <Dropdown getSortKey={getSortKey} />
    </Container>
  );
}
export default Category;

const Container = styled.main`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 80px;
`;

const CateListContainer = styled.header`
  margin-bottom: 1.25rem;
`;
