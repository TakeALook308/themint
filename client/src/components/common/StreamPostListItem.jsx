import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  margin: 8;
  padding: 8;
  background-color: white;
  color: black;
  width: 690px;
  height: 400px;
  margin-bottom: 5px;
`;
function StreamCard({ title, children, post }) {
  return (
    <StyledCard>
      {title && <h1>{title}</h1>}
      {post && <p>{post}</p>}
      {children}
    </StyledCard>
  );
}

export default StreamCard;
