import React from 'react';
import styled from 'styled-components';
import InputBox from './InputBox';

function NavigationBar(props) {
  return (
    <Wrapper>
      <NavLogo>더 민트</NavLogo>
      <NavSearch>
        <InputBox type="text" placeholder="검색창" widthValue="500px"></InputBox>
      </NavSearch>
      <NavItem>
        <a href="#">카테고리</a>
        <a href="#">경매생성</a>
        <button>알림</button>
        <button>프로필</button>
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
  margin-right: auto;
`;

const NavSearch = styled.div``;

const NavItem = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  align-items: center;
`;
