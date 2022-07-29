import React from 'react';
import PostList from '../components/common/PostList';
// import MovieList from '../components/common/MovieList';
import StreamList from '../components/common/StreamListSwipe';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import Banner from '../components/common/Banner';
import LikeList from '../components/common/LikeList';

function Main(props) {
  return (
    <div>
      <NavigationBar />
      <Banner />
      <StreamList />
      <PostList />
      <LikeList />
      {/* <MovieList /> */}
      <Footer />
    </div>
  );
}

export default Main;
