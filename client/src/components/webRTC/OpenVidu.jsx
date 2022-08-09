import axios from 'axios';
import React, { useState } from 'react';

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const channelId = 123;
const userInfo = {
  nickname: '미뇽',
};

function OpenVidu(props) {
  const [OV, setOV] = useState();
  const [session, setSession] = useState();
  const [initUserData, setInitUserData] = useState({
    mySessionId: channelId,
    myUserName: userInfo.nickname,
  });
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  const joinSession = () => {
    // 1. openvidu 객체 생성
    const newOV = new OpenVidu();
    // socket 통신 과정에서 많은 log를 남기게 되는데 필요하지 않은 log를 띄우지 않게 하는 모드
    newOV.enableProdMode();
    // 2. initSesison 생성
    const newSession = newOV.initSession();

    // 1. connection 메소드 내부에 이벤트 수신 처리
    // 1-1 session에 참여한 사용자 추가
    newSession.on('streamCreated', (event) => {
      const newSubscriber = newSession.subscribe(
        event.stream,
        JSON.parse(event.stream.connection.data).clientData,
      );

      const newSubscribers = subscribers;
      newSubscribers.push(newSubscriber);

      setSubscribers([...newSubscribers]);
    });
    // 1-2 session에서 disconnect한 사용자 삭제
    newSession.on('streamDestroyed', (event) => {
      if (event.stream.typeOfVideo === 'CUSTOM') {
        deleteSubscriber(event.stream.streamManager);
      } else {
        setDestroyedStream(event.stream.streamManager);
        setCheckMyScreen(true);
      }
    });
    // 1-3 예외처리
    newSession.on('exception', (exception) => {
      console.warn(exception);
    });

    // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
    setOV(newOV);
    setSession(newSession);

    // 4. session에 connect하는 과정
    const connection = () => {
      // 4-a token 생성
      getToken(initUserData.mySessionId).then((token) => {
        newSession
          .connect(token, { clientData: initUserData.myUserName })
          .then(async () => {
            // 4-b user media 객체 생성
            newOV
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: '1280x720',
                frameRate: 10,
              })
              .then((mediaStream) => {
                var videoTrack = mediaStream.getVideoTracks()[0];

                var newPublisher = newOV.initPublisher(initUserData.myUserName, {
                  audioSource: undefined,
                  videoSource: videoTrack,
                  publishAudio: isAudioOn,
                  publishVideo: isVideoOn,
                  // resolution: '1280x720',
                  // frameRate: 10,
                  insertMode: 'APPEND',
                  mirror: true,
                });
                // 4-c publish
                newPublisher.once('accessAllowed', () => {
                  newSession.publish(newPublisher);
                  setPublisher(newPublisher);
                });
              });
          })
          .catch((error) => {
            console.warn(
              'There was an error connecting to the session:',
              error.code,
              error.message,
            );
          });
      });
    };
    connection();
  };

  const deleteSubscriber = (streamManager) => {
    const prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };

  const getToken = async (sessionId) => {
    return createSession(sessionId).then((sessionId) => createToken(sessionId));
  };

  return <div></div>;
}

export default OpenVidu;

export const createSession = (sessionId) => {
  const data = JSON.stringify({ customSessionId: sessionId });
  return new Promise(async (resolve, reject) => {
    await axios
      .post(`/openvidu/api/sessions`, data)
      .then((response) => {
        resolve(response.data.id);
      })
      .catch((response) => {
        const err = Object.assign({}, response);
        if (err?.response?.status === 409) {
          resolve(sessionId);
        } else {
          console.warn(
            'No connection to OpenVidu Server. This may be a certificate error at ' +
              process.env.REACT_APP_OPENVIDU_SERVER_URL,
          );
          if (
            window.confirm(
              'No connection to OpenVidu Server. This may be a certificate error at "' +
                process.env.REACT_APP_OPENVIDU_SERVER_URL +
                '"\\n\\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                process.env.REACT_APP_OPENVIDU_SERVER_URL +
                '"',
            )
          ) {
            window.location.assign(
              process.env.REACT_APP_OPENVIDU_SERVER_URL + '/accept-certificate',
            );
          }
        }
      });
  });
};

export const createToken = (sessionId) => {
  const data = {};
  return new Promise(async (resolve, reject) => {
    await axios
      .post(`/openvidu/api/sessions/${sessionId}/connection`, data)
      .then((response) => {
        resolve(response.data.token);
      })
      .catch((error) => reject(error));
  });
};
