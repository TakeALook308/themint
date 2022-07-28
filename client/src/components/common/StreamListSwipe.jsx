import React from 'react';
import styled from 'styled-components';
import StreamCard from './StreamCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// import required modules
import { Navigation, EffectCoverflow } from 'swiper';

function StreamList() {
  return (
    <Wrapper>
      <ListHeader>
        <h3>현재 진행중인 실시간 경매</h3>
      </ListHeader>
      <hr></hr>
      <SwipeContainer>
        <Swiper
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 15,
            stretch: 100,
            depth: 100,
            modifier: 1,
          }}
          watchOverflow={true}
          navigation={true}
          centeredSlides={true}
          initialSlide={2}
          slidesPerView={2}
          spaceBetween={0}
          loop={true}
          modules={[Navigation, EffectCoverflow]}
          className="mySwiper">
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard />
          </SwiperSlide>
        </Swiper>
      </SwipeContainer>
    </Wrapper>
  );
}

export default StreamList;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  margin-bottom: 20px;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SwipeContainer = styled.div`
  padding: 10px;
`;
