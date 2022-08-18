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
import { fetchData } from '../../utils/apis/api';
import { auctionListApis } from '../../utils/apis/auctionApis';
import { useMediaQuery } from 'react-responsive';
import Header from './Header';
function StreamList() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const getLiveAuctionList = async () => {
    const response = await fetchData.get(auctionListApis.LIVE_AUCTION_LIST);
    return response?.data;
  };
  const { isLoading, data } = useQuery(['liveAuctionList'], getLiveAuctionList, {
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 0,
    onError: (e) => {
      console.log(e.message);
    },
  });

  return (
    <Wrapper>
      <Header title={'실시간 경매 ON'} />
      {isLoading && <span>Loading...</span>}
      {!isLoading && !data?.length && <p>실시간 진행중인 경매가 없습니다.</p>}
      {data &&
        (isTabletOrMobile ? (
          <SwipeContainer>
            <Swiper
              navigation={true}
              initialSlide={1}
              allowTouchMove={false}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Navigation, EffectCoverflow]}
              className="mySwiper">
              {data?.map((auction, idx) => (
                <SwiperSlide key={idx}>
                  <StreamCard auction={auction} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwipeContainer>
        ) : (
          <SwipeContainer>
            <Swiper
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
              effect={'coverflow'}
              slidesPerView={2}
              spaceBetween={0}
              allowTouchMove={false}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Navigation, EffectCoverflow]}
              className="mySwiper">
              {data.map((auction, idx) => (
                <SwiperSlide key={idx}>
                  <StreamCard auction={auction} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwipeContainer>
        ))}
    </Wrapper>
  );
}

export default StreamList;

const Wrapper = styled.article`
  max-width: 1024px;
  margin: auto;
  margin-bottom: 2rem;
`;

const SwipeContainer = styled.div`
  border-radius: 5px;
`;

const SwiperSlideContainer = styled(SwiperSlide)`
  background-color: ${(props) => props.theme.colors.mainBlack};
`;

const ListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 20px;
  margin-top: 20px;
  > h2 {
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-weight: bold;
    text-shadow: 1px 4px 4px ${(props) => props.theme.colors.mainMint};
  }
`;
