import React, { useState } from 'react';
import styled from 'styled-components';

function AuctionList({ products }) {
  return (
    <Article>
      <h3>경매리스트</h3>
      <List>
        {products.map((item) => (
          <li>
            <p>{item.productName}</p>
            <span>{item.startPrice}</span>
          </li>
        ))}
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
  li {
    width: 200px;
    height: 50px;
    background-color: green;
    border: 1px solid yellow;
  }
`;

export default AuctionList;
