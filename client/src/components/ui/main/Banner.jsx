import React from 'react';
import styled from 'styled-components';

function Banner() {
  return (
    <Container>
      <Wrapper>
        <ImgContainer src="https://images.gnwcdn.com/2022/articles/2022-07-01-15-35/hero_top_sp.jpg" />
      </Wrapper>
    </Container>
  );
}
export default Banner;

const Container = styled.article`
  position: relative;
  width: 100%;
  padding-top: 56%;
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
