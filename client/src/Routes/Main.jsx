import React from 'react';
import PostList from '../components/common/PostList';
import StreamList from '../components/common/StreamListSwipe';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';

function Main(props) {
  return (
    <div>
      <NavigationBar />
      <StreamList />
      <PostList />
      <Footer />
    </div>
  );
}

export default Main;
