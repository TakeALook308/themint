import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InputBox from './InputBox';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function NavigationBar(props) {
  return (
    <Wrapper>
      <Link to="/">
        <NavLogo>더민트</NavLogo>
      </Link>
      <NavSearch>
        <InputBox type="text" placeholder="검색창" widthValue="500px"></InputBox>
      </NavSearch>
      <NavItem>
        <Link to="/categories/:categoryName">
          <p>카테고리</p>
        </Link>
        <Link to="/">
          <p>경매생성</p>
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
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.mainBlack};
  max-width: calc(100% - 50px);
  margin: auto;
  margin-bottom: 20px;
`;

const NavLogo = styled.p`
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
`;

const NavItem = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  align-items: center;
`;

// 아이콘 오류 해결 https://stackoverflow.com/questions/69708504/module-not-found-cant-resolve-mui-icons-material-filedownload
