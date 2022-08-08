import React from 'react';
import styled from 'styled-components';
import InterestKeyWordCard from './InterestKeyWordCard';

function InterestCardList({ keyword }) {
  return (
    <Container>
      <InterestKeyWordCard keyword={'닌텐도'}> {keyword}</InterestKeyWordCard>
      <InterestKeyWordCard keyword={'우리'}> {keyword}</InterestKeyWordCard>
      <InterestKeyWordCard keyword={'더민트'}> {keyword}</InterestKeyWordCard>
      <InterestKeyWordCard keyword={'최고'}> {keyword}</InterestKeyWordCard>
    </Container>
  );
}
export default InterestCardList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;
