import React from 'react';
import styled from 'styled-components';

function Category({ categoryName }) {
  return (
    <Container>
      <CateListContainer></CateListContainer>
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
