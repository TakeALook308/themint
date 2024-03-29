import React, { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { keywordState, loggedinState, myInformationState, notificationState } from '../../../atoms';
import Logo from '../../common/Logo';
import SubMenu from './SubMenu';
import { HiSearch, HiOutlineChat } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import Notification from '../../Notification/Notification';
import { useEffect } from 'react';

function NavigationBar() {
  const loggedin = useRecoilValue(loggedinState);
  const myInformation = useRecoilValue(myInformationState);
  const [key, setKey] = useState('');
  const [type, setType] = useState('auction');
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    let word = key.trim();
    if (!word) return;
    setKey(word);
    navigate({
      pathname: '/search',
      search: `?type=${type}&keyword=${word}`,
    });
    console.log('adasd');
  };

  const searchParameter = searchParams.get('keyword');
  useEffect(() => {
    if (location.pathname === '/search') {
      const word = searchParams.get('keyword');
      const newType = searchParams.get('type');
      setKey(word);
      setType(newType);
    } else {
      setKey('');
      setType('auction');
    }
  }, [searchParameter]);

  if (
    location.pathname.startsWith('/streamings') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/help')
  )
    return null;

  return (
    <Container>
      <Wrapper>
        <Logo />
        <NavList>
          <NavSearch onSubmit={onSubmit}>
            <Button type="submit" aria-label="search">
              <HiSearch />
            </Button>
            <SearchBox
              type="text"
              value={key}
              placeholder="검색하기"
              inputProps={{ 'aria-label': '검색하기' }}
              onChange={(e) => setKey(e.target.value)}
            />
          </NavSearch>
          <NavItemText>
            <Link to={`/categories/0`}>
              <p>경매목록</p>
            </Link>
            <Link to="/auctions/new">
              <p>경매생성</p>
            </Link>
          </NavItemText>
          <NavItemIcon>
            {loggedin && (
              <>
                <Link to="/talks">
                  <HiOutlineChat size={25} />
                </Link>
                <Notification />
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

const Button = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
`;

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
  font-weight: bold;
`;

const NavItemIcon = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  font-weight: bold;
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
  font-weight: bold;
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

const NotiContainer = styled.div`
  position: relative;
`;
