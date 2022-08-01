import React from 'react';
import styled from 'styled-components';
import CateCard from '../CateCard';

function CateCardList(props) {
  return (
    <Wrapper>
      <ListHeader>
        <h3>카테고리&gt;</h3>
      </ListHeader>
      <CateCardContainer>
        <CateCard categoryName={'전체보기'} />
        <CateCard categoryName={'패션의류/잡화'} />
        <CateCard categoryName={'뷰티'} />
        <CateCard categoryName={'출산/유아동'} />
        <CateCard categoryName={'식품'} />
        <CateCard categoryName={'주방용품'} />
        <CateCard categoryName={'생활용품'} />
        <CateCard categoryName={'홈인테리어'} />
        <CateCard categoryName={'가전디지털'} />
        <CateCard categoryName={'스포츠/레저'} />
        <CateCard categoryName={'자동차용품'} />
        <CateCard categoryName={'도서/음반/DVD'} />
        <CateCard categoryName={'완구/취미'} />
        <CateCard categoryName={'문구/오피스'} />
        <CateCard categoryName={'반려동물용품'} />
        <CateCard categoryName={'헬스/건강식품'} />
      </CateCardContainer>
    </Wrapper>
  );
}

export default CateCardList;

const Wrapper = styled.div`
  margin: auto;
  width: 1040px;
`;

const CateCardContainer = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  margin-top: 20px;
  > h3 {
    font-size: 20px;
  }
`;
