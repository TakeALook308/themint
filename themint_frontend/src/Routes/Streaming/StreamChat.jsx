import React, { useState, useSelector, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { IoIosSend } from 'react-icons/io';
function StreamChat({ sendMessage, chat, userInfo }) {
  const [chatMessage, setChatMessage] = useState('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    messagesEndRef.current?.scrollTo({ top: messagesEndRef.current.scrollHeight });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // useEffect(() => {
  //   // scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  // }, [chatMessage]);

  // const scrollRef = useRef();
  return (
    <Article>
      <div className="uld" ref={messagesEndRef}>
        {chat.map((item, i) => {
          if (item.type === 0) {
            return <ComeBox key={i}> {item.message}</ComeBox>;
          } else if (item.type !== 0 && item.memberSeq === userInfo.memberSeq) {
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
        {/* <div></div> */}
      </div>

      <SendBox
        onSubmit={(e) => {
          e.preventDefault();
          if (chatMessage.trim()) {
            sendMessage(chatMessage.trim());
            setChatMessage('');
          }
        }}>
        <input
          type="text"
          placeholder="내용 입력"
          value={chatMessage}
          onChange={(e) => {
            setChatMessage(e.target.value);
          }}
        />
        <button>
          <IoIosSend size={20}></IoIosSend>
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

  .uld {
    flex-grow: 1;
    padding: 10px;
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

    @media screen and (max-width: 768px) {
      min-height: 300px;
    }
  }
  div {
    flex-basis: 0;
  }
`;
const ComeBox = styled.div`
  background-color: #c0c0c0;
  align-self: center;
  color: ${(props) => props.theme.colors.subBlack};
  font-weight: 600;
  width: 80%;
  padding: 3px;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
  font-size: 1rem;
`;
const MyBox = styled.div`
  background-color: ${(props) => props.theme.colors.pointGray};
  align-self: flex-end;

  max-width: 80%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  white-space: pre-wrap;
  /* word-wrap: break-word; */
  word-break: break-all;
`;
const YourBox = styled.div`
  position: relative;
  padding-top: 25px;
  align-self: flex-start;
  max-width: 80%;
  span {
    position: absolute;
    top: 0;
    width: 100%;
  }
  p {
    background-color: ${(props) => props.theme.colors.pointGray};
    align-self: flex-start;

    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    white-space: pre-wrap;
    /* word-wrap: break-word; */
    word-break: break-all;
  }
`;
const SendBox = styled.form`
  width: 100%;
  display: flex;
  padding: 0 5px 10px 5px;
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
    color: ${(props) => props.theme.colors.mainBlack};
    background-color: ${(props) => props.theme.colors.subMint};
    outline: none;
    border: none;
    border-radius: 5px;
    padding-top: 5px;
  }
`;

export default StreamChat;
