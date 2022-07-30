import React from 'react';
import styled from 'styled-components';
import StreamCard from '../../common/StreamCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './SwiperCSS.css';

// import required modules
import { Navigation, EffectCoverflow } from 'swiper';

function StreamList() {
  return (
    <Wrapper>
      <SwipeContainer>
        <Swiper
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 50,
            stretch: 100,
            depth: 130,
            modifier: 1,
          }}
          watchOverflow={true}
          navigation={true}
          centeredSlides={true}
          initialSlide={2}
          slidesPerView={2}
          spaceBetween={0}
          allowTouchMove={false}
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

const SwipeContainer = styled.div`
  border-radius: 5px;
`;

// navigation button을 직접 만들고 아래의 클래스를 줘도 동작
// 그런데 버튼 컴포넌트를 만들면 위에서 return을 했음에도 unused error가 발생

// prevEl: '.prev',
// nextEl: '.next',
