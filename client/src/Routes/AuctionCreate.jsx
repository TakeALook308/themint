import React from 'react';
import styled from 'styled-components';

function AuctionCreate(props) {
  return (
    <Container>
      <Title>경매 생성</Title>
      <form action="">
        <div>
          <p>카테고리</p>
          <select name="" id="">
            <option value="">--선택--</option>
          </select>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.main`
  padding-top: 80px;
`;

const Title = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-weight: 700;
`;

export default AuctionCreate;
