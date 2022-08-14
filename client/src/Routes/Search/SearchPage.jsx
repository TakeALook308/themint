import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import { instance } from '../../utils/apis/api';
import { Container } from '../../style/style';
import SearchAuctionPage from '../SearchAuction/SearchAuctionPage';
import SearchProductPage from '../SearchProduct/SearchProductPage';
import SearchProfilePage from '../SearchProfile/SearchProfilePage';

function SearchPage(props) {
  const params = new URLSearchParams(window.location.search);
  const [searchType, setSearchType] = useState(params.get('type'));
  const [searchWord, setSearchWord] = useState(params.get('keyword'));
  const [pageTitle, setPageTitle] = useState('경매 검색');

  return (
    <>
      <Helmet>
        <title>{pageTitle} | 더민트</title>
      </Helmet>

      <Container>
        <HeaderContainer>
          <NavStyle
            className={(props) => {
              return `${props.isActive ? 'isActive ' : ''}iconContainer`;
            }}
            end
            to="">
            경매
          </NavStyle>
          {/* <NavStyle to="searchProduct">상품</NavStyle>
          <NavStyle to="searchProfile">프로필</NavStyle> */}
          <NavStyle to="searchProduct">상품</NavStyle>
          <NavStyle to="searchProfile">프로필</NavStyle>
        </HeaderContainer>
        <StyledMain>
          <Routes>
            <Route path="" element={<SearchAuctionPage params={searchWord} />} />
            <Route path="searchProduct" element={<SearchProductPage params={searchWord} />} />
            <Route path="searchProfile" element={<SearchProfilePage params={searchWord} />} />
          </Routes>
        </StyledMain>
      </Container>
    </>
  );
}

export default SearchPage;

const HeaderContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const NavStyle = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  width: 33.3%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
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
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-weight: bold;
    border: 3px solid ${(props) => props.theme.colors.subMint};
    border-bottom: none;
  }
`;

const StyledMain = styled.main`
  width: 100%;
`;
