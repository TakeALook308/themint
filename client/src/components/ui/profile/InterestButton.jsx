import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

function InterestButton(props) {
  const [active, setActive] = useState('1');

  const onKeyword = async () => {
    setActive('1');
    console.log(active);

    // API 작성후 주소 수정
    const res = await axios.get(`/keyword`);
    return res?.data;
  };
  const onCategory = async () => {
    setActive('2');
    console.log(active);
    // API 작성후 주소 수정
    const res = await axios.get(`/category`);
    return res?.data;
  };
  const onAuction = async () => {
    setActive('3');
    console.log(active);
    // API 작성후 주소 수정
    const res = await axios.get(`/auction`);
    return res?.data;
  };
  return (
    <ButtonNav>
      <StyledBtn
        key={1}
        className={active === '1' ? 'active' : undefined}
        id={'1'}
        onClick={onKeyword}>
        키워드
      </StyledBtn>
      <StyledBtn
        key={2}
        className={active === '2' ? 'active' : undefined}
        id={'2'}
        onClick={onCategory}>
        카테고리
      </StyledBtn>
      <StyledBtn
        key={3}
        className={active === '3' ? 'active' : undefined}
        id={'3'}
        onClick={onAuction}>
        경매
      </StyledBtn>
    </ButtonNav>
  );
}

export default InterestButton;

const ButtonNav = styled.nav`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const StyledBtn = styled.div`
<<<<<<< HEAD
  text-align: center;
  padding-top: 10px;
  font-size: 16px;
=======
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px 10px 0px;
  font-size: 18px;
>>>>>>> 86e9793d1be03b370d3d301e516a7b3dbeaa3163
  width: 13%;
  height: 40px;
  margin-right: 20px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlack};
  border: 2px solid ${(props) => props.theme.colors.white};
  border-radius: 24px;
  &:link {
    transition: 0.8s;
    text-decoration: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.subMint};
    border-color: ${(props) => props.theme.colors.subMint};
    cursor: pointer;
  }

  &.active {
    font-weight: 900;
    color: ${(props) => props.theme.colors.mainBlack};
    background-color: ${(props) => props.theme.colors.subMint};
    border-color: ${(props) => props.theme.colors.subMint};
    position: relative;
  }
`;
