import React from 'react';
import Banner from '../components/ui/Banner';
import StreamList from '../components/list/main/StreamListSwipe';
import PostList from '../components/list/main/PostList';

function Main(props) {
  return (
    <div>
      <Banner />
      <StreamList />
      <PostList />
    </div>
  );
}

export default Main;
