import React from 'react';
import styled from 'styled-components';

function InterestCard({ keyword }) {
  const interests = {
    keyword: 'str',
  };
  return <Container>{interests.keyword}</Container>;
}
export default InterestCard;

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
`;
