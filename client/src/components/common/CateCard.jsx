import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function CateCard({ categoryName }) {
  return (
    <NavStyle to={`/categories/${categoryName}`}>
      <p>{categoryName}</p>
    </NavStyle>
  );
}

export default CateCard;

const NavStyle = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  width: 256px;
  height: 70px;
  font-size: 20px;
  font-weight: 400;
  margin: 2px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.pointBlack};

  outline: invert;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.mainMint};
  }
  &.active {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.subMint};
    position: relative;
  }
  > p {
    margin-top: 20px;
  }
`;
