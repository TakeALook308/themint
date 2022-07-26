import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Slide({ sliders }) {
  return (
    <Container>
      <SlideTitle>캐로샐</SlideTitle>
      <StyledSlider {...settings}>
        {sliders.map(({ name, image }) => {
          return (
            <CardBox>
              <CardImg alt="이미지" src={image} />
              <CardText>{name}</CardText>
            </CardBox>
          );
        })}
      </StyledSlider>
    </Container>
  );
}

export default Slide;

const settings = {
  dots: true, // 슬라이드 밑에 점 보이게
  infinite: true, // 무한으로 반복
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000, // 넘어가는 속도
  slidesToShow: 4, //4장씩 보이게
  slidesToScroll: 1, // 1장씩 뒤로 넘어가게
  centerMode: true,
  centerPadding: '0px', // 0px 하면 스라이드 끝쪽 이미지가 안잘림
};

const SlideTitle = styled.h2`
  padding: 60px 0px 50px 0px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
`;

const Container = styled.div`
  margin-right: 25px;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 1600px;
    margin: 0 auto;
  }

  .slick-dots {
    bottom: -50px;
    margin-top: 200px;
  }

  .slick-track {
    /* overflow-x: hidden;*/
  }
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 300px;
  height: 190px;
`;

const CardText = styled.p`
  padding: 20px;
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
`;
