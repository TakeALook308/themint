import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { instance } from '../../utils/apis/api';
import InterestCateCard from './InterestCateCard';
import { categories } from '../../utils/constants/constant';
import GradientButton from '../../components/ButtonList/GradientButton';
import { errorToast } from '../../lib/toast';

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
    setCateSeq(e.target.value);
  };

  const onClick = () => {
    const addInterestCategory = async (url) => {
      const response = await instance.post(url);
      return response;
    };
    const res = addInterestCategory(`/api/interest/category/${cateSeq}`);
    res.catch((error) => {
      errorToast('이미 추가된 카테고리입니다');
    });
    res.then(() => {
      const getCateList = async (url) => {
        const response = await instance.get(url);
        return response;
      };
      const res = getCateList(`/api/interest/category`);
      res.then((catelist) => {
        setShowCateList(catelist.data.interestCategoryList);
      });
    });
  };
  // 관심 카테고리 삭제
  const [deletecate, setDeletecate] = useState('');
  const getData = (cate) => {
    setDeletecate(cate);
    const deleteInterest = async (url) => {
      const response = await instance.delete(url);
      return response;
    };
    const res = deleteInterest(`/api/interest/category/${cate}`);
    res.then(() => {
      const getKeyword = (url) => {
        const response = instance.get(url);
        return response;
      };
      const res = getKeyword(`/api/interest/category`);
      res.then((catelist) => {
        setShowCateList(catelist.data.interestCategoryList);
      });
    });
  };

  return (
    <Container>
      <SelectContainer>
        <select onChange={onChange}>
          {categories.map((categories) => (
            <option key={categories.seq} value={categories.seq}>
              {categories.name}
            </option>
          ))}
        </select>
        <GradientButton text={'카테고리 추가'} onClick={onClick} />
      </SelectContainer>
      <CardContainer>
        {showCateList.map((keyword, i) => (
          <InterestCateCard keyword={keyword} key={i} getData={getData} />
        ))}
      </CardContainer>
    </Container>
  );
}
export default InterestCateList;

const Container = styled.div`
  width: 100%;
`;

const SelectContainer = styled.div`
  display: flex;
  width: 50%;
  margin-bottom: 30px;
  > select {
    margin-right: 10px;
    width: 100%;
  }
`;

const CardContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;
