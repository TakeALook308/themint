import React, { useState, useSelector, useEffect } from 'react';

import styled from 'styled-components';

function StreamChat({ sendMessage, chat }) {
  const [chatMessage, setChatMessage] = useState('');

  return (
    <Article>
      <ul>
        {chat.map((item, i) => (
          <li key={i}>
            {item.nickname} : {item.message}
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="내용 입력"
        value={chatMessage}
        onChange={(e) => {
          setChatMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if (chatMessage) {
            sendMessage(chatMessage);
            setChatMessage('');
          }
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
