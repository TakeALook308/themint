import React from 'react';
import styled from 'styled-components';
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import './SwiperCSS.css';

function Banner() {
  return (
    <Container>
      <Wrapper>
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="mySwiper">
          <SwiperSlide>
            <ImgContainer src={banner3} alt="이벤트 배너" />
          </SwiperSlide>
          <SwiperSlide>
            <ImgContainer src={banner2} alt="이벤트 배너" />
          </SwiperSlide>
          <SwiperSlide>
            <ImgContainer src={banner1} alt="이벤트 배너" />
          </SwiperSlide>
        </Swiper>
      </Wrapper>
    </Container>
  );
}
export default Banner;

const Container = styled.article`
  position: relative;
  width: 100%;
  padding-top: 30%;
  margin-bottom: 3rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const ImgContainer = styled.img`
  width: 100%;
  height: 100%;
`;
