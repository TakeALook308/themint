import React, { useState, useEffect } from 'react';
import { instance } from '../../../../utils/apis/api';
import styled from 'styled-components';
import InterestKeyWordCard from './InterestKeyWordCard';
import ActiveInputBox from '../../../common/ActiveInputBox';
import GradientButton from '../../../ButtonList/GradientButton';

function InterestKeywordList() {
  const [addKeyword, setAddKeyword] = useState('');
  const [showKeyword, setShowKeyword] = useState([]);
  const onChange = (e) => {
    console.log(e.target.value);
    setAddKeyword(e.target.value);
  };
  const onClick = () => {
    const keyword_name = addKeyword;
    console.log(keyword_name);
    const addInterest = async (url) => {
      const response = await instance.post(url);
      return response;
    };
    const res = addInterest(`/api/interest/keyword/${keyword_name}`);
    res.then(() => {
      console.log(keyword_name);
    });
  };
  useEffect(() => {
    const getKeyword = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getKeyword(`/api/interest/keyword`);
    res.then((keywords) => {
      setShowKeyword(keywords.data.interestKeywordList);
    });
  }, []);
  // 추가 삭제가 실시간으로 렌더링은 되더라도 필요할 때만 요청하게 해야되는데..
  return (
    <Container>
      <AddKeyword>
        <InputBoxContainer>
          <ActiveInputBox
            name="InterestWord"
            type="text"
            placeholder="키워드를 추가하려면 입력하세요"
            onChange={onChange}
          />
        </InputBoxContainer>
        <ButtonContainer>
          <GradientButton text={'키워드 추가'} onClick={onClick} />
        </ButtonContainer>
      </AddKeyword>

      <CardContainer>
        {showKeyword.map((keyword, i) => (
          <InterestKeyWordCard keyword={keyword} key={i} />
        ))}
      </CardContainer>
    </Container>
  );
}
export default InterestKeywordList;

const Container = styled.div`
  width: 100%;
`;
const CardContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;
const AddKeyword = styled.div`
  display: flex;
`;

const InputBoxContainer = styled.div`
  width: 30%;
  margin-bottom: 30px;
  margin-right: 30px;
`;

const ButtonContainer = styled.div`
  width: 20%;
  margin-bottom: 30px;
`;
