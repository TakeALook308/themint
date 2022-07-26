import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import PostList from '../components/common/PostList';
import StreamList from '../components/common/StreamPostList';
import Footer from '../components/common/Footer';
import LikeList from '../components/common/LikeList';
import Slide from '../components/common/Carousel';

function MainPage(props) {
  return (
    <div>
      <NavigationBar />
      <StreamList />
      <PostList />
      <LikeList />
      <Slide />
      <Footer />
    </div>
  );
}

export default MainPage;
