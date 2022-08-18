import React, { useState, useEffect } from 'react';
import { instance } from '../../utils/apis/api';
import styled from 'styled-components';
import InterestKeyWordCard from './InterestKeyWordCard';
import ActiveInputBox from '../../components/common/ActiveInputBox';
import GradientButton from '../../components/ButtonList/GradientButton';
import { errorToast } from '../../lib/toast';

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
    const addInterest = async (url) => {
      const response = await instance.post(url);
      return response;
    };
    const res = addInterest(`/api/interest/keyword/${keyword_name}`);
    res.catch((error) => {
      errorToast('이미 추가된 키워드입니다');
    });
    res.then(() => {
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
  // 키보드 엔터로 키워드 추가
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
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
          <input
            name="InterestWord"
            type="text"
            placeholder="키워드를 추가하려면 입력하세요"
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        </InputBoxContainer>
        <ButtonContainer>
          <GradientButton text={'키워드 추가'} onClick={onClick} />
        </ButtonContainer>
      </AddKeyword>

      <CardContainer>
        {showKeyword.map((keyword, i) => (
          <InterestKeyWordCard keyword={keyword} key={i} getData={getData} />
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
  width: 32%;
  margin-bottom: 30px;
  margin-right: 30px;
  > input {
    background-color: ${(props) => props.theme.colors.pointBlack};
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 40px;
    font-size: 20px;
    outline: none;
    color: ${(props) => props.theme.colors.white};
    padding-left: 15px;
  }
`;

const ButtonContainer = styled.div`
  width: 20%;
  margin-bottom: 30px;
`;
