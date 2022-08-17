import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';
import { myInformationState } from '../../atoms';
import { fetchData } from '../../utils/apis/api';
import { socketApis } from '../../utils/apis/socketApis';
import { IoIosSend } from 'react-icons/io';

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
  }, [roomId]);

  useEffect(() => {
    sock = new SockJS('https://i7a308.p.ssafy.io/api/ws-stomp');
    client = Stomp.over(sock);
    client.debug = null;
    client.connect({}, () => {
      client.subscribe(
        '/sub/chat/room/' + roomId,
        function (message) {
          const messagedto = JSON.parse(message.body);
          setChatList((prev) => [...prev, messagedto]);
        },
        (err) => {},
      );
      return () => client.disconnect();
    });
  }, [roomId]);

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

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  return (
    <Container>
      <ChatContainer>
        <ChatScroll>
          {chatList.map((chat, i) => (
            <MemoizedChat
              key={i}
              chat={chat}
              previousChat={chatList[i - 1]}
              nextChat={chatList[i + 1]}
            />
          ))}
          <div ref={messagesEndRef}></div>
        </ChatScroll>
      </ChatContainer>
      <Form onSubmit={onSubmit}>
        <ChatInput
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          placeholder="채팅 메세지를 입력해주세요."
        />
        <SendButton type="submit">
          <IoIosSend />
        </SendButton>
      </Form>
    </Container>
  );
}

const ChatCard = ({ chat, previousChat, nextChat }) => {
  const myInformation = useRecoilValue(myInformationState);
  const date = new Date(chat.date);
  const month = date.getMonth();
  const days = date.getDate();
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const nowMinutes = Math.floor((new Date(chat.date).getTime() / (1000 * 60)) % 60);
  const nextMinutes = Math.floor((new Date(nextChat?.date).getTime() / (1000 * 60)) % 60);
  const isSame = !!(chat.memberSeq === nextChat?.memberSeq);
  const previousDate = new Date(previousChat?.date);
  const previousMonth = previousDate?.getMonth();
  const previousDays = previousDate?.getDate();
  return (
    <>
      {(month !== previousMonth || days !== previousDays) && (
        <Today>----------{`${month + 1}월 ${days}일`}-----------</Today>
      )}
      {chat.memberSeq === myInformation.memberSeq ? (
        <MyTalk>
          {((isSame && nowMinutes - nextMinutes !== 0) || !isSame) && (
            <DateText>
              <small>
                {hour}:{minutes}
              </small>
            </DateText>
          )}
          <Talking active={true}>{chat.message}</Talking>
        </MyTalk>
      ) : (
        <YourTalk>
          {chat.memberSeq !== previousChat?.memberSeq && <Nickname>{chat.nickname}</Nickname>}
          <TalkingContainer>
            <Talking>{chat.message}</Talking>
            {((isSame && nowMinutes - nextMinutes !== 0) || !isSame) && (
              <DateText>
                <small>
                  {hour}:{minutes}
                </small>
              </DateText>
            )}
          </TalkingContainer>
        </YourTalk>
      )}
    </>
  );
};

const MemoizedChat = React.memo(ChatCard);

export default TalkRoomPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  position: relative;
  color: ${(props) => props.theme.colors.white};
`;

const ChatContainer = styled.article`
  height: 90%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(206, 206, 206, 0.7);
  }
`;

const ChatScroll = styled.div`
  padding: 2rem;
`;

const ChatInput = styled.input`
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  border: none;
  outline: none;
  height: 40px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  padding-left: 1rem;
  padding-right: 3rem;
`;

const Form = styled.form`
  position: relative;
  width: 100%;
  padding: 0 2rem;
  bottom: 0;
  height: 10%;
  display: flex;
  align-items: center;
`;

const MyTalk = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 0.5rem;
  align-items: end;
  gap: 0.5rem;
`;

const YourTalk = styled.article`
  width: 100%;
  line-height: 1;
  > div {
    margin-top: 0.5rem;
    display: flex;
  }
`;

const DateText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
`;

const Talking = styled.p`
  background-color: ${(props) =>
    props.active ? props.theme.colors.pointGray : props.theme.colors.disabledGray};
  padding: 0.5rem;
  border-radius: 5px;
  max-width: 250px;
  word-wrap: break-word;
`;

const SendButton = styled.button`
  position: absolute;
  right: 0;
  height: 25px;
  width: 25px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-right: 3rem;
`;

const Nickname = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const TalkingContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5rem;
`;

const Today = styled.p`
  text-align: center;
`;
