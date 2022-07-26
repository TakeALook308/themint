import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  margin: 8;
  padding: 8;
  background-color: white;
  color: black;
  width: 420px;
  height: 300px;
  margin-bottom: 5px;
`;
function Card({ title, children }) {
  return (
    <StyledCard>
      {title && <h1>{title}</h1>}
      {children}
    </StyledCard>
  );
}

export default Card;
