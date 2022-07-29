import React, { useState, useEffect } from 'react';
import AuctionCard from './AuctionCard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './SwiperCSS.css';

// import required modules
import { Navigation } from 'swiper';

function PostList() {
  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState([]);
  const getAuctions = async () => {
    const json = await (await fetch(`#`)).json();
    setAuctions(json.data.auctions);
    setLoading(false);
  };
  useEffect(() => {
    getAuctions();
  }, []);
  return (
    <Wrapper>
      <hr></hr>
      <ListHeader>
        <h3>실시간 임박 경매</h3>
        <Link to="/categories/:categoryName">
          <p>더보기 ></p>
        </Link>
      </ListHeader>
      <SwipeContainer>
        <Swiper
          slidesPerColumn={3}
          slidesPerView={3}
          spaceBetween={30}
          slideToClickedSlide={false}
          allowTouchMove={false}
          initialSlide={1}
          centeredSlides={true}
          loop={true}
          navigation={true}
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
  align-items: baseline;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
    'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  > h3 {
    font-size: 20px;
  }
`;

const SwipeContainer = styled.div``;
