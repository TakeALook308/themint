import React from 'react';
import styled from 'styled-components';
import { ImCross } from 'react-icons/im';

function InterestCateCard({ keyword, getData }) {
  // 관심 카테고리 삭제
  const onClick = () => {
    getData(keyword);
  };
  //숫자값을 카테고리명으로 변경
  const categoriesToName = [
    '',
    '패션의류/잡화',
    '뷰티',
    '출산/유아동',
    '식품',
    '주방용품',
    '생활용품',
    '홈인테리어',
    '가전/디지털',
    '스포츠/레저',
    '자동차용품',
    '도서/음반/DVD',
    '완구/취미',
    '문구/오피스',
    '반려동물용품',
    '헬스/건강식품',
  ];
  return (
    <Container>
      {categoriesToName[keyword]}
      <IconContainer>
        <ImCross onClick={onClick} color="FFFFFF" />
      </IconContainer>
    </Container>
  );
}
export default InterestCateCard;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const IconContainer = styled.div`
  :hover {
    cursor: pointer;
  }
`;
