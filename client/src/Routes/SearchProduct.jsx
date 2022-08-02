import React from 'react';
import styled from 'styled-components';
import SearchNav from '../components/ui/search/SearchNav';
import Dropdown from '../components/ui/category/SelectBox';

function SearchProduct({ search }) {
  return (
    <Container>
      <SearchHeader>
        <h1>경매 상품 검색</h1>
      </SearchHeader>
      <SearchNav />
      <Dropdown />
    </Container>
  );
}

export default SearchProduct;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 1px;
  margin-bottom: 20px;
`;

const SearchHeader = styled.header`
  margin-bottom: 1.25rem;
  margin-top: 70px;
  > h1 {
    font-size: ${(props) => props.theme.fontSizes.h3};
    font-weight: bold;
  }
`;
