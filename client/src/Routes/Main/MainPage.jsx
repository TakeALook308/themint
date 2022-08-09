import React from 'react';
import Banner from '../../components/ui/main/Banner';
import StreamList from '../../components/ui/main/StreamListSwipe';
import PostList from '../../components/ui/main/PostList';
import styled from 'styled-components';
import InterestingAuctionList from '../../components/InterestingAuctionList';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import { auctionListApis } from '../../utils/api/getAuctionApi';
import AuctionCard from '../../components/CardList/AuctionCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import { Container } from '../../style/common';

function MainPage(props) {
  return (
    <Container>
      <Banner />
      <StreamList />
      <PostList />
      <InfiniteAuctionList
        url={auctionListApis.SEARCH_AUCTION_LIST_API()}
        queryKey={'interestingAuctionList'}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
      />
      <InterestingAuctionList />
    </Container>
  );
}

export default MainPage;
