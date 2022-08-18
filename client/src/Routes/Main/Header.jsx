import React from 'react';
import styled from 'styled-components';

function Header({ title }) {
  return (
    <ListHeader>
      <h2>{title}</h2>
    </ListHeader>
  );
}

export default Header;

const ListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 20px;
  margin-top: 20px;
  > h2 {
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-weight: bold;
    text-shadow: 1px 4px 4px ${(props) => props.theme.colors.textGray};
  }
`;
