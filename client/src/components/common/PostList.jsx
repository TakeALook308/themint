import React from 'react';
import styled from 'styled-components';
import Card from './PostListItem';

const Wrapper = styled.div`
  max-width: calc(100% - 50px);
  margin: auto;
  background-color: ${(props) => props.theme.colors.subBlack};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function PostList(props) {
  return (
    <Wrapper>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
      <Card title="경매 게시글 제목">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </Card>
    </Wrapper>
  );
}

export default PostList;
