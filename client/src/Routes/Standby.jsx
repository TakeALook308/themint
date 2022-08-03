import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myInformationState } from '../atoms';
import UserVideoComponent from '../components/UserVideoComponent';
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsFillMicFill } from 'react-icons/bs';
import { RiBrushFill } from 'react-icons/ri';
import { IoExit } from 'react-icons/io5';
import { AiFillStar } from 'react-icons/ai';

const OPENVIDU_SERVER_URL = 'https://i7a308.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'themint';

function Standby() {
  const memberId = 'ney9083';
  const userInfo = useRecoilValue(myInformationState);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [video, setVideo] = useState(0);
  const [publisher, setPublisher] = useState('');

  const OV = new OpenVidu();
  const testSession = OV.initSession();

  const getToken = (curSessionId) => {
    console.log('===== 세션 연결 중 : ', curSessionId);
    return createSession(curSessionId).then((sessionId) => createToken(sessionId));
  };

  const standbyJoin = (standbySession, nickName) => {
    let standbySessionId = `${nickName}tests`;
    console.log('스탠바이 세션 입장 ', standbySessionId);
    getToken(standbySessionId).then((token) => {
      standbySession
        .connect(token, {
          // 추가로 넘겨주고 싶은 데이터
        })
        .then(() => {
          // 연결 후에 내 정보 담기
          let pub = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 60,
            insertMode: 'APPEND',
            mirror: false,
          });
          standbySession.publish(pub);
          setPublisher(pub);
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });
  };

  const leaveSession = () => {
    const mySession = testSession;

    if (mySession) {
      mySession.disconnect();
    }
  };

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  };
  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {};
      if (userInfo.memberId === memberId) data.role = 'MODERATOR';
      else data.role = 'SUBSCRIBER';
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const Speaking = (isSpeaking) => {
    setIsSpeaking(isSpeaking);
  };

  testSession.on('publisherStopSpeaking', (event) => {
    Speaking(false);
  });

  testSession.on('publisherStartSpeaking', (event) => {
    Speaking(true);
  });

  useEffect(() => {
    standbyJoin(testSession, userInfo.memberId);
  }, []);

  const videoControll = (num) => {
    setVideo(num);
    if (publisher.stream.videoActive === true) {
      publisher.publishVideo(false);
    } else {
      publisher.publishVideo(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <StarScreen>{publisher && <UserVideoComponent streamManager={publisher} />}</StarScreen>
        <SettingWrapper>
          <SettingBox>
            {video === 0 ? (
              <div>
                <div style={{ textAlign: 'center' }}>
                  <BsFillCameraVideoFill
                    style={{
                      cursor: 'pointer',
                      color: 'green',
                    }}
                    onClick={() => {
                      videoControll(1);
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: 'white',
                  }}>
                  비디오 중지
                </div>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center' }}>
                  <BsFillCameraVideoOffFill
                    style={{
                      cursor: 'pointer',
                      color: 'white',
                    }}
                    onClick={() => {
                      videoControll(0);
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: 'white',
                  }}>
                  비디오 시작
                </div>
              </div>
            )}
            <SettingIcons>
              {isSpeaking ? (
                <div>
                  <div style={{ textAlign: 'center' }}>
                    <BsFillMicFill style={{ color: 'green' }} />
                  </div>
                  <div
                    style={{
                      fontSize: '20px',
                      color: 'white',
                    }}>
                    음성 인식중
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    <BsFillMicFill />
                  </div>
                  <div
                    style={{
                      fontSize: '20px',
                      color: 'white',
                    }}>
                    마이크 체크
                  </div>
                </div>
              )}
            </SettingIcons>
            <SettingIcons>
              <div
                style={{
                  textAlign: 'center',
                  color: 'white',
                }}>
                <IoExit />
              </div>
              <div
                style={{
                  fontSize: '20px',
                  color: 'white',
                }}>
                미팅룸 입장
              </div>
            </SettingIcons>
          </SettingBox>
        </SettingWrapper>
      </Wrapper>
    </Container>
  );
}

export default Standby;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 1px;
  min-height: calc(100vh - 259px);
`;

const Wrapper = styled.div`
  margin-top: 68px;
`;

const StarScreen = styled.div`
  position: relative;
  border-radius: 50px;
  overflow: hidden;
`;

const SettingIcons = styled.div`
  margin-left: 5vw;
  cursor: pointer;
`;

const SettingWrapper = styled.div`
  position: relative;
  top: 15%;
  left: 34vw;
  width: 30vw;
  height: 7vh;
`;
const SettingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.8vh;
  color: black;
  font-size: 2vw;
`;
