import React, { useState, useSelector, useEffect, useRef } from 'react';

import styled from 'styled-components';

function StreamChat({ sendMessage, chat, userInfo }) {
  const [chatMessage, setChatMessage] = useState('');

  const scrollRef = useRef();
  return (
    <Article>
      <ul>
        {chat.map((item, i) => {
          if (item.type === 0) {
            return <ComeBox key={i}> {item.message}</ComeBox>;
          } else if (item.memberSeq === userInfo.memberSeq) {
            return <MyBox key={i}>{item.message}</MyBox>;
          } else {
            return (
              <YourBox key={i}>
                <span>{item.nickname}</span>
                <p>{item.message}</p>
              </YourBox>
            );
          }
        })}
      </ul>

      <SendBox>
        <input
          type="text"
          placeholder="내용 입력"
          value={chatMessage}
          onChange={(e) => {
            setChatMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              sendMessage(chatMessage);
              setChatMessage('');
            }
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
      </SendBox>
    </Article>
  );
}

const Article = styled.article`
  width: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  ul {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  li {
  }
`;
const ComeBox = styled.li`
  background-color: ${(props) => props.theme.colors.subMint};
  align-self: center;
  color: ${(props) => props.theme.colors.subBlack};
  font-weight: 600;
  width: 80%;
  margin: 10px;
  padding: 3px;
  border-radius: 5px;
  text-align: center;
`;
const MyBox = styled.li`
  background-color: ${(props) => props.theme.colors.pointGray};
  align-self: flex-end;
  max-width: 80%;
  border-radius: 5px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 5px 10px;
`;
const YourBox = styled.li`
  position: relative;
  margin: 25px 5px 5px;
  align-self: flex-start;
  max-width: 80%;
  span {
    position: absolute;
    top: -24px;
  }
  p {
    background-color: ${(props) => props.theme.colors.pointGray};
    border-radius: 5px;
    min-height: 30px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
  }
`;
const SendBox = styled.div`
  bottom: 0;
  width: 100%;
  display: flex;
  gap: 10px;
  input {
    flex-grow: 1;
    height: 35px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.pointBlack};
    border: none;
    padding: 0 10px;
    color: ${(props) => props.theme.colors.white};
    outline: none;
  }
  button {
    width: 50px;
  }
`;

export default StreamChat;
