import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import StreamItem from './common/StreamItem';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// import required modules
import { Navigation, EffectCoverflow } from 'swiper';

function SwiperList() {
  return (
    <Wrapper>
      <ListHeader>
        <h3>현재 진행중인 실시간 경매</h3>
      </ListHeader>
      <hr></hr>
      <>
        <Swiper
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 10,
            stretch: 100,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          slideToClickedSlide={true}
          centerInsufficientSlides={true}
          centeredSlides={true}
          initialSlide={6}
          slidesPerView={5}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation, EffectCoverflow]}
          className="mySwiper">
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
          </SwiperSlide>
          <SwiperSlide>
            <StreamItem />
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
