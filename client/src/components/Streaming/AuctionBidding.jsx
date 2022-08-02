import React, { useState } from 'react';
import styled from 'styled-components';

function AuctionBidding() {
  return (
    <Article>
      <div>경매정보</div>
      <div>응찰목록</div>
      <div>응찰버튼</div>
    </Article>
  );
}

const Article = styled.article`
  height: 40%;
  width: 100%;
  background-color: green;
  /* background-color: ${(props) => props.theme.colors.subBlack}; */
  border-radius: 10px;
`;

export default AuctionBidding;
