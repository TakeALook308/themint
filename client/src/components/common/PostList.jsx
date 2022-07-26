import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Card from './PostListItem';

const TOTAL_CARDS = 2;

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
      <h3>실시간 임박 경매</h3>
      <p>더보기</p>
      <hr></hr>
      <button onClick={PrevCard}>이전</button>
      <button onClick={NextCard}>다음</button>
      <Container ref={slideRef}>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
        <Card title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </Card>
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

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  height: 300px;
`;
