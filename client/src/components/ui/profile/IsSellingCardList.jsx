import React, { useState } from 'react';
import styled from 'styled-components';
import IsSellingCard from './IsSellingCard';
import Modal from '../../common/Modal';

function IsSellingCardList() {
  const [isModal, setIsModal] = useState(false);
  const [modalKey, setModalKey] = useState(1);

  const ModalHandler = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <Container>
      {[1, 2, 3, 4, 5, 6].map((item, i) => (
        <div>
          <IsSellingCard
            ModalHandler={ModalHandler}
            value={item}
            key={i}
            setModalKey={setModalKey}></IsSellingCard>
          <Modal open={isModal} close={ModalHandler} title="상품 관리">
            <p>{item.}</p>
          </Modal>
        </div>
      ))}
    </Container>
  );
}

export default IsSellingCardList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
