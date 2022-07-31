import React from 'react';
import styled from 'styled-components';
import CateCardList from '../components/ui/category/CateCardList';
import SortList from '../components/ui/category/CategorySortList';


function Category({ categoryName }) {
  return (
    <Container>
      <CateListContainer>
        <SortList />
        <CateCardList categoryName={categoryName} />
      </CateListContainer>
    </Container>
  );
}

export default Category;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 1px;
`;

const CateListContainer = styled.header`
  margin-bottom: 1.25rem;
  margin-top: 70px;
`;
