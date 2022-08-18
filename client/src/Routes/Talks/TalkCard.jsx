import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
import { socketApis } from '../../utils/apis/socketApis';

let sock;
let client;

function TalkCard({ roomInformation }) {
  const [chatList, setChatList] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    (async () => {
      const body = { roomId: roomInformation?.roomId };
      try {
        const response = await fetchData.post(socketApis.CHAT_HISTORY, body);
        setChatList(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    sock = new SockJS('https://i7a308.p.ssafy.io/api/ws-stomp');
    client = Stomp.over(sock);
    client.debug = null;
    client.connect({}, () => {
      client.subscribe(
        '/sub/chat/room/' + roomInformation.roomId,
        function (message) {
          const messagedto = JSON.parse(message.body);
          setChatList((prev) => [...prev, messagedto]);
        },
        (err) => {},
      );
      return () => client.disconnect();
    });
  }, []);

  return (
    <Container active={roomId === roomInformation.roomId}>
      <ProfileContainer>
        <Picture>
          <ProfileImg
            src={process.env.REACT_APP_IMAGE_URL + roomInformation.profileUrl}
            alt={`${roomInformation.nickname}님의 프로필 이미지`}
            width={100}
            height={100}
          />
        </Picture>
      </ProfileContainer>
      <LinkContainer to={`/talks/${roomInformation.roomId}`}>
        <NickName>{roomInformation.nickname}</NickName>
        <LastTalk>{chatList[chatList.length - 1]?.message}</LastTalk>
      </LinkContainer>
    </Container>
  );
}

export const MemoizedTalkCard = React.memo(TalkCard);

const Container = styled.article`
  width: 100%;
  height: 80px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.pointBlack : props.theme.colors.pointGray};
  border-top: 1px solid ${(props) => props.theme.colors.mainBlack};
  display: flex;
  transition: background-color 0.3s ease-out;
  &:hover {
    background-color: ${(props) => props.theme.colors.pointBlack};
  }
`;

const ProfileContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Picture = styled.picture`
  border-radius: 50%;
  overflow: hidden;
  width: 60px;
  height: 60px;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

const LinkContainer = styled(Link)`
  width: 80%;
  padding: 1rem 1rem 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const NickName = styled.p`
  font-weight: bold;
`;

const LastTalk = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
