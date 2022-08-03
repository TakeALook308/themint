import React, { useState } from 'react';
import styled from 'styled-components';

function AuctionList() {
  return (
    <Article>
      <h3>경매리스트</h3>
      <List>
        <li>카드</li>
        <li>카드</li>
        <li>카드</li>
        <li>카드</li>
        <li>카드</li>
      </List>
    </Article>
  );
}

const Article = styled.article`
  height: 20%;
  width: 100%;
  background-color: purple;
  /* background-color: ${(props) => props.theme.colors.subBlack}; */
  border-radius: 10px;
`;

const List = styled.ul`
  display: flex;
`;

export default AuctionList;
