import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { instance } from '../../utils/apis/api';

function InterestAuctionList() {
  const [showAuctionList, setShowAuctionList] = useState([]);
  useEffect(() => {
    const getCateList = async (url) => {
      const response = await instance.get(url);
      return response;
    };
    const res = getCateList(`/api/interest/auction`);
    res.then((auctionlist) => {
      setShowAuctionList(auctionlist);
    });
  }, []);

  console.log(showAuctionList);
  return <Container>관심경매!</Container>;
}
export default InterestAuctionList;

const Container = styled.div`
  width: 100%;
`;
