import React from 'react';
import { useRecoilValue } from 'recoil';
import { timeState } from '../../atoms';

function TimeBar(props) {
  const auctionTime = useRecoilValue(timeState);
  console.log(auctionTime);
  return <div>{auctionTime.toFixed(1)}</div>;
}

export default TimeBar;
