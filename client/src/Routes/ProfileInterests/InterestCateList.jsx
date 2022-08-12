import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { instance } from '../../utils/apis/api';
import InterestCateCard from './InterestCateCard';
import { categories } from '../../utils/constants/constant';
import GradientButton from '../../components/ButtonList/GradientButton';

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
  // 관심 카테고리 추가
  const [cateSeq, setCateSeq] = useState(1);
  const onChange = (e) => {
    setCateSeq(e.target.childElement.id);
    console.log(e.target.childElement.id);
  };
  console.log(cateSeq);
  const onClick = () => {
    const category_seq = '';
    console.log(category_seq);
    const addInterestCategory = async (url) => {
      const response = await instance.post(url);
      return response;
    };
    const res = addInterestCategory(`/api/interest/category/${category_seq}`);
    res.then(() => {
      console.log(category_seq);
    });
  };

  return (
    <Container>
      <select onChange={onChange}>
        {categories.map((categories) => (
          <option id={categories.seq} key={categories.seq}>
            {categories.name}
          </option>
        ))}
      </select>
      <GradientButton text={'키워드 추가'} onClick={onClick} />
      {showCateList.map((keyword, i) => (
        <InterestCateCard keyword={keyword} key={i} />
      ))}
    </Container>
  );
}
export default InterestCateList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
`;
