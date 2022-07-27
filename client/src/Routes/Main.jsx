import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import StreamList from '../components/common/StreamList';
import PostList from '../components/common/PostList';
import LikeList from '../components/common/LikeList';

function Main(props) {
  return (
    <div>
      <NavigationBar />
      <StreamList />
      <PostList />
      <LikeList />
      <Footer />
    </div>
  );
}

export default Main;
