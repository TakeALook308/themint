import React from 'react';
import styled from 'styled-components';
import StreamCard from './StreamCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './SwiperCSS.css';

// import required modules
import { Navigation, EffectCoverflow } from 'swiper';

function StreamList(props) {
  return (
    <Wrapper>
      <ListHeader>
        <h3>실시간 경매 ON</h3>
      </ListHeader>
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
            <StreamCard
              imageUrl2={
                'http://img1.tmon.kr/cdn3/deals/2021/05/03/5970233942/front_8dc27_7evrq.jpg'
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard
              imageUrl2={
                'https://post-phinf.pstatic.net/MjAyMDA4MTNfMTc0/MDAxNTk3MzE2OTU2NTgw.Qfi-8E3Rj7AINcNchrJcjOvcHZTtaRchauWqrm5wct8g.uoO2LZcHvsO-49w6wJNJlEBlBy0TzVKEEoSWNHHxd9gg.JPEG/DSC05566.jpg?type=w1200'
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <StreamCard
              imageUrl2={
                'https://blog.kakaocdn.net/dn/lzoyc/btrc8Ah8OZq/13BD3KwRf9mWw2NrKlebI1/img.png'
              }
            />
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

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  margin-top: 20px;
  > h3 {
    font-size: 20px;
    font-weight: bold;
  }
`;
