import React from 'react';
import AuctionCard from '../../common/AuctionCard';
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
  // const [loading, setLoading] = useState(true);
  // const [auctions, setAuctions] = useState([]);
  // const getAuctions = async () => {
  //   const json = await (await fetch(`#`)).json();
  //   setAuctions(json.data.auctions);
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   getAuctions();
  // }, []);
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
          slidespercolumn={3}
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
            <AuctionCard imageUrl2={'https://img.hankyung.com/photo/202203/01.29355184.1.jpg'} />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard
              imageUrl2={
                'https://images.samsung.com/kdp/cms_contents/149353/742ac997-8faa-47b3-9621-ecaf144992bf.jpg?$ORIGIN_JPG$'
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <AuctionCard
              imageUrl2={
                'https://img.kr.news.samsung.com/kr/wp-content/uploads/2017/01/%EC%82%BC%EC%84%B1-%EB%85%B8%ED%8A%B8%EB%B6%81-%EC%98%A4%EB%94%94%EC%84%B8%EC%9D%B4_%EB%B8%94%EB%9E%99_01-e1484127080285.jpg'
              }
            />
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

const ListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
    'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  > h3 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const SwipeContainer = styled.div``;
