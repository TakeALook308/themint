import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { timeState } from '../../atoms';
import { BsAlarm } from 'react-icons/bs';

function TimeBar(props) {
  const auctionTime = useRecoilValue(timeState);
  // console.log(auctionTime);
  return (
    <TimeBarBox>
      <BsAlarm size={20}></BsAlarm>
      <Progress value={auctionTime.toFixed(1)} max="30">
        {auctionTime.toFixed(1)}
      </Progress>
      <span>{auctionTime.toFixed(1)} 초</span>
      {/* <span>30.0초</span> */}
    </TimeBarBox>
  );
}
const TimeBarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;

  span {
    display: inline-block;
    width: 55px;
  }
`;
const Progress = styled.progress`
  appearance: none;
  flex-grow: 1;
  transition: 0.1s;
  &::-webkit-progress-bar {
    /* background-color: ${(props) => (props.value > 5 ? 'green' : ' red')}; */
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 5px;
  }
  &::-webkit-progress-value {
    background: ${(props) =>
      props.value > 10
        ? 'linear-gradient(90deg,rgba(44, 220, 178, 1) 0%, rgba(153, 232, 232, 1) 100%)'
        : 'linear-gradient(90deg, rgba(235,62,62,1) 0%, rgba(245,129,129,1) 100%)'};
    border-radius: 5px;
  }
`;
export default TimeBar;
