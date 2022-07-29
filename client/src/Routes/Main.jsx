import React from 'react';
import PostList from '../components/common/PostList';
import LikeList from '../components/common/LikeList';
import StreamList from '../components/common/StreamListSwipe';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import Banner from '../components/common/Banner';

function Main(props) {
  return (
    <div>
      <NavigationBar />
      <Banner />
      <StreamList />
      <PostList />
      <LikeList />
      <Footer />
    </div>
  );
}

export default Main;
