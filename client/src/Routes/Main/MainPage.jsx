import React from 'react';
import Banner from './Banner';
import StreamList from './StreamListSwipe';
import PostList from './PostList';
import InterestingAuctionList from '../../components/InterestingAuctionList';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import { auctionListApis } from '../../utils/api/getAuctionApi';
import AuctionCard from '../../components/CardList/AuctionCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import { Container } from '../../style/common';
import useLogout from '../../utils/hooks/useLogout';

function MainPage(props) {
  const logout = useLogout();
  return (
    <Container>
      <button onClick={logout}>로그아웃</button>
      <Banner />
      <StreamList />
      <PostList />
      {/* <InfiniteAuctionList
        url={auctionListApis.SEARCH_AUCTION_LIST_API()}
        queryKey={'interestingAuctionList'}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
      /> */}
    </Container>
  );
}

export default MainPage;
