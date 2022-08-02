import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from axios;

function SortListBtn() {
  const selectList = ['최신순', '가격순', '인기순', '판매자 신뢰도'];
  const [SortBy, setSortBy] = useState('최신순');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };
  useEffect;(()=> {
    axios.get("url"), {
      params: key,      
    }
  }, [SortBy])

  return (
    <SortSelect onChange={handleSortBy} value={SortBy}>
      {selectList.map((item) => (
        <SortOption value={item} key={item} />
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
