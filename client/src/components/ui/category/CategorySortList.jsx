import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuctionList } from '../../../utils/api/getAuctionApi';


function SortListBtn({url, sortBy }) {
  const selectList = ['최신순', '가격순', '인기순', '판매자 신뢰도'];
  const [sortBy, setSortBy] = useState('최신순');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    console.log(sortBy)
    const res = await getAuctionList(`${url}&sortBy=${sortBy}`)
    return res?.data;
  };

  return (
    <SortSelect onChange={handleSortBy} value={sortBy}>
      {selectList.map((item) => (
        <SortOption value={item} key={item}></SortOption>
      ))}
    </SortSelect>
  );
}

export default SortListBtn;

const SortSelect = styled.select`
  position: relative;
  width: 10%;
`;

const SortOption = styled.option`
  background-color: ${(props) => props.theme.colors.mainBlack};
  font-size: ${(props) => props.theme.fontSizes.p};
`;
