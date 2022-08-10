import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StreamingComponent from '../../components/webRTC/StreamingComponent';
import StreamingHeader from './StreamingHeader';
import StreamChat from './StreamChat';
import AuctionBidding from './AuctionBidding';
import AuctionList from './AuctionList';
import { useRecoilValue } from 'recoil';
import { myInformationState } from '../../atoms';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function StreamingPage(props) {
  var sock = new SockJS('https://i7a308.p.ssafy.io/api/ws-stomp');
  let client = Stomp.over(sock);
  let nickname = '민서';
  let roomId = 'test';
  const [chat, setChat] = useState([]);
  const [price, setPrice] = useState([]);

  //처음 접속했을 때
  useEffect(() => {
    client.connect({}, () => {
      console.log('Connected : ' + roomId);
      //연결 후 데이터 가져오기
      client.subscribe('/sub/chat/room/' + roomId, function (message) {
        const messagedto = JSON.parse(message.body);
        if (Object.keys(messagedto).includes('price')) setPrice((prev) => [...prev, messagedto]);
        else setChat((prev) => [...prev, messagedto]);
      });

      //방 접속 알림 모두에게 쏴주기
      client.send(
        '/pub/chat/message',
        {},
        JSON.stringify({ type: 0, roomId: roomId, nickname: nickname, memberSeq: 1 }),
      );
    });
    //종료
    return () => client.disconnect();
  }, []);

  const sendMessage = (msg) => {
    client.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: 1,
        roomId: roomId,
        nickname: nickname,
        message: msg,
        memberSeq: 1,
      }),
    );
  };

  const sendPrice = (msg) => {
    client.send(
      '/pub/product/message',
      {},
      JSON.stringify({
        roomId: roomId,
        nickname: nickname,
        productSeq: 1,
        price: msg,
        memberSeq: 1,
      }),
    );
  };

  const [nowProduct, setNowProduct] = useState(0);
  const [products, setProducts] = useState([
    {
      productName: '닌텐도 스위치',
      startPrice: 180000,
      status: 0,
    },
    {
      productName: '아이패드',
      startPrice: 520000,
      status: 0,
    },
  ]);

  console.log(chat);

  const userInfo = useRecoilValue(myInformationState);
  const auctionData = { memberId: 'themint' };

  return (
    <Stream>
      <Header>
        <StreamingHeader />
      </Header>
      <Main>
        <Section>
          <AuctionList products={products} />

          <StreamingComponent userInfo={userInfo} auctionData={auctionData} />
        </Section>
        <Aside>
          <AuctionBidding product={products[nowProduct]} sendPrice={sendPrice} price={price} />
          <StreamChat sendMessage={sendMessage} chat={chat} />
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

export default StreamingPage;
