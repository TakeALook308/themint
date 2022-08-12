import React from 'react';
import styled from 'styled-components';
import { ImCross } from 'react-icons/im';

function InterestKeyWordCard({ keyword, getData }) {
  // 관심 키워드 삭제
  const onClick = () => {
    getData(keyword);
  };

  return (
    <Container>
      {keyword}
      <IconContainer>
        <ImCross onClick={onClick} color="FFFFFF" />
      </IconContainer>
    </Container>
  );
}
export default InterestKeyWordCard;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
`;

const IconContainer = styled.div`
  :hover {
    cursor: pointer;
  }
`;
