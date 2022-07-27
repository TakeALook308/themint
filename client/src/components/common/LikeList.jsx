import React from 'react';
import styled from 'styled-components';
import AuctionCard from './AuctionCard';
import { Link } from 'react-router-dom';

function LikeList(props) {
  return (
    <Wrapper>
      <ListHeader>
        <h3>민트님의 관심 경매</h3>
        <Link to="/categories/:categoryName">
          <p>더보기</p>
        </Link>
      </ListHeader>
      <hr></hr>
      <Container>
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
      </Container>
    </Wrapper>
  );
}

export default LikeList;

const Wrapper = styled.div`
  max-width: calc(100% - 50px);
  margin: auto;
  background-color: ${(props) => props.theme.colors.subBlack};
  margin-bottom: 10px;
  overflow: hidden;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 300px;
`;
