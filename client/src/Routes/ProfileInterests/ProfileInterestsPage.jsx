import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InterestKeywordList from './InterestKeywordList';
import { myInformationState } from '../../atoms';
import { useRecoilValue } from 'recoil';
import InterestAuctionList from './InterestAuctionList';
import InterestCateList from './InterestCateList';

function ProfileInterestsPage({ params }) {
  const [active, setActive] = useState(1);
  const onKeyword = () => {
    setActive(1);
  };

  const onCategory = () => {
    setActive(2);
  };

  const onAuction = () => {
    setActive(3);
  };
  return (
    <Container>
      <ButtonNav>
        <StyledBtn
          key={1}
          className={active === 1 ? 'active' : undefined}
          id={1}
          onClick={onKeyword}>
          키워드
        </StyledBtn>
        <StyledBtn
          key={2}
          className={active === 2 ? 'active' : undefined}
          id={2}
          onClick={onCategory}>
          카테고리
        </StyledBtn>
        <StyledBtn
          key={3}
          className={active === 3 ? 'active' : undefined}
          id={3}
          onClick={onAuction}>
          경매
        </StyledBtn>
      </ButtonNav>
      <InterestContainer>
        {active === 1 && <InterestKeywordList />}
        {active === 2 && <InterestCateList />}
        {active === 3 && <InterestAuctionList />}
      </InterestContainer>
    </Container>
  );
}

export default ProfileInterestsPage;

const Container = styled.div`
  width: 100%;
`;

const ButtonNav = styled.nav`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const StyledBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px 10px 0px;
  font-size: 16px;
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

const InterestContainer = styled.div`
  width: 100%;
`;
