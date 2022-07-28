import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InputBase from '@mui/material/InputBase';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';

function NavigationBar(props) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Link to="/">
        <NavLogo>더민트</NavLogo>
      </Link>
      <NavSearch>
        <InputBase
          style={{ padding: 0 }}
          value={search}
          placeholder="검색하기"
          inputProps={{ 'aria-label': '검색하기' }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              navigate(`/`);
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton>
          <SearchIcon type="submit" aria-label="search" onClick={() => navigate(`/`)} />
        </IconButton>
      </NavSearch>
      <NavItem>
        <Link to="/categories/:categoryName">
          <p>카테고리</p>
        </Link>
        <Link to="/">
          <p>경매생성</p>
        </Link>
        <Link to="/">
          <ChatIcon />
        </Link>
        <Link to="/">
          <NotificationsNoneIcon />
        </Link>
        <Link to="/profile/:userId">
          <PersonOutlineIcon />
        </Link>
      </NavItem>
    </Wrapper>
  );
}

export default NavigationBar;

const Wrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.mainBlack};
  max-width: 1024px;
  margin: auto;
`;

const NavLogo = styled.div`
  font-family: 'PyeongChangPeace-Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2')
    format('woff2');
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  color: ${(props) => props.theme.colors.mainMint};
`;

const NavSearch = styled.div`
  margin-left: auto;
  display: flex;
  background-color: ${(props) => props.theme.colors.pointBlack};
  height: 44px;
  border: none;
  border-radius: 5px;
  width: 400px;
  justify-content: space-between;
`;

const NavItem = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  align-items: center;
`;

// 아이콘 오류 해결 https://stackoverflow.com/questions/69708504/module-not-found-cant-resolve-mui-icons-material-filedownload
