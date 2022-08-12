import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../style/style';
import { getData } from '../../utils/apis/api';
import { auctionApis } from '../../utils/apis/auctionApis';
import { categories } from '../../utils/constants/constant';
import GradientButton from '../../components/ButtonList/GradientButton';
import { myInformationState } from '../../atoms';
import { useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

function AuctionDetailPage(props) {
  const params = useParams();
  const [auctionInfo, setAuctionInfo] = useState(null);
  const ff = async () => {
    await getData(auctionApis.AUCTION_DETAIL_API(params.auctionId))
      .then((res) => {
        setAuctionInfo(res.data);
      })
      .catch(() => {
        console.log('error');
      });
  };
  useEffect(() => {
    ff();
  }, []);

  const userInfo = useRecoilValue(myInformationState);
  const navigate = useNavigate();
  if (auctionInfo) {
    return (
      <Container>
        <AuctionMainInfo>
          <AuctionImage>
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}>
              {auctionInfo.auctionImageList.map((item, i) => {
                return (
                  <SwiperSlide key={i}>
                    <img
                      src={`https://s3.ap-northeast-2.amazonaws.com/s3-themint${item.imageUrl}`}
                      alt=""
                      width="100%"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </AuctionImage>
          <div>
            {/* <p>{categories[auctionInfo.categorySeq-1].name}</p> */}
            <p>{auctionInfo.title}</p>
            <div>
              <img
                src={`https://s3.ap-northeast-2.amazonaws.com/s3-themint${auctionInfo.profileUrl}`}
                alt="프로필 이미지"
                width="30px"
              />
              <span>{auctionInfo.nickname}</span>
            </div>
          </div>
          <div>
            <span>{auctionInfo.startTime}</span>
          </div>
          <GradientButton
            text="경매 참여"
            onClick={() => {
              if (auctionInfo.memberSeq === userInfo.memberSeq)
                navigate(`/standby/${params.auctionId}`);
              else navigate(`/streamings/${params.auctionId}`);
            }}></GradientButton>
        </AuctionMainInfo>
        {/* <AuctionList></AuctionList> */}
        <AuctionContent>
          <p>{auctionInfo.content}</p>
        </AuctionContent>
      </Container>
    );
  } else return <Container>상품이 존재하지 않습니다.</Container>;
}

const AuctionImage = styled.div`
  width: 40%;
`;

const AuctionMainInfo = styled.div`
  display: flex;
  height: 300px;
`;

const AuctionContent = styled.div``;
export default AuctionDetailPage;
