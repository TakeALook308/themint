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
          } else if (item.type !== 0 && item.memberSeq === userInfo.memberSeq) {
            return <MyBox key={i}>{item.message}</MyBox>;
          } else {
            return (
              <MyBox key={i}>
                {/* <span>{item.nickname}</span> */}
                {/* <p>{item.message}</p> */}
                {item.message}
              </MyBox>
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
  height: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  ul {
    flex-grow: 1;

    height: 100%;
    flex-basis: 0;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 10px;
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
      /* background-color: red; */
    }
  }
  li {
    flex-basis: 0;
  }
`;
const ComeBox = styled.li`
  background-color: #c0c0c0;
  align-self: center;
  color: ${(props) => props.theme.colors.subBlack};
  font-weight: 600;
  width: 80%;
  padding: 3px;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
`;
const MyBox = styled.li`
  background-color: ${(props) => props.theme.colors.pointGray};
  align-self: flex-end;

  max-width: 80%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  white-space: pre-wrap;
`;
const YourBox = styled.li`
  background-color: ${(props) => props.theme.colors.pointGray};
  align-self: flex-end;

  max-width: 80%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  white-space: pre-wrap;
  /* position: relative;
  padding-top: 25px;
  align-self: flex-start;
  width: 100%;
  span {
    position: absolute;
    
    top: 0;
  }
  p {
    
    background-color: ${(props) => props.theme.colors.pointGray};
    align-self: flex-start;
    flex-basis: 0;
    max-width: 80%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    white-space: pre-wrap;
  } */
`;
const SendBox = styled.div`
  width: 100%;
  display: flex;
  padding: 0 5px;
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
