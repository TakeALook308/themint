import React from 'react';
import Banner from './Banner';
import StreamList from './StreamListSwipe';
import PostList from './PostList';
import { Container } from '../../style/common';
import { Helmet } from 'react-helmet';
import InterestingList from './InterestingList';

function MainPage(props) {
  return (
    <>
      <Helmet>
        <title>더민트</title>
      </Helmet>
      <Container>
        <Banner />
        <StreamList />
        <PostList />
        <InterestingList />
      </Container>
    </>
  );
}

export default MainPage;
