import React, { useState } from 'react';
import styled from 'styled-components';

function StreamingHeader() {
  return (
    <Head>
      <div>
        <span>카테고리</span>
        <p>
          제목<span>인원수</span>
        </p>
      </div>
      <div>
        <ul>
          <li>복사</li>
          <li>알림</li>
          <li>경매정보</li>
          <li>나가기</li>
        </ul>
      </div>
    </Head>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* background-color: ${(props) => props.theme.colors.subBlack}; */
  background-color: red;
`;
export default StreamingHeader;
