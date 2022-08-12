import React, { useState } from 'react';
import styled from 'styled-components';
import { ImCross } from 'react-icons/im';
import { instance } from '../../../../utils/apis/api';

function InterestCateCard({ keyword }) {
  // 관심 카테고리 삭제
  const [keywordName, setKeywordName] = useState('');
  console.log(keyword);
  const onClick = () => {
    setKeywordName(keyword);
    console.log(keyword);
    const keyword_name = keywordName;
    const deleteInterest = async (url) => {
      const response = await instance.delete(url);
      return response;
    };
    const res = deleteInterest(`/api/interest/category/${keyword_name}`);
    res.then(() => {
      console.log(keyword_name);
    });
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
