import React from 'react';
import CateAuctionCard from './CategoryListItem';
import styled from 'styled-components';
<<<<<<< HEAD
=======
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import '../../../Routes/Main/SwiperCSS.css';

// import required modules
import { Navigation } from 'swiper';
>>>>>>> 0330df70a70ae7486b2f34c7f371866a24f33613

function CateList({ auctions }) {
  return (
    <Wrapper>
      {auctions.map((data, index) => (
        <CateAuctionCard auction={data} key={index} />
      ))}
    </Wrapper>
  );
}

export default CateList;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;
