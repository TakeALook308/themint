import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../style/common';
import { getAuctionList } from '../utils/api/getAuctionApi';

function Category({ categoryName }) {
  const [categorySeq, setCategorySeq] = useState('0');
  const [sortKey, setSortKey] = useState('startTime');
  const [auctions, setAuctions] = useState(null);
  const getCategorySeq = (value) => {
    setCategorySeq(value);
  };

  const getSortKey = (value) => {
    setSortKey(value);
  };
  useEffect(() => {
    const res = getAuctionList(
      `/api/auction/category?categorySeq=${categorySeq}&page=${0}&size=${9}&sort=${sortKey}`,
    );
    res.then((auctions) => {
      setAuctions(auctions.data);
      console.log(auctions.data);
    });
  }, [sortKey, categorySeq]);
  return (
    <Container>
      <CateListContainer></CateListContainer>
    </Container>
  );
}
export default Category;

const CateListContainer = styled.header`
  margin-bottom: 1.25rem;
`;
