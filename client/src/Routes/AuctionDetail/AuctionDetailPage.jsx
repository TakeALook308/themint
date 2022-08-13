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
  const userInfo = useRecoilValue(myInformationState);
  const navigate = useNavigate();
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

  if (auctionInfo) {
    return (
      <Container>
        {console.log(auctionInfo)}
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
                      alt={`이미지${i}`}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </AuctionImage>
          <AuctionInfoBox>
            <div className="auction_info_first">
              <AuctionTitleLeft>
                <p className="category">{categories[auctionInfo.categorySeq - 1].name}</p>
                <p className="title">{auctionInfo.title}</p>
              </AuctionTitleLeft>
              <AuctionTitleRight>
                <div>알림</div>
              </AuctionTitleRight>
            </div>
            <div
              className="profile"
              onClick={() => {
                navigate(`/profile/${auctionInfo.memberSeq}`);
              }}>
              <img
                src={`https://s3.ap-northeast-2.amazonaws.com/s3-themint${auctionInfo.profileUrl}`}
                alt="프로필 이미지"
                width="30px"
              />
              <span>{auctionInfo.nickname}</span>
            </div>
            <div className="date">
              <p>{auctionInfo.startTime.slice(0, -3)} 예정</p>
              {auctionInfo.memberSeq === userInfo.memberSeq ? (
                <div>
                  <span>수정</span>
                  <span>삭제</span>
                </div>
              ) : null}
            </div>
            <GradientButton
              text="경매 참여"
              onClick={() => {
                if (auctionInfo.memberSeq === userInfo.memberSeq)
                  navigate(`/standby/${params.auctionId}`);
                else navigate(`/streamings/${params.auctionId}`);
              }}></GradientButton>
          </AuctionInfoBox>
        </AuctionMainInfo>
        <AuctionList>
          {auctionInfo.productList.map((item, i) => (
            <div key={i}>
              <p>{item.productName}</p>
              <span>{item.startPrice}</span>
            </div>
          ))}
        </AuctionList>
        <AuctionContent>
          <p>{auctionInfo.content}</p>
        </AuctionContent>
      </Container>
    );
  } else return <Container>상품이 존재하지 않습니다.</Container>;
}
const AuctionMainInfo = styled.div`
  display: flex;
  width: 100%;
  height: 350px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;
const AuctionImage = styled.div`
  width: 55%;
  padding: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 350px;
  }
`;

const AuctionInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  padding: 20px 10px;
  gap: 10px;
  justify-content: space-between;
  & > .auction_info_first {
    display: flex;
    justify-content: space-between;
  }
  .profile {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      border-radius: 15px;
    }
    span {
      display: inline-block;
      padding-left: 10px;
    }
  }
  .date {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    div {
      padding-right: 5px;
      display: flex;
      gap: 10px;
      span {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const AuctionTitleLeft = styled.div`
  .category {
    font-size: 14px;
    padding: 10px 0;
  }
  .title {
    font-size: 28px;
    font-weight: 700;
    padding-bottom: 10px;
  }
`;

const AuctionTitleRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const AuctionList = styled.div`
  display: flex;
  width: 100%;
`;

const AuctionContent = styled.div``;
export default AuctionDetailPage;
