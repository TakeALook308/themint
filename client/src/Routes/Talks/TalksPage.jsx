import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TalkRoom } from '..';
import { Container } from '../../style/common';
import { fetchData } from '../../utils/apis/api';
import { socketApis } from '../../utils/apis/socketApis';
import { MemoizedTalkCard } from './TalkCard';
import { TbMoodSad } from 'react-icons/tb';

function TalksPage() {
  const [roomInformationList, setRoomInformationList] = useState([]);
  const { roomId } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData.get(socketApis.CHAT_ROOMS);
        if (response.status === 200) {
          setRoomInformationList(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container>
      <TalkSection>
        <TalksContainer>
          <Title>전체 대화</Title>
          {roomInformationList.length === 0 && (
            <>
              <NotExist>
                아직 개설된 채팅방이 없어요
                <TbMoodSad />
              </NotExist>
            </>
          )}
          {roomInformationList?.map((roomInformation, idx) => (
            <MemoizedTalkCard roomInformation={roomInformation} key={idx} />
          ))}
        </TalksContainer>
        <RoutesContainer>
          {!roomId && <BeforeChatRoom>다른 유저와 대화를 시작해보세요</BeforeChatRoom>}
          <Routes>
            <Route path=":talkId" element={<TalkRoom />} />
          </Routes>
        </RoutesContainer>
      </TalkSection>
    </Container>
  );
}

export default TalksPage;

const NotExist = styled.p`
  padding: 2rem;
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const TalkSection = styled.section`
  height: calc(100vh - 341px);
  width: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  display: flex;
`;

const TalksContainer = styled.article`
  width: 50%;
  background-color: ${(props) => props.theme.colors.subBlack};
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
  width: 50%;
`;

const BeforeChatRoom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: bold;
`;
