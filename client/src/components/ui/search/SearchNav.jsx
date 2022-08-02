import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function SearchNav({ keyword }) {
  return (
    <Container>
      <SearchListNav>
        <NavStyle to={`/search/products/:keyword`}>
          <p>상품명</p>
        </NavStyle>
        <NavStyle to={`search/auction?word=${keyword}`}>
          <pd>경매</pd>
        </NavStyle>
        <NavStyle to={`search/member?word=${keyword}`}>
          <p>프로필</p>
        </NavStyle>
      </SearchListNav>
    </Container>
  );
}
export default SearchNav;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const SearchListNav = styled.nav`
  width: 100%;
  display: flex;
  text-align: center;
  margin-bottom: 20px;
`;

const NavStyle = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  width: 341px;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.mainBlack};
  border-bottom: 2px solid ${(props) => props.theme.colors.subMint};

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
    background-color: ${(props) => props.theme.colors.mainBlack};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-weight: bold;
    border: 3px solid ${(props) => props.theme.colors.subMint};
    border-bottom: none;
  }
`;
