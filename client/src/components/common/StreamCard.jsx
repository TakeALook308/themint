import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function StreamCard() {
  return (
    <Wrapper>
      <ImgContainer></ImgContainer>
      <AuctionInfoContainer>
        <div>
          <p>경매 제목</p>
          <p>경매 게시글 내용</p>
          <p>rud</p>
        </div>
      </AuctionInfoContainer>
    </Wrapper>
  );
}
