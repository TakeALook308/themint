import React from 'react';
import styled from 'styled-components';
import StreamCard from './StreamListItem';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function StreamList(props) {
  return (
    <Wrapper>
      <SlideButtonRight>
        <NavigateNextIcon />
      </SlideButtonRight>
      <SlideButtonLeft>
        <NavigateBeforeIcon />
      </SlideButtonLeft>
      <StreamCard title="경매 게시글 제목" post="경매 게시글 내용">
        <p>경매 썸네일</p>
        <p>경매 게시글 내용</p>
      </StreamCard>
    </Wrapper>
  );
}

export default StreamList;

const Wrapper = styled.div`
  max-width: calc(100% - 50px);
  margin: auto;
  background-color: ${(props) => props.theme.colors.subBlack};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SlideButtonRight = styled.div`
  position: absolute;
  right: 50px;
  align-self: center;
`;

const SlideButtonLeft = styled.div`
  position: absolute;
  left: 50px;
  align-self: center;
`;
