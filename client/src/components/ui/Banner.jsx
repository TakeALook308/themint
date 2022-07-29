import React from 'react';
import styled from 'styled-components';

function Banner() {
  return (
    <Wrapper>
      <ImgContainer src="https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg" />
    </Wrapper>
  );
}
export default Banner;

const Wrapper = styled.div`
  width: 1024px;
  margin: auto;
  height: 395px;
  margin-bottom: 20px;
`;

const ImgContainer = styled.img`
  width: 100%;
  height: 100%;
`;
