import React, { useState } from 'react';
import styled from 'styled-components';
import { getAuctionList } from '../../../utils/api/getAuctionApi';

function SortListBtn({ url, category }) {
  const selectList = ['최신순', '가격순', '인기순', '판매자 신뢰도'];
  const [sortBy, setSortBy] = useState('최신순');
  const handleSortBy = async (e) => {
    setSortBy(e.target.value);
    const category = e.target.value;
    console.log(category);
    const res = await getAuctionList(`${url}&sortBy=${category}`);
    return res?.data;
  };

  return (
    <SortBtnGroup>
      <SortSelect onChange={handleSortBy} value={sortBy}>
        {selectList.map((item) => (
          <SortOption value={item} key={item}>
            {item}
          </SortOption>
        ))}
      </SortSelect>
    </SortBtnGroup>
  );
}

export default SortListBtn;

const SortBtnGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const SortSelect = styled.select`
  background-color: ${(props) => props.theme.colors.subBlack};
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  width: 12%;
  margin-top: 100px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.white};
  padding: 5px;
`;

const SortOption = styled.option`
  background-color: ${(props) => props.theme.colors.mainBlack};
  font-size: ${(props) => props.theme.fontSizes.p};
  color: ${(props) => props.theme.colors.white};
  margin-left: 2px;
  border-radius: 5px;
  text-align: center;
`;
