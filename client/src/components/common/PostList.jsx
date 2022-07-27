import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AuctionCard from './AuctionCard';
import { Link } from 'react-router-dom';

const TOTAL_CARDS = 10;

function PostList() {
  const [currentCard, setCurrentCard] = useState(0);
  const slideRef = useRef(null);

  const NextCard = () => {
    if (currentCard >= TOTAL_CARDS) {
      setCurrentCard(0);
    } else {
      setCurrentCard(currentCard + 1);
    }
  };

  const PrevCard = () => {
    if (currentCard === 0) {
      setCurrentCard(TOTAL_CARDS);
    } else {
      setCurrentCard(currentCard - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 1s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentCard}00%)`;
  }, [currentCard]);

  return (
    <Wrapper>
      <ListHeader>
        <h3>실시간 임박 경매</h3>
        <Link to="/categories/:categoryName">
          <p>더보기</p>
        </Link>
      </ListHeader>
      <hr></hr>
      <button onClick={PrevCard}>이전</button>
      <button onClick={NextCard}>다음</button>
      {currentCard}
      <Container ref={slideRef}>
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

export default PostList;

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
