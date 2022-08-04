import React, { useState } from 'react';
import styled from 'styled-components';
import CateCard from './CateCard';

function CateCardList({ categoryName, categoryKey }) {
  const [categoryNow, setCategoryNow] = useState('');
  const onClick = (e) => {
    console.log(e.target.innerText);
    setCategoryNow(e.target.innerText);
  };
  return (
    <Wrapper>
      <ListHeader>
        <h3>
          카테고리>
          <span>{categoryNow}</span>
        </h3>
      </ListHeader>
      <CateCardContainer onClick={onClick} value={categoryName}>
        <CateCard categoryName={'전체보기'} categoryKey={'1'} />
        <CateCard categoryName={'의류'} categoryKey={'2'} />
        <CateCard categoryName={'가전'} categoryKey={'3'} />
        <CateCard categoryName={'전자'} categoryKey={'4'} />
        <CateCard categoryName={'식품'} categoryKey={'5'} />
        <CateCard categoryName={'1'} categoryKey={'6'} />
        <CateCard categoryName={'2'} categoryKey={'7'} />
        <CateCard categoryName={'3'} categoryKey={'8'} />
        <CateCard categoryName={'4'} categoryKey={'9'} />
        <CateCard categoryName={'5'} categoryKey={'10'} />
        <CateCard categoryName={'6'} categoryKey={'11'} />
        <CateCard categoryName={'7'} categoryKey={'12'} />
        <CateCard categoryName={'8'} categoryKey={'13'} />
        <CateCard categoryName={'9'} categoryKey={'14'} />
        <CateCard categoryName={'10'} categoryKey={'15'} />
        <CateCard categoryName={'11'} categoryKey={'16'} />
      </CateCardContainer>
    </Wrapper>
  );
}

export default CateCardList;

const Wrapper = styled.div`
  margin: auto;
  margin-bottom: 10px;
  width: 100%;
`;

const CateCardContainer = styled.main`
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const ListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  > h3 {
    font-size: 20px;
    font-weight: bold;
  }
`;
