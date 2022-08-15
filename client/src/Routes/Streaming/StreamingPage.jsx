import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StreamingComponent from '../../components/webRTC/StreamingComponent';
import StreamingHeader from './StreamingHeader';
import StreamChat from './StreamChat';
import AuctionBidding from './AuctionBidding';
import AuctionList from './AuctionList';
import { useRecoilValue } from 'recoil';
import { deviceListState, myInformationState } from '../../atoms';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate, useParams } from 'react-router-dom';
import { getData } from '../../utils/apis/api';
import { auctionApis } from '../../utils/apis/auctionApis';
import moment from 'moment';
let sock;
let client;
function StreamingPage(props) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(myInformationState);
  const { auctionId } = useParams();
  const [auctionInfo, setAuctionInfo] = useState({});
  const [auctionData, setAuctionData] = useState({});
  const deviceList = useRecoilValue(deviceListState);
  // const [products, setProducts] = useState([]);
  const [products, setProducts] = useState([
    {
      productName: 'error',
      startPrice: -1,
      status: -1,
    },
  ]);
  useEffect(() => {
    getData(auctionApis.AUCTION_DETAIL_API(auctionId)).then((res) => {
      setAuctionInfo(res.data);
      setAuctionData({ memberSeq: res.data.memberSeq });
      setProducts(res.data.productList);
    });
  }, []);

  let nickname = userInfo.nickname;
  let memberSeq = userInfo.memberSeq;
  let roomId = auctionId; //저장하는 api 룸 만들고 보내줘도 돼?
  const [chat, setChat] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [newTime, setNewTime] = useState(moment());

  //처음 접속했을 때
  useEffect(() => {
    sock = new SockJS('https://i7a308.p.ssafy.io/api/ws-stomp');
    client = Stomp.over(sock);
    client.connect({}, () => {
      console.log('Connected : ' + roomId);
      //연결 후 데이터 가져오기
      client.subscribe(
        '/sub/chat/room/' + roomId,
        function (message) {
          const messagedto = JSON.parse(message.body);
          if (Object.keys(messagedto).includes('price')) {
            if (messagedto.price === -1) setPriceList([messagedto]);
            else setPriceList((prev) => [...prev, messagedto]);
          } else setChat((prev) => [...prev, messagedto]);
        },
        (err) => {},
      );

      //방 접속 알림 모두에게 쏴주기
      client.send(
        '/pub/chat/message',
        {},
        JSON.stringify({ type: 0, roomId: roomId, nickname: nickname, memberSeq: memberSeq }),
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
  const sendPrice = (msg, index) => {
    client.send(
      '/pub/product/message',
      {},
      JSON.stringify({
        roomId: roomId,
        nickname: nickname,
        productSeq: 1,
        price: msg,
        memberSeq: 1,
        index: index,
      }),
    );
    setNewTime(moment());
  };

  return (
    <Stream>
      <Header>
        <StreamingHeader auctionInfo={auctionInfo} />
        <button
          onClick={() => {
            navigate('/main');
          }}></button>
      </Header>
      <Main>
        <Section>
          <AuctionList products={products} />
          <StreamingComponent
            userInfo={userInfo}
            auctionData={auctionData}
            auctionId={auctionId}
            deviceList={deviceList}
          />
        </Section>
        <Aside>
          <AuctionBidding
            products={products}
            sendPrice={sendPrice}
            price={priceList}
            newTime={newTime}
            producter={userInfo.memberSeq == auctionInfo.memberSeq ? true : false}
          />

          <StreamChat sendMessage={sendMessage} chat={chat} userInfo={userInfo} />
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
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
