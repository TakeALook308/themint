import React, { useRef, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper';

function SwiperList() {
  return (
    <Wrapper>
      <ListHeader>
        <h3>실시간 경매</h3>
        <Link to="/categories/:categoryName">
          <p>더보기</p>
        </Link>
      </ListHeader>
      <hr></hr>

      <>
        <Swiper
          slidesPerColumn={3}
          slidesPerView={3}
          spaceBetween={30}
          navigation={true}
          slidesOffsetBefore={23}
          modules={[Navigation]}
          className="mySwiper">
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard />
          </SwiperSlide>
        </Swiper>
      </>
    </Wrapper>
  );
}

export default SwiperList;

const Wrapper = styled.div`
  max-width: calc(100% - 50px);
  margin: auto;
  background-color: ${(props) => props.theme.colors.subBlack};
  margin-bottom: 10px;
  overflow: hidden;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
