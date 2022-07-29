import React from 'react';
import PostList from '../components/common/PostList';
import MovieList from '../components/common/MovieList';
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
      <MovieList />
      <Footer />
    </div>
  );
}

export default Main;
