import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CateCard from './CateCard';

function CateCardList({ categoryName }) {
  const [cateroryLable, setCategoryLable] = useState('');
  useEffect((categoryName) => {
    setCategoryLable(categoryName);
  }, []);

  return (
    <Wrapper>
      <ListHeader>
        <h3>
          카테고리>
          <span>{cateroryLable}</span>
        </h3>
      </ListHeader>
      <CateCardContainer>
        <CateCard categoryName={categoryName} />
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
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
    'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  margin-bottom: 20px;
  > h3 {
    font-size: 20px;
    font-weight: bold;
  }
`;
