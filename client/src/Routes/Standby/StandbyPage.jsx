import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myInformationState } from '../../atoms';
import UserVideoComponent from '../../components/webRTC/UserVideoComponent';
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsFillMicFill } from 'react-icons/bs';
import { IoExit } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../utils/apis/api';
import { errorToast, successToast } from '../../lib/toast';
import { auctionApis } from '../../utils/apis/auctionApis';
import { categories } from '../../utils/constants/constant';

const OPENVIDU_SERVER_URL = 'https://i7a308.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'themint';

function StandbyPage() {
  const [standByInfo, setStanByInfo] = useState('');
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const userInfo = useRecoilValue(myInformationState);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [video, setVideo] = useState(0); // 1 ON, 0 OFF
  const [publisher, setPublisher] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  useEffect(() => {
    fetchData.get(auctionApis.AUCTION_DETAIL_API(auctionId)).then((res) => setStanByInfo(res.data));
  }, []);

  const OV = new OpenVidu();
  OV.enableProdMode();
  const testSession = OV.initSession();

  const getToken = async (curSessionId) => {
    console.log('===== 세션 연결 중 : ', curSessionId);
    return await createSession(curSessionId).then((sessionId) => createToken(sessionId));
  };

  const standbyJoin = (standbySession, auctionId) => {
    // let standbySessionId = `${auctionId}tests`;
    let standbySessionId = `${auctionId}tests`;
    console.log('스탠바이 세션 입장 ', standbySessionId);
    getToken(standbySessionId).then((token) => {
      standbySession
        .connect(token, {})
        .then(() => {
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
          console.log('video active', pub.stream.videoActive);
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
      if (userInfo.memberSeq === standByInfo.memberSeq) data.role = 'MODERATOR';
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          // console.log('TOKEN', response);
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
    if (standByInfo.memberSeq) {
      standbyJoin(testSession, auctionId);
    }
    if (standByInfo.memberSeq === userInfo.memberSeq) {
      successToast(
        <div>
          <strong>경매 입장 준비장입니다.</strong> <br />
          <br />
          경매장에 입장하기 전 카메라와 마이크 등 테스트를 마친 후 입장해주세요.
        </div>,
        'light',
        3000,
      );
    }
    return () => leaveSession();
  }, [standByInfo]);

  useEffect(() => {
    if (publisher?.stream?.videoActive) {
      setVideo(1);
    }
  }, [publisher]);

  const videoControll = (num) => {
    setVideo(num);
    publisher.publishVideo(!publisher.stream.videoActive);
  };
  useEffect(() => {
    if (publisher?.publishAudio) {
      publisher.publishAudio(audioEnabled);
    }
  }, [audioEnabled]);

  const movoToStreaming = () => {
    leaveSession();
    navigate(`/streamings/${auctionId}`);
  };

  if (standByInfo?.memberSeq && userInfo.memberSeq !== standByInfo?.memberSeq) {
    navigate(-1);
    errorToast('⚠️접근 권한이 없습니다.', 3000);
    return;
  }

  return (
    <Container>
      <Header>
        <p>{categories[standByInfo?.categorySeq - 1]?.name}</p>
        <h2>{standByInfo.title}</h2>
      </Header>
      <AuctionCreatorVideoContainer>
        <VideoWrapper>{publisher && <UserVideoComponent streamManager={publisher} />}</VideoWrapper>
      </AuctionCreatorVideoContainer>
      <SettingWrapper>
        <SettingBox>
          {video === 1 ? (
            <div>
              <IconWrapper
                as="button"
                color={'mainMint'}
                onClick={() => {
                  videoControll(0);
                }}>
                <BsFillCameraVideoFill />
              </IconWrapper>
              <ContentText>비디오 중지</ContentText>
            </div>
          ) : (
            <div>
              <IconWrapper
                as="button"
                onClick={() => {
                  videoControll(1);
                }}>
                <BsFillCameraVideoOffFill />
              </IconWrapper>
              <ContentText>비디오 시작</ContentText>
            </div>
          )}
          <SettingIcons>
            {!audioEnabled ? (
              <div>
                <IconWrapper
                  color={'pointRed'}
                  as="button"
                  onClick={() => {
                    setAudioEnabled(true);
                  }}>
                  <BsFillMicFill />
                </IconWrapper>
                <ContentText>음성 켜기</ContentText>
              </div>
            ) : isSpeaking ? (
              <div>
                <IconWrapper
                  color={'mainMint'}
                  as="button"
                  onClick={() => {
                    setAudioEnabled(false);
                  }}>
                  <BsFillMicFill />
                </IconWrapper>
                <ContentText>음성 인식중</ContentText>
              </div>
            ) : (
              <div>
                <IconWrapper
                  as="button"
                  onClick={() => {
                    setAudioEnabled(false);
                  }}>
                  <BsFillMicFill />
                </IconWrapper>
                <ContentText>마이크 체크</ContentText>
              </div>
            )}
          </SettingIcons>
          <SettingIcons>
            <IconWrapper exit={true} as="button" onClick={movoToStreaming}>
              <IoExit />
            </IconWrapper>
            <ContentText>경매장 입장</ContentText>
          </SettingIcons>
        </SettingBox>
      </SettingWrapper>
    </Container>
  );
}

export default StandbyPage;

const Container = styled.main`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 80px;
  min-height: calc(100vh - 259px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  min-height: 10%;
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: ${(props) => props.theme.colors.subBlack};
  margin-bottom: 1rem;
  padding: 0.125rem 1rem;
  border-radius: 10px;
  line-height: 1.5;
  > p {
    color: ${(props) => props.theme.colors.textGray};
  }
  > h2 {
    font-size: ${(props) => props.theme.fontSizes.h4};
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.subBlack};
  top: 0;
  left: 0;
`;

const AuctionCreatorVideoContainer = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  width: 80%;
  padding-top: 60%;
  height: 0;
  margin: 0 auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SettingIcons = styled.div`
  cursor: pointer;
  background-color: transparent;
  outline: none;
  width: 100px;
  margin: 0 auto;
  text-align: center;
`;

const SettingWrapper = styled.div`
  position: relative;
  padding: 2rem;
`;
const SettingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 2vw;
  gap: 2.5rem;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.exit && props.theme.colors.pointRed};
    transition: all 200ms ease-in;
  }
`;

const ContentText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.p};
  color: ${(props) => props.theme.colors.white};
`;
