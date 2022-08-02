import React from 'react';
import styled from 'styled-components';
import CateCardList from '../components/ui/category/CateCardList';
<<<<<<< HEAD
import SortList from '../components/ui/category/CategorySortList';


=======
import SortListBtn from '../components/ui/category/CategorySortList';
import Dropdown from '../components/ui/category/SelectBox';
>>>>>>> 51318450b4fb5167469f11480645a4b4927bd47d
function Category({ categoryName }) {
  return (
    <Container>
      <SortListBtn></SortListBtn>
      <Dropdown />
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
