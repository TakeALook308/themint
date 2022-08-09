import React from 'react';
import styled from 'styled-components';
import StreamCard from './StreamCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './SwiperCSS.css';
import { Navigation, EffectCoverflow } from 'swiper';
import { useQuery } from 'react-query';
import { getData } from '../../utils/apis/api';
import { auctionListApis } from '../../utils/apis/auctionApis';
function StreamList(props) {
  const getLiveAuctionList = async () => {
    const response = await getData(auctionListApis.LIVE_AUCTION_LIST);
    return response?.data;
  };
  const { isLoading, isError, data, error } = useQuery(['liveAuctionList'], getLiveAuctionList, {
    refetchInterval: 60 * 1000,
    retry: 0,
    onError: (e) => {
      console.log(e.message);
    },
  });

  return (
    <Wrapper>
      <ListHeader>
        <h3>실시간 경매 ON</h3>
      </ListHeader>
      {isLoading && <span>Loading...</span>}
      {!isLoading && !data && <p>실시간 진행중인 경매가 없습니다.</p>}
      {data && (
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
            {data.map((auction, idx) => (
              <SwiperSlide key={idx}>
                <StreamCard auction={auction} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwipeContainer>
      )}
    </Wrapper>
  );
}

export default StreamList;

const Wrapper = styled.article`
  max-width: 1024px;
  margin: auto;
  margin-bottom: 4rem;
`;

const SwipeContainer = styled.div`
  border-radius: 5px;
`;

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
