import React from 'react';
import styled from 'styled-components';

function LikeCard({ title, children }) {
  return (
    <StyledCard>
      {title && <h1>{title}</h1>}
      {children}
      <CardImg src="https://cdn.shopify.com/s/files/1/0099/5708/1143/products/1904792_WHIT_1_540x.jpg?v=1654548595"></CardImg>
    </StyledCard>
  );
}

export default LikeCard;
const StyledCard = styled.div`
  margin: 8;
  padding: 8;
  background-color: white;
  color: black;
  width: 420px;
  height: 300px;
  margin-bottom: 5px;
`;

const CardImg = styled.img`
  max-height: 200px;
  object-fit: scale-down;
`;
