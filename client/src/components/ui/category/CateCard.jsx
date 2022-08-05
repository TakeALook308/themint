import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function CateCard({ categoryName, categoryKey }) {
  return (
    <NavStyle to={`/categories/${categoryKey}`}>
      <p>{categoryName}</p>
    </NavStyle>
  );
}

export default CateCard;

const NavStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  width: 252px;
  height: 36px;
  font-size: 16px;
  font-weight: 400;
  margin: 2px;
  background-color: ${(props) => props.theme.colors.pointBlack};

  outline: invert;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.subMint};
  }
  &.active {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.subMint};
    position: relative;
    font-weight: bold;
  }
`;
