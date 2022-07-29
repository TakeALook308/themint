import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import CateCardList from '../components/common/CateCardList';

function Category(props) {
  return (
    <div>
      <NavigationBar />
      <CateCardList />
      <Footer />
    </div>
  );
}

export default Category;
