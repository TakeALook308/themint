import React from 'react';
import styled from 'styled-components';
import StreamingComponent from '../components/webRTC/StreamingComponent';
import StreamingHeader from '../components/Streaming/StreamingHeader';
import AuctionList from '../components/Streaming/AuctionList';
import StreamChat from '../components/Streaming/StreamChat';
import AuctionBidding from '../components/Streaming/AuctionBidding';
import AuctionInfo from '../components/Streaming/AuctionInfo';
function Streaming(props) {
  return (
    <First>
      <Main>
        <Left>
          <AuctionList />
        </Left>
        <Middle>
          <AuctionInfo />
          <StreamingComponent />
        </Middle>
        <Right>
          <AuctionBidding />
          <StreamChat />
        </Right>
      </Main>
      <Header>
        <StreamingHeader />
      </Header>
    </First>
  );
}

const First = styled.div`
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  width: 100%;
  /* width: 100vw; */
  height: calc(100vh - 80px);
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: red;
`;
const Left = styled.div`
  width: 25%;
  margin: 10px 5px 10px 10px;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 10px 5px 10px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 10px 10px 10px 5px;
`;

export default Streaming;
