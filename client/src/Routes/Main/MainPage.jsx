import React from 'react';
import Banner from './Banner';
import StreamList from './StreamListSwipe';
import PostList from './PostList';
import InterestingAuctionList from '../../components/InterestingAuctionList';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import { auctionListApis } from '../../utils/apis/auctionApis';
import AuctionCard from '../../components/CardList/AuctionCard';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import { Container } from '../../style/common';
import useLogout from '../../utils/hooks/useLogout';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import InterestingList from './InterestingList';

function MainPage(props) {
  const logout = useLogout();
  return (
    <>
      <Helmet>
        <title>더민트</title>
      </Helmet>
      <Container>
        <button onClick={logout}>로그아웃</button>
        <Banner />
        <StreamList />
        <PostList />
        <InterestingList />
        {/* <InterestingAuctionList /> */}
      </Container>
    </>
  );
}

export default MainPage;
