import React from 'react';
import NavigationBar from '../components/common/Navbar';
import PostList from '../components/common/PostList';
import StreamList from '../components/common/StreamPostList';
import Footer from '../components/common/Footer';

function MainPage(props) {
  return (
    <div>
      <NavigationBar />
      <StreamList />
      <PostList />
      <Footer />
    </div>
  );
}

export default MainPage;
