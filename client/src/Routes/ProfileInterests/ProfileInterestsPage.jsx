import React, { useState } from 'react';
import styled from 'styled-components';
import InterestKeywordList from './InterestKeywordList';
import InterestCateList from './InterestCateList';
import InfiniteAuctionList from '../../components/common/InfiniteAuctionList';
import SkeletonAuctionCard from '../../components/CardList/SkeletonAuctionCard';
import InterestAuctionCard from './InterestAuctionCard';
import { instance } from '../../utils/apis/api';
import { useLocation } from 'react-router-dom';

function ProfileInterestsPage({ params }) {
  const location = useLocation();
  console.log(location);
  const [active, setActive] = useState(1);
  console.log(active);
  const onKeyword = () => {
    setActive(1);
  };

  const onCategory = () => {
    setActive(2);
  };

  const onAuction = () => {
    setActive(3);
  };
  const [isDeleted, setIsDeleted] = useState(true);
  const getUrl = (size) => {
    return (page) => `/api/interest/auction?page=0&size=${size}`;
  };

  const deleteAuction = (auction) => {
    const deleteInterest = async (url) => {
      const response = await instance.delete(url);
      return response;
    };
    const res = deleteInterest(`/api/interest/auction/${auction.hash}`);
    res.then(() => {
      setIsDeleted((prev) => {
        setIsDeleted(!prev);
      });
    });
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
        {active === 1 && <InterestKeywordList active={active} />}
        {active === 2 && <InterestCateList active={active} />}
        {active === 3 && (
          <InfiniteAuctionList
            getUrl={getUrl(params, 9)}
            queryKey={[`${isDeleted}${active}${location.pathname}${params}`]}
            CardComponent={InterestAuctionCard}
            SkeltonCardComponent={SkeletonAuctionCard}
            text={'관심 경매 내역이 없습니다'}
            func={deleteAuction}
          />
        )}
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
