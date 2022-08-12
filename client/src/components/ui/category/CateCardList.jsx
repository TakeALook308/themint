import React, { useState } from 'react';
import styled from 'styled-components';
import CateCard from './CateCard';

// 따로 컴포넌트 만들었다면 받아오기
// import categoriest from '/'

function CateCardList({ getCategorySeq, categoryName, key }) {
  const [categoryNow, setCategoryNow] = useState('전체보기');
  const onClick = (e) => {
    setCategoryNow(e.target.innerText);
    getCategorySeq(e.target.id);
  };

  // 따로 컴포넌트 만들었다면 삭제가능
  const categories = [
    { seq: 0, name: '전체보기' },
    { seq: 1, name: '패션의류/잡화' },
    { seq: 2, name: '뷰티' },
    { seq: 3, name: '출산/유아동' },
    { seq: 4, name: '식품' },
    { seq: 5, name: '주방용품' },
    { seq: 6, name: '생활용품' },
    { seq: 7, name: '홈인테리어' },
    { seq: 8, name: '가전/디지털' },
    { seq: 9, name: '스포츠/레저' },
    { seq: 10, name: '자동차용품' },
    { seq: 11, name: '도서/음반/DVD' },
    { seq: 12, name: '완구/취미' },
    { seq: 13, name: '문구/오피스' },
    { seq: 14, name: '반려동물용품' },
    { seq: 15, name: '헬스/건강식품' },
  ];

  const categoriesList = categories.map((categories) => (
    <CateCard categoryName={categories.name} categoryKey={categories.seq} key={categories.seq} />
  ));

  return (
    <Container>
      <ListHeader>
        <h3>
          카테고리&gt;
          <span>{categoryNow}</span>
        </h3>
      </ListHeader>
      <CateCardContainer value={categoryName} key={key} onClick={onClick}>
        {categoriesList}
      </CateCardContainer>
    </Container>
  );
}

export default CateCardList;

const Container = styled.main`
  margin: auto;
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

  > h2 {
    font-size: 30px;
    font-weight: bold;
    height: 30px;
    > span {
      display: inline-block;
      font-size: 30px;
      height: 30px;
    }
  }
`;
