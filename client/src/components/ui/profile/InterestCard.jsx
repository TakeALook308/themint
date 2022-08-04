import React from 'react';
import styled from 'styled-components';

function InterestCard({ keyword }) {
  // const interests = {
  //   keyword: 'str',
  // };
  return <Container keyword={keyword}>{keyword}</Container>;
}
export default InterestCard;

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  padding: 20px;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 24px;
  border-radius: 10px;
`;
