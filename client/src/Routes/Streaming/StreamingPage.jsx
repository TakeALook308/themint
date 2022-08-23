import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StreamingComponent from '../../components/webRTC/StreamingComponent';
import StreamingHeader from './StreamingHeader';
import StreamChat from './StreamChat';
import AuctionBidding from './AuctionBidding';
import AuctionList from './AuctionList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { deviceListState, myInformationState, timeState } from '../../atoms';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/apis/api';
import { auctionApis } from '../../utils/apis/auctionApis';
import moment from 'moment';
import TimeBar from './TimeBar';
let sock;
let client;
function StreamingPage(props) {
  const userInfo = useRecoilValue(myInformationState);
  const { auctionId } = useParams();
  const [auctionInfo, setAuctionInfo] = useState({});
  const [auctionData, setAuctionData] = useState({});
  const [nextProduct, setNextProduct] = useState(-1);
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
    fetchData.get(auctionApis.AUCTION_DETAIL_API(auctionId)).then((res) => {
      setAuctionInfo(res.data);
      setAuctionData({ memberSeq: res.data.memberSeq });
      setProducts(res.data.productList);
    });
    // console.log('잘 실행되나요?');
  }, [nextProduct]);

  // console.log(nextProduct);
  // console.log(products);
  let nickname = userInfo.nickname;
  let memberSeq = userInfo.memberSeq;
  let roomId = auctionId;
  const [chat, setChat] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [newTime, setNewTime] = useState(moment());
  // const []
  const setAuctionTime = useSetRecoilState(timeState);

  //처음 접속했을 때
  useEffect(() => {
    sock = new SockJS('https://i7a308.p.ssafy.io/api/ws-stomp');
    client = Stomp.over(sock);
    client.debug = null;
    // fetchData.post(chatApis.AUCTION_CHAT_IN_API, { roomId: roomId, memberSeq: memberSeq });
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
    return () => {
      setAuctionTime(0);
      // fetchData.post(chatApis.AUCTION_CHAT_OUT_API, { roomId: roomId, memberSeq: memberSeq });
      client.disconnect();
    };
  }, []);
  // console.log('부탁드립니다');
  const sendMessage = (msg) => {
    client.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: 1,
        roomId: roomId,
        nickname: nickname,
        message: msg,
        memberSeq: memberSeq,
      }),
    );
  };
  const sendPrice = (msg, index, productSeq) => {
    client.send(
      '/pub/product/message',
      {},
      JSON.stringify({
        roomId: roomId,
        nickname: nickname,
        productSeq: productSeq,
        price: msg,
        memberSeq: memberSeq,
        index: index,
      }),
    );
    setNewTime(moment());
  };
  return (
    <Stream>
      <Ratio>
        <Main>
          <Section>
            <StreamingHeader auctionInfo={auctionInfo} />
            <AuctionList products={products} auctionId={auctionId} />
            <TimeBar />
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
              producter={userInfo.memberSeq === auctionInfo.memberSeq ? true : false}
              setNextProduct={setNextProduct}
              auctionsHash={auctionId}
            />
            <StreamChat sendMessage={sendMessage} chat={chat} userInfo={userInfo} />
          </Aside>
        </Main>
      </Ratio>
    </Stream>
  );
}

const Stream = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 40px);
  overflow: hidden;
  @media screen and (max-width: 768px) {
    position: relative;
    overflow: visible;
    height: 100%;
  }
`;

const Ratio = styled.div`
  padding-top: 56.25%;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    padding-top: 0;
  }
`;
const Main = styled.main`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    position: relative;
  }
`;

// const Header = styled.header`
//   display: flex;
//   width: 100%;
//   height: 80px;
// `;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 5px 10px 0;
  /* margin: 10px 5px 10px 0; */
  gap: 10px;
  flex-grow: 3;
  flex-basis: 0;
  #StreamingHeader {
    height: 250px;
  }
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  padding: 10px 0 10px 5px;
  gap: 10px;
  flex-basis: 0;
`;

export default StreamingPage;
