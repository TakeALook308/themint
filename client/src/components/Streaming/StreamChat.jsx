import React, { useState } from 'react';
import styled from 'styled-components';

function StreamChat() {
  return <Article>채팅</Article>;
}

const Article = styled.article`
  height: 60%;
  width: 100%;
  background-color: blue;
  /* background-color: ${(props) => props.theme.colors.subBlack}; */
  border-radius: 10px;
`;

export default StreamChat;
