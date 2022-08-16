import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { TalkRoom } from '..';
import { Container } from '../../style/common';

function TalksPage(props) {
  return (
    <Container>
      <TalkSection>
        <TalksContainer>
          <Title>전체 대화</Title>
        </TalksContainer>
        <RoutesContainer>
          <Routes>
            <Route path=":talkId" element={<TalkRoom />} />
          </Routes>
        </RoutesContainer>
      </TalkSection>
    </Container>
  );
}

export default TalksPage;

const TalkSection = styled.section`
  height: calc(100vh - 341px);
  width: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  display: flex;
`;

const TalksContainer = styled.article`
  width: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  flex: 1 1 0;
  border-right: 5px solid ${(props) => props.theme.colors.pointBlack};
`;

const Title = styled.h2`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.subBlack};
  font-size: ${(props) => props.theme.fontSizes.h3};
  padding: 1rem;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const RoutesContainer = styled.article`
  width: 100%;
  flex: 1 1 0;
`;
