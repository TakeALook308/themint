import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { instance } from '../../../../utils/apis/api';
import InterestCateCard from './InterestCateCard';

function InterestCateList() {
  // 관심 카테고리 조회 API
  const [showCateList, setShowCateList] = useState([]);
  useEffect(() => {
    const getCateList = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getCateList(`/api/interest/category`);
    res.then((catelist) => {
      setShowCateList(catelist.data.interestCategoryList);
    });
  }, []);
  console.log(showCateList);
  return (
    <Container>
      {showCateList.map((keyword, i) => (
        <InterestCateCard keyword={keyword} key={i} />
      ))}
    </Container>
  );
}
export default InterestCateList;

const Container = styled.div`
  width: 100%;
`;
