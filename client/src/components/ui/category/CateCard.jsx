import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function CateCard({ categoryKey, categoryName }) {
  return (
    <NavStyle to={`/categories/${categoryKey}`} id={categoryKey} title={categoryName}>
      {categoryName}
    </NavStyle>
  );
}

export default CateCard;

const NavStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  width: 256px;
  height: 36px;
  font-size: 16px;
  font-weight: 400;
  border: 2px solid ${(props) => props.theme.colors.mainBlack};
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
