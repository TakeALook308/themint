import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import PostList from '../components/common/PostList';
import LikeList from '../components/common/LikeList';
import SwiperList from '../components/StreamListSwipe';

function Main(props) {
  return (
    <div>
      <NavigationBar />
      <SwiperList />
      <PostList />
      <LikeList />
      <Footer />
    </div>
  );
}

export default Main;
