import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

function IsellingButton(props) {
  const [active, setActive] = useState('1');

  const onSelling = async () => {
    setActive('1');
    console.log(active);

    // API 작성후 주소 수정
    const res = await axios.get(`/selling`);

    return res?.data;
  };
  const onSold = async () => {
    setActive('2');

    // API 작성후 주소 수정
    const res = await axios.get(`/sold`);
    return res?.data;
  };
  return (
    <ButtonNav>
      <StyledBtn
        key={1}
        className={active === '1' ? 'active' : undefined}
        id={'1'}
        onClick={onSelling}>
        판매중
      </StyledBtn>
      <StyledBtn
        key={2}
        className={active === '2' ? 'active' : undefined}
        id={'2'}
        onClick={onSold}>
        판매완료
      </StyledBtn>
    </ButtonNav>
  );
}

export default IsellingButton;

const ButtonNav = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  margin-bottom: 50px;
`;

const StyledBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px 10px 0px;
  font-size: 18px;
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
    color: ${(props) => props.theme.colors.mainMint};
    border-color: ${(props) => props.theme.colors.mainMint};
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
