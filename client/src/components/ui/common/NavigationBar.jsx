import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedinState, myInformationState } from '../../../atoms';
import Logo from '../../common/Logo';
import SubMenu from './SubMenu';
import { HiSearch, HiOutlineChat, HiOutlineBell } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';

function NavigationBar({ url, keyword, categoryName }) {
  const loggedin = useRecoilValue(loggedinState);
  const myInformation = useRecoilValue(myInformationState);
  const [search, setSearch] = useState('');
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const navigate = useNavigate();
  const onClick = () => {
    navigate({
      pathname: '/search',
      search: `?type=auction&keyword=${search}`,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/search',
      search: `?type=auction&keyword=${search}`,
    });
  };

  if (
    window.location.pathname.startsWith('/streamings') ||
    window.location.pathname.startsWith('/register') ||
    window.location.pathname.startsWith('/login') ||
    window.location.pathname.startsWith('/help')
  )
    return null;

  return (
    <Container>
      <Wrapper>
        <Logo />
        <NavList>
          <NavSearch onSubmit={onSubmit}>
            <HiSearch type="submit" aria-label="search" onClick={onClick} />
            <SearchBox
              type="text"
              value={search}
              placeholder="검색하기"
              inputProps={{ 'aria-label': '검색하기' }}
              onChange={onChangeSearch}
            />
          </NavSearch>
          <NavItemText>
            <Link to={`/categories/0`}>
              <p>카테고리</p>
            </Link>
            <Link to="/auctions/new">
              <p>경매생성</p>
            </Link>
          </NavItemText>
          <NavItemIcon>
            {loggedin && (
              <>
                <Link to="/">
                  <HiOutlineChat size={25} />
                </Link>
                <Link to="/">
                  <HiOutlineBell size={25} />
                </Link>
                <SubContainer to={`profile/${myInformation.memberSeq}`}>
                  <AiOutlineUser size={25} />
                  <NavbarDropdownContent>
                    <SubMenu />
                  </NavbarDropdownContent>
                </SubContainer>
              </>
            )}
            {!loggedin && (
              <>
                <Link to="login">
                  <p>로그인</p>
                </Link>
                |
                <Link to="register">
                  <p>회원가입</p>
                </Link>
              </>
            )}
          </NavItemIcon>
        </NavList>
      </Wrapper>
    </Container>
  );
}

export default NavigationBar;

const Container = styled.header`
  max-width: 100%;
  position: fixed;
  margin: 0 auto;
  right: 0;
  left: 0;
  z-index: 10;
`;

const Wrapper = styled.nav`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.mainBlack};
  max-width: 1024px;
  height: 80px;
  margin: 0 auto;
  > h1 {
    width: 100px;
    height: 40px;
  }
`;

const NavList = styled.div`
  width: 100%;
  display: flex;
`;

const NavSearch = styled.form`
  display: flex;
  background-color: ${(props) => props.theme.colors.pointBlack};
  border: none;
  border-radius: 5px;
  align-items: center;
  padding-left: 10px;
  margin-left: auto;
`;

const SearchBox = styled.input`
  background-color: ${(props) => props.theme.colors.pointBlack};
  height: 35px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.white};
  width: 380px;
  &:focus {
    outline: none;
  }
`;

const NavItemText = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
`;

const NavItemIcon = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
`;

const fadeIn = keyframes`
   0% {
        display: none;
        opacity: 0;
    }

    1% {
        display: block;
        opacity: 0;
    }

    100% {
        display: block;
        opacity: 1;
    }
`;

const NavbarDropdownContent = styled.ul`
  position: absolute;
  min-width: 120px;
  height: fit-content;
  padding: 0.5rem;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.pointBlack};
  right: 0;
  border-radius: 5px;
  transition: all 1s ease-in;
  li {
    margin-bottom: 0.5rem;
  }
  li:last-child {
    margin-bottom: 0;
  }
`;

const SubContainer = styled.div`
  cursor: pointer;
  position: relative;
  transition: all 5s ease-out;
  & ${NavbarDropdownContent} {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
    li {
      visibility: hidden;
      opacity: 0;
    }
  }
  &:hover ${NavbarDropdownContent} {
    visibility: visible;
    opacity: 1;
    li {
      visibility: visible;
      opacity: 1;
    }
  }
`;
