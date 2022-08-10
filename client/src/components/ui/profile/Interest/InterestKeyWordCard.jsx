import React, { useState } from 'react';
import styled from 'styled-components';
import { ImCross } from 'react-icons/im';
import { instance } from '../../../../utils/apis/api';

function InterestKeyWordCard({ keyword }) {
  const [keywordName, setKeywordName] = useState('');

  const onClick = () => {
    console.log(keyword);
    setKeywordName(keyword);
    const keyword_name = keywordName;
    console.log(keyword_name);
    const deleteInterest = async (url) => {
      const response = await instance.delete(url);
      return response;
    };
    const res = deleteInterest(`/api/interest/keyword/${keyword_name}`);
    res.then(() => {
      console.log(keyword_name);
    });
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
