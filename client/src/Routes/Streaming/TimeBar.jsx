import React from 'react';
import { useRecoilValue } from 'recoil';
import { timeState } from '../../atoms';

function TimeBar(props) {
  const auctionTime = useRecoilValue(timeState);
  return <div>{auctionTime}</div>;
}

export default TimeBar;
