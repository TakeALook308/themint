import React, { useState, useSelector, useEffect } from 'react';

import styled from 'styled-components';

function StreamChat({ sendMessage, chat, userInfo }) {
  const [chatMessage, setChatMessage] = useState('');
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
  /* background-color: blue; */
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;

  ul {
    display: flex;
    flex-direction: column;

    li {
    }
  }
`;
const ComeBox = styled.li`
  background-color: green;
  align-self: center;
  width: 100%;
  margin: 10px;
  padding: 5px;
  text-align: center;
`;
const MyBox = styled.li`
  background-color: ${(props) => props.theme.colors.pointGray};
  align-self: flex-end;

  text-align: center;
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

export default StreamChat;
