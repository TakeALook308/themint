import React, { useState, useSelector, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';
import styled from 'styled-components';

function StreamChat() {
  let sock = new SockJS('/ws-stomp');
  let ws = Stomp.over(sock);
  let nickname = '민트';
  useEffect(() => {
    console.log('Connected : ' + nickname);
    ws.send('/pub/chat/message', {}, JSON.stringify(nickname));
  });

  // 방 제목 가져오기
  //  const { roomName, category } = useSelector((state) => state.chat.currentChat);
  //  const roomId = useSelector((state) => state.chat.currentChat.roomId);
  // const roomId = 'test';

  // let reconnect = 0;
  // const [mm, setMm] = useState({
  //   roomId: 'test',
  //   sender: '민트',
  //   message: chatMessage,
  //   messages: [],
  //   sendMessage: () => {
  //     ws.send(
  //       '/pub/chat/message',
  //       {},
  //       JSON.stringify({
  //         type: 'TALK',
  //         roomId: this.roomId,
  //         sender: this.sender,
  //         message: this.message,
  //       }),
  //     );
  //   },
  //   recvMessage: (recv) => {
  //     this.messages.unshift({
  //       type: recv.type,
  //       sender: recv.type == 'ENTER' ? '[알림]' : recv.sender,
  //       message: recv.message,
  //     });
  //   },
  // });

  // const connect = () => {
  //   ws.connect(
  //     {},
  //     function (frame) {
  //       ws.subscribe('/sub/chat/room/' + mm.roomId, function (message) {
  //         let recv = JSON.parse(message.body);
  //         mm.recvMessage(recv);
  //       });
  //       ws.send(
  //         '/pub/chat/message',
  //         {},
  //         JSON.stringify({ type: 'ENTER', roomId: mm.roomId, sender: mm.sender }),
  //       );
  //     },
  //     function (error) {
  //       if (reconnect++ <= 5) {
  //         setTimeout(function () {
  //           console.log('connection reconnect');
  //           sock = new SockJS('/ws-stomp');
  //           ws = Stomp.over(sock);
  //           connect();
  //         }, 10 * 1000);
  //       }
  //     },
  //   );
  // };

  // const sendMessage = () => {
  //   ws.send(
  //     '/pub/chat/message',
  //     {},
  //     JSON.stringify({
  //       type: 'TALK',
  //       roomId: this.roomId,
  //       sender: this.sender,
  //       message: this.message,
  //     }),
  //   );
  //   this.message = '';
  // };
  // const [chatMessage, setChatMessage] = useState('');
  return (
    <Article>
      {/* <ul>
        {mm.messages.map((item, i) => (
          <li key={i}>
            {item.sender} : {item.message}
          </li>
        ))}
      </ul>
      <p>{chatMessage}</p>
      <input
        type="text"
        placeholder="내용 입력"
        value={chatMessage}
        onChange={(e) => {
          setChatMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>send</button> */}
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
