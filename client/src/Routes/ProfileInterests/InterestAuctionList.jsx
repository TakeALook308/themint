import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { instance } from '../../utils/apis/api';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import AuctionCard from '../../components/CardList/AuctionCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';

function InterestAuctionList({ params }) {
  const getUrl = (size) => {
    return (page) => `/api/interest/auction?page=0&size=${size}`;
  };

  return (
    <Container>
      <InfiniteAuctionList
        getUrl={getUrl(9)}
        queryKey={['interestAuctions']}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'판매 내역이 없습니다'}
      />
    </Container>
  );
}
export default InterestAuctionList;

const Container = styled.div`
  width: 100%;
`;
