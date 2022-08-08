import React from 'react';
import styled from 'styled-components';

function InterestItemCard({ keyword }) {
  const onClick = () => {
    // 삭제요청 API
  };
  return (
    <Container>
      {keyword}
      <span onClick={onClick}>X</span>
    </Container>
  );
}
export default InterestItemCard;

const Container = styled.div`
  font-size: 20px;
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  > span {
    position: absolute;
    right: 5%;
  }
`;
