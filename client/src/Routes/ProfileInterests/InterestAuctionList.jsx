import React from 'react';
import styled from 'styled-components';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import InterestAuctionCard from './InterestAuctionCard';
import { instance } from '../../utils/apis/api';
import { useEffect } from 'react';

function InterestAuctionList({ params }) {
  const getUrl = (size) => {
    return (page) => `/api/interest/auction?page=0&size=${size}`;
  };

  const deleteAuction = (auction) => {
    const deleteInterest = async (url) => {
      const response = await instance.delete(url);
      return response;
    };
    console.log(auction.hash);
    const res = deleteInterest(`/api/interest/auction/${auction.hash}`);
    res.then(() => {});
  };

  return (
    <Container>
      <InfiniteAuctionList
        getUrl={getUrl(9)}
        queryKey={['interestAuctions']}
        CardComponent={InterestAuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'관심 경매 내역이 없습니다'}
        func={deleteAuction}
      />
    </Container>
  );
}
export default InterestAuctionList;

const Container = styled.div`
  width: 100%;
`;
