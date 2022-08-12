import React, { useState, useEffect } from 'react';
import { instance } from '../../utils/apis/api';
import styled from 'styled-components';
import InterestKeyWordCard from './InterestKeyWordCard';
import ActiveInputBox from '../../components/common/ActiveInputBox';
import GradientButton from '../../components/ButtonList/GradientButton';

function InterestKeywordList() {
  const [addKeyword, setAddKeyword] = useState('');
  const [showKeyword, setShowKeyword] = useState([]);
  const onChange = (e) => {
    console.log(e.target.value);
    setAddKeyword(e.target.value);
  };
  // 키워드 추가
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
      const getKeyword = async (url) => {
        const response = await instance.get(url);
        return response;
      };
      const res = getKeyword(`/api/interest/keyword`);
      res.then((keywords) => {
        setShowKeyword(keywords.data.interestKeywordList);
      });
    });
  };
  // 키워드 삭제 API
  const [deleteword, setDeleteword] = useState('');
  const getData = (word) => {
    setDeleteword(word);
    const deleteInterest = async (url) => {
      const response = await instance.delete(url);
      return response;
    };
    const res = deleteInterest(`/api/interest/keyword/${word}`);
    res.then(() => {
      const getKeyword = (url) => {
        const response = instance.get(url);
        return response;
      };
      const res = getKeyword(`/api/interest/keyword`);
      res.then((keywords) => {
        setShowKeyword(keywords.data.interestKeywordList);
      });
    });
  };
  // 키워드 조회 API
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
          <InterestKeyWordCard
            keyword={keyword}
            key={i}
            getData={getData}
            deleteword={deleteword}
          />
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
