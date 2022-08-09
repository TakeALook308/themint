import React from 'react';
import CateAuctionCard from './CategoryListItem';
import styled from 'styled-components';

function CateList({ auctions }) {
  return (
    <Wrapper>
      {auctions.map((data, index) => (
        <CateAuctionCard auction={data} key={index} />
      ))}
    </Wrapper>
  );
}

export default CateList;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;
