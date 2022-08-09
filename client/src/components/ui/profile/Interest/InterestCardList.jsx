import React, { useState } from 'react';
import { instance } from '../../../../utils/api/api';
import styled from 'styled-components';
import InterestKeyWordCard from './InterestKeyWordCard';
import ActiveInputBox from '../../../common/ActiveInputBox';
import GradientButton from '../../../ButtonList/GradientButton';

function InterestCardList({ keyword }) {
  const [addKeyword, setAddKeyword] = useState('');
  const onChange = (e) => {
    console.log(e.target.value);
    setAddKeyword(e.target);
  };
  const onClick = (e) => {
    console.log(e);
    setAddKeyword(e);
    const keyword_name = addKeyword;
    const addInterest = async (url) => {
      const response = await instance.post(url);
      return response;
    };
    const res = addInterest(`/api/interest/keyword/${keyword_name}`);
    res.then(() => {
      console.log(keyword_name);
    });
  };
  return (
    <Container>
      <form>
        <InputBoxContainer>
          <ActiveInputBox
            name="InterestWord"
            type="text"
            placeholder="키워드를 추가하려면 입력하세요"
            onChange={onChange}
          />
          <GradientButton text={'키워드 추가'} type={'submit'} onClick={onClick} />
        </InputBoxContainer>
      </form>
      <CardContainer>
        <InterestKeyWordCard keyword={'닌텐도'}> {keyword}</InterestKeyWordCard>
        <InterestKeyWordCard keyword={'우리'}> {keyword}</InterestKeyWordCard>
        <InterestKeyWordCard keyword={'더민트'}> {keyword}</InterestKeyWordCard>
        <InterestKeyWordCard keyword={'최고'}> {keyword}</InterestKeyWordCard>
      </CardContainer>
    </Container>
  );
}
export default InterestCardList;

const Container = styled.div`
  width: 100%;
`;
const InputBoxContainer = styled.div`
  width: 30%;
  margin-bottom: 30px;
`;

const CardContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;
