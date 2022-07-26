import React from 'react';
import styled from 'styled-components';
import LikeCard from './LikeListItem';

function LikeList(props) {
  return (
    <Wrapper>
      <h3>관심 경매</h3>
      <p>더보기</p>
      <hr></hr>
      <Container>
        <LikeCard title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </LikeCard>
        <LikeCard title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </LikeCard>
        <LikeCard title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </LikeCard>
        <LikeCard title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </LikeCard>
        <LikeCard title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </LikeCard>
        <LikeCard title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </LikeCard>
        <LikeCard title="경매 게시글 제목">
          <p>Card 내용을 입력</p>
        </LikeCard>
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

const Container = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 300px;
`;
