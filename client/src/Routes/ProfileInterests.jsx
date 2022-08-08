import React from 'react';
import styled from 'styled-components';
import InterestButton from '../components/ui/profile/InterestButton';
import InterestCardList from '../components/ui/profile/InterestCardList';

function ProfileInterests(props) {
  // 닫기버튼을 누르면 API에 삭제요청
  // 로그인 한 경우에만 카드 리스트 보이도록 조건
  return (
    <Container>
      <InterestButton />
      <InterestCardList />
    </Container>
  );
}

export default ProfileInterests;

const Container = styled.div`
  width: 100%;
`;
