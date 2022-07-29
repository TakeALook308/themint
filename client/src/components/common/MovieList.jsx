import React, { useState, useEffect } from 'react';
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
import Movie from './Movie';
import SkeletonAuctionCard from './SkeletonAuctionCard';

function LikeList() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMoives = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`)
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMoives();
  }, []);
  return (
    <Wrapper>
      <hr></hr>
      <ListHeader>
        <h3>Mint님의 관심 경매</h3>
        <Link to="/categories/:categoryName">
          <p>더보기 ></p>
        </Link>
      </ListHeader>
      <SwipeContainer>
        <Swiper
          slidesPerColumn={3}
          slidesPerView={3}
          spaceBetween={30}
          slideToClickedSlide={true}
          allowTouchMove={false}
          initialSlide={1}
          centeredSlides={true}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper">
          {loading ? (
            <SwiperSlide>
              <SkeletonAuctionCard />
            </SwiperSlide>
          ) : (
            <div>
              {movies.map((movie) => (
                <SwiperSlide>
                  <Movie
                    medium_cover_image={movie.medium_cover_image}
                    title={movie.title}
                    summary={movie.summary}
                  />
                </SwiperSlide>
              ))}
            </div>
          )}
        </Swiper>
      </SwipeContainer>
    </Wrapper>
  );
}

export default LikeList;

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
