import React from 'react';
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

function PostList() {
  return (
    <Wrapper>
      <hr></hr>
      <ListHeader>
        <h3>실시간 임박 경매</h3>
        <Link to="/categories/:categoryName">
          <p>더보기</p>
        </Link>
      </ListHeader>
      <SwipeContainer>
        <Swiper
          slidesPerColumn={3}
          slidesPerView={3}
          spaceBetween={0}
          navigation={true}
          slideToClickedSlide={true}
          allowTouchMove={false}
          initialSlide={1}
          centeredSlides={true}
          loop={true}
          slidesOffsetBefore={17}
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
      </SwipeContainer>
    </Wrapper>
  );
}

export default PostList;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  margin-bottom: 10px;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SwipeContainer = styled.div`
  padding: 10px;
`;
