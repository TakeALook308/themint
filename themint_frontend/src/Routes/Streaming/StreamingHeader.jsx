import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { categories } from '../../utils/constants/constant';
import { doCopy } from './TextCopy';
import { BiLink } from 'react-icons/bi';
import { BsDoorOpen, BsFileEarmarkText } from 'react-icons/bs';
import Notification from '../../components/Notification/Notification';
function StreamingHeader({ auctionInfo, countSub }) {
  const navigate = useNavigate();
  const url = useLocation().pathname;
  // console.log(auctionInfo);
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
            <li onClick={() => doCopy(process.env.REACT_APP_API_URL + url)}>
              <BiLink size={25}></BiLink>
              <span>링크 복사</span>
            </li>
            <li>
              <Notification />
              <span>알림</span>
            </li>
            <li>
              <a href={`/auctions/${auctionInfo.hash}`} target="_blank" rel="noreferrer">
                <BsFileEarmarkText size={25}></BsFileEarmarkText>
                <span>정보</span>
              </a>
            </li>
            <li
              onClick={() => {
                navigate('/main');
              }}>
              <BsDoorOpen size={25}></BsDoorOpen>
              <span>나가기</span>
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
  height: 80px;
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
    gap: 5px;
    align-items: center;
    li {
      width: 50px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme.colors.white};
      gap: 5px;
      cursor: pointer;
    }
    li > a {
      width: 50px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme.colors.white};
      gap: 5px;
      cursor: pointer;
    }
  }
`;
export default StreamingHeader;
