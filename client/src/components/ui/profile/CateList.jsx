import React from 'react';
import CateAuctionCard from './CategoryListItem';
import styled from 'styled-components';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import '../main/SwiperCSS.css';

// import required modules
import { Navigation } from 'swiper';

function CateList({ auctions }) {
  return (
    <Wrapper>
      <SwipeContainer>
        <Swiper
          slidespercolumn={3}
          slidesPerView={3}
          spaceBetween={30}
          slideToClickedSlide={false}
          allowTouchMove={false}
          centeredSlides={true}
          loop={false}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper">
          <SwiperSlide>
            {auctions.map((data, index) => (
              <CateAuctionCard auction={data} key={index} />
            ))}
          </SwiperSlide>
        </Swiper>
      </SwipeContainer>
    </Wrapper>
  );
}

export default CateList;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  margin-bottom: 10px;
`;

const SwipeContainer = styled.div``;
