import React from 'react';
import styled from 'styled-components';
import StreamingComponent from '../components/webRTC/StreamingComponent';
import StreamingHeader from '../components/Streaming/StreamingHeader';
import StreamChat from '../components/Streaming/StreamChat';
import AuctionBidding from '../components/Streaming/AuctionBidding';
import AuctionList from '../components/Streaming/AuctionList';
function Streaming(props) {
  return (
    <Stream>
      <Header>
        <StreamingHeader />
      </Header>
      <Main>
        <Section>
          <AuctionList />
          <StreamingComponent />
        </Section>
        <Aside>
          <AuctionBidding />
          <StreamChat />
        </Aside>
      </Main>
    </Stream>
  );
}

// const Stream = styled.div`
//   width: 100%;
//   display: grid;
//   grid-template-rows: 80px 1fr;
// `;

// const Main = styled.main``;

// const Header = styled.header``;
// const Section = styled.section``;

// const Aside = styled.aside``;

const Stream = styled.div`
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
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 10px 5px 10px 0;
  gap: 10px;
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 10px 0 10px 5px;
  gap: 10px;
`;

export default Streaming;
