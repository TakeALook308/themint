import React from 'react';
import styled from 'styled-components';
import Modal from '../../common/Modal';
import IsSellingCard from './IsSellingCard';

function IsSellingCardList({ keyword }) {
  return (
    <Container>
      <IsSellingCard />
      <IsSellingCard />
      <IsSellingCard />
      <IsSellingCard />
      <Modal />
    </Container>
  );
}
export default IsSellingCardList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
`;
