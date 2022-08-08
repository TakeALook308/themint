import React from 'react';
import styled from 'styled-components';
import InterestCard from './InterestKeyWordCard';

function InterestCardList({ keyword }) {
  return (
    <Container>
      <InterestCard keyword={'닌텐도'}> {keyword}</InterestCard>
      <InterestCard keyword={'우리'}> {keyword}</InterestCard>
      <InterestCard keyword={'더민트'}> {keyword}</InterestCard>
      <InterestCard keyword={'최고'}> {keyword}</InterestCard>
    </Container>
  );
}
export default InterestCardList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;
