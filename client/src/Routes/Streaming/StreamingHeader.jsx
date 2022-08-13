import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { categories } from '../../utils/constants/constant';
import { doCopy } from './TextCopy';
function StreamingHeader({ auctionInfo, countSub }) {
  const navigate = useNavigate();
  const url = useLocation().pathname;
  if (auctionInfo) {
    return (
      <Head>
        <MainText>
          <span>
            {auctionInfo.categorySeq ? categories[auctionInfo.categorySeq - 1].name : null}
          </span>
          <p>
            {auctionInfo.title}
            <span>{countSub}</span>
          </p>
        </MainText>
        <HeadButtonSet>
          <ul>
            <li>
              <button onClick={() => doCopy(process.env.REACT_APP_API_URL + url)}>복사</button>
            </li>
            <li>알림</li>
            <li>경매정보</li>
            <li>
              <button
                onClick={() => {
                  navigate('/main');
                }}>
                나가기
              </button>
            </li>
          </ul>
        </HeadButtonSet>
      </Head>
    );
  } else return <Head></Head>;
}

const Head = styled.div`
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  /* background-color: red; */
`;
const MainText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    color: ${(props) => props.theme.colors.textGray};
  }
  p {
    font-size: 28px;
    font-weight: 700;
  }
`;
const HeadButtonSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ul {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;
export default StreamingHeader;
