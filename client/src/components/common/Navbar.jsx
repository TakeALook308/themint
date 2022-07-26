import React from 'react';
import styled from 'styled-components';
import InputBox from './InputBox';
import DefaultButton from './DefaultButton';

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid grey;
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

const NavSearch = styled.div``;

const NavItem = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
`;

function NavigationBar(props) {
  return (
    <Wrapper>
      <NavLogo>더 민트</NavLogo>
      <NavSearch>
        <InputBox type="text" placeholder="검색창" widthValue="500px"></InputBox>
      </NavSearch>
      <NavItem>
        <DefaultButton title="카테고리" widthValue="200px"></DefaultButton>
        <DefaultButton title="경매생성" widthValue="200px"></DefaultButton>
        <DefaultButton title="종" widthValue="50px"></DefaultButton>
        <DefaultButton title="프로필" widthValue="50px"></DefaultButton>
      </NavItem>
    </Wrapper>
  );
}

export default NavigationBar;
