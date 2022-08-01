import React, { useState } from 'react';
import styled from 'styled-components';

function AuctionInfo() {
  return <Article>경매정보</Article>;
}

const Article = styled.article`
  height: 25%;
  width: 100%;
  background-color: purple;
  border-radius: 10px;
`;

export default AuctionInfo;
