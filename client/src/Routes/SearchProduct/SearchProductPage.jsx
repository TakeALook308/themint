import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import { instance } from '../../utils/apis/api';
import { Container } from '../../style/style';
import AuctionCard from '../../components/CardList/AuctionCard';

function SearchProductPage({ params }) {
  const [sortKey, setSortKey] = useState('startTime');
  const getSearchProductUrl = (word, size) => {
    return (page) => `/api/product/search?word=${word}&page=${page}&size=${size}&sort=${sortKey}`;
  };
  const sortKeys = [
    { value: 'startTime', name: '경매임박순' },
    { value: 'seq', name: '최신등록순' },
    { value: 'interest', name: '인기순' },
    { value: 'startPrice', name: '낮은가격순' },
    { value: 'score', name: '판매자신뢰도순' },
  ];

  const onChange = ({ target: { value } }) => {
    setSortKey(value);
  };

  return (
    <Container>
      <Select value={sortKey} onChange={onChange}>
        {sortKeys.map((item, i) => (
          <option key={i} value={item.value}>
            {item.name}
          </option>
        ))}
      </Select>
      <InfiniteAuctionList
        getUrl={getSearchProductUrl(params, 9)}
        queryKey={['product' + params + sortKey]}
        CardComponent={AuctionCard}
        SkeltonCardComponent={SkeletonAuctionCard}
        text={'경매 검색 결과가 없습니다.'}
      />
    </Container>
  );
}

export default SearchProductPage;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 13%;
  height: 40px;
  color: ${(props) => props.theme.colors.white};
  padding: 10px;
  margin: 0;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  background: url('https://user-images.githubusercontent.com/57048162/183007422-e8474fa0-acc1-441e-b7e1-c0701b82b766.png')
    no-repeat;
  background-position: 99%;
  background-size: 15px 12px;
  background-color: ${(props) => props.theme.colors.pointBlack};

  & option {
    display: block;
    padding: 10px;
  }
`;
