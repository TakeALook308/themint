import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';
import { myInformationState } from '../../atoms';
import { fetchData } from '../../utils/apis/api';
import { socketApis } from '../../utils/apis/socketApis';

let sock;
let client;
function TalkRoomPage() {
  const myInformation = useRecoilValue(myInformationState);
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState('');
  const { roomId } = useParams();
  useEffect(() => {
    (async () => {
      const body = { roomId };
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
    client.connect({}, () => {
      console.log('Connected : ' + roomId);
      //연결 후 데이터 가져오기
      client.subscribe(
        '/sub/chat/room/' + roomId,
        function (message) {
          const messagedto = JSON.parse(message.body);
          setChatList((prev) => [...prev, messagedto]);
        },
        (err) => {},
      );
      //종료
      return () => client.disconnect();
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!chat) return;
    sendMessage(chat);
    setChat('');
  };

  const sendMessage = (msg) => {
    client.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: 2,
        roomId: roomId,
        nickname: myInformation.nickname,
        message: msg,
        memberSeq: myInformation.memberSeq,
      }),
    );
  };

  return (
    <Container>
      <ChatContainer>
        {chatList.map((chat, i) => (
          <ChatCard key={i} chat={chat} />
        ))}
      </ChatContainer>
      <Form onSubmit={onSubmit}>
        <ChatInput value={chat} onChange={(e) => setChat(e.target.value)} />
        <button type="submit">전송</button>
      </Form>
    </Container>
  );
}

const ChatCard = ({ chat }) => {
  const myInformation = useRecoilValue(myInformationState);

  return (
    <>
      {chat.memberSeq === myInformation.memberSeq ? (
        <MyTalk>
          <p>{chat.nickname}</p>
          <p>{chat.message}</p>
          <p>{chat.data}</p>
        </MyTalk>
      ) : (
        <div>
          <p>{chat.nickname}</p>
          <p>{chat.message}</p>
          <p>{chat.data}</p>
        </div>
      )}
    </>
  );
};

export default TalkRoomPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  position: relative;
  color: ${(props) => props.theme.colors.white};
  padding: 3rem;
`;

const ChatContainer = styled.div`
  height: 90%;
  overflow-y: scroll;
`;

const ChatInput = styled.input`
  width: 90%;
`;

const Form = styled.form`
  position: relative;
  width: 100%;
  padding: 0 1rem;
  bottom: 0;
  height: 10%;
`;

const MyTalk = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
