import React, { useState, useSelector, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';

function StreamChat() {
  var sock = new SockJS('http://localhost:8081/api/ws-stomp');
  let client = Stomp.over(sock);
  let nickname = '민서';
  let roomId = 'test';
  const [chatMessage, setChatMessage] = useState('');
  const [mm, setMm] = useState(['하이']);
  useEffect(() => {
    client.connect({}, () => {
      console.log('Connected : ' + roomId);
      client.send(
        '/pub/chat/message',
        {},
        JSON.stringify({ type: 0, roomId: roomId, nickname: nickname, memberSeq: 1 }),
      );

      // Create Message
      client.send(
        `/pub/chat/message`,
        {},
        JSON.stringify({
          type: 1,
          roomId: roomId,
          nickname: nickname,
          message: chatMessage,
          memberSeq: 1,
        }),
      );

      client.subscribe('/sub/chat/room/' + roomId, function (message) {
        const messagedto = JSON.parse(message.body);
        setMm(...mm, messagedto);
      });
    });
    return () => client.disconnect();
  }, []);
  return (
    <Article>
      <ul>
        {mm.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p>{chatMessage}</p>

      <input
        type="text"
        placeholder="내용 입력"
        // value={chatMessage}
        // onChange={(e) => {
        //   setChatMessage(e.target.value);
        // }}
      />
      <button
        onClick={() => {
          client.send(
            `/pub/chat/message`,
            {},
            JSON.stringify({
              type: 1,
              roomId: roomId,
              nickname: nickname,
              message: chatMessage,
              memberSeq: 1,
            }),
          );
        }}>
        send
      </button>
    </Article>
  );
}

const Article = styled.article`
  height: 60%;
  width: 100%;
  background-color: blue;
  /* background-color: ${(props) => props.theme.colors.subBlack}; */
  border-radius: 10px;
`;

export default StreamChat;
