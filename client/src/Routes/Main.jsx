import React from 'react';
import Banner from '../components/ui/Banner';
import StreamList from '../components/list/main/StreamListSwipe';
import PostList from '../components/list/main/PostList';
import styled from 'styled-components';
import InfiniteAuctionList from '../components/common/InfiniteAuctionList';
import { auctionListApis } from '../utils/api/getAuctionApi';
import AuctionCard from '../components/common/AuctionCard';
import SkeletonAuctionCard from '../components/common/SkeletonAuctionCard';

function Main(props) {
  return (
    <Container>
      <BannerContainer>
        <Banner />
      </BannerContainer>
      <StreamList />
      <PostList />
      <InfiniteAuctionList
        url={auctionListApis.SEARCH_AUCTION_LIST_API()}
        queryKey={'interestingAuctionList'}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
      />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 1px;
`;

const BannerContainer = styled.div`
  margin-bottom: 1.25rem;
  margin-top: 60px;
`;
