import React, { useState } from 'react';
import styled from 'styled-components';
import CateCard from './CateCard';
import { getAuctionList } from '../../../utils/api/getAuctionApi';

function CateCardList({ category, categoryName }) {
  const [categoryNow, setCategoryNow] = useState('전체보기');
  const onClick = async (e) => {
    console.log(e.target.innerText);
    setCategoryNow(e.target.innerText);
    const res = await getAuctionList(`/api/auction?word=&key=&category=${category}`);
    return res?.data;
  };
  return (
    <Container>
      <ListHeader>
        <h3>
          카테고리>
          <span>{categoryNow}</span>
        </h3>
      </ListHeader>
      <CateCardContainer onClick={onClick} value={categoryName}>
        <CateCard categoryName={'전체보기'} categoryKey={'0'} />
        <CateCard categoryName={'패션의류/잡화'} categoryKey={'1'} />
        <CateCard categoryName={'뷰티'} categoryKey={'2'} />
        <CateCard categoryName={'출산/유아동'} categoryKey={'3'} />
        <CateCard categoryName={'식품'} categoryKey={'4'} />
        <CateCard categoryName={'주방용품'} categoryKey={'5'} />
        <CateCard categoryName={'생활용품'} categoryKey={'6'} />
        <CateCard categoryName={'홈인테리어'} categoryKey={'7'} />
        <CateCard categoryName={'가전디지털'} categoryKey={'8'} />
        <CateCard categoryName={'스포츠/레저'} categoryKey={'9'} />
        <CateCard categoryName={'자동차용품'} categoryKey={'10'} />
        <CateCard categoryName={'도서/음반/DVD'} categoryKey={'11'} />
        <CateCard categoryName={'완구/취미'} categoryKey={'12'} />
        <CateCard categoryName={'문구/오피스'} categoryKey={'13'} />
        <CateCard categoryName={'반려동물용품'} categoryKey={'14'} />
        <CateCard categoryName={'헬스/건강식품'} categoryKey={'15'} />
      </CateCardContainer>
    </Container>
  );
}

export default CateCardList;

const Container = styled.main`
  margin: auto;
  margin-bottom: 10px;
  width: 100%;
`;

const CateCardContainer = styled.article`
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
    font-size: 30px;
    font-weight: bold;
  }
`;
