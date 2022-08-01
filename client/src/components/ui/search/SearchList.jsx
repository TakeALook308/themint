import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function SearchList(search,keyword) {
  return (
    <Container>
      <SearchListHeader>{search}의 검색결과</SearchListHeader>
      <SearchListNav>
        <NavStyle to={`/api/product?word=${keyword}`}>
          <HeaderCard>상품명</HeaderCard>
        </NavStyle>
        <NavStyle to={`/api/auction?word=${keyword}`}>
          <HeaderCard>경매</HeaderCard>
        </NavStyle>
        <NavStyle to={`/api/member?word=${keyword}`}>
          <HeaderCard>프로필</HeaderCard>
        </NavStyle>
      </SearchListNav>
    </Container>
  );
}
export default SearchList;

const Container = styled.Container`
  position: relative;
  width: 100%;
`;

const SearchListHeader = styled.header`
  width: 100%;
`;

const SearchListNav = styled.nav`
  width: 100%;
`;

const HeaderCard = styled.card`
  width: 100%;
`;

const NavStyle = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  width: 341px;
  height: 67px;
  font-size: 28px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.pointBlack};
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
    font-weight: bold;
    border: 2px solid ${(props) => props.theme.colors.subMint};
    border-bottom: 2px solid ${(props) => props.theme.colors.mainBlack};
  }
  > p {
    margin-top: 10px;
  }
`;
