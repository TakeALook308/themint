import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { myInformationState, deviceListState } from '../../atoms';
import UserVideoComponent from '../../components/webRTC/UserVideoComponent';
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from 'react-icons/bs';
import { IoExit } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../utils/apis/api';
import { errorToast, successToast } from '../../lib/toast';
import { auctionApis } from '../../utils/apis/auctionApis';
import { categories } from '../../utils/constants/constant';
import { socketApis } from '../../utils/apis/socketApis';
import { Helmet } from 'react-helmet-async';
import UserVideo from '../../components/webRTC/UserVideo';

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
  const [videoDeviceList, setVideoDeviceList] = useState([]);
  const [microPhoneDeviceList, setMicroPhoneDeviceList] = useState([]);
  const [OV, setOV] = useState('');
  const [session, setSession] = useState('');
  const [streamingDeviceList, setStreamingDeviceList] = useRecoilState(deviceListState);
  useEffect(() => {
    fetchData.get(auctionApis.AUCTION_DETAIL_API(auctionId)).then((res) => setStanByInfo(res.data));
  }, []);

  const getToken = async (curSessionId) => {
    console.log('===== 세션 연결 중 : ', curSessionId);
    return await createSession(curSessionId).then((sessionId) => createToken(sessionId));
  };

  const standbyJoin = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();
    setOV(newOV);
    setSession(newSession);
    const standbySessionId = `${auctionId}tests`;
    console.log('스탠바이 세션 입장 ', standbySessionId);
    getToken(standbySessionId).then((token) => {
      newSession
        .connect(token, { clientData: auctionId })
        .then(async () => {
          const devices = await newOV.getDevices();
          const videoDevices = devices.filter((device) => device.kind === 'videoinput');
          const microPhoneDevices = devices.filter((device) => device.kind === 'audioinput');
          setVideoDeviceList(videoDevices);
          setMicroPhoneDeviceList(microPhoneDevices);
          setStreamingDeviceList((prev) => ({
            videoId: videoDevices[0].deviceId,
            microPhoneId: microPhoneDevices[1].deviceId,
          }));
          let pub = newOV.initPublisher(undefined, {
            audioSource: microPhoneDevices[1].deviceId,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 60,
            insertMode: 'APPEND',
            mirror: true,
          });
          console.log('video active', pub.stream.videoActive);
          newSession.publish(pub);
          setPublisher(pub);
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
  };

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESSION', response);
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
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const Speaking = (isSpeaking) => {
    setIsSpeaking(isSpeaking);
  };

  if (session) {
    session?.on('publisherStopSpeaking', (event) => {
      Speaking(false);
    });

    session?.on('publisherStartSpeaking', (event) => {
      Speaking(true);
    });
  }

  const createChatRoom = async () => {
    const body = {
      roomId: auctionId,
      type: 0,
    };
    try {
      const response = await fetchData.post(socketApis.ROOM_CREATION, body);
      if (response.status === 200) {
        console.log('==========채팅방 생성=============');
      }
    } catch (err) {
      if (err.response.status === 409) {
        errorToast('채팅방 생성에 실패하였습니다.');
      }
    }
  };

  useEffect(() => {
    return () => {
      leaveSession();
    };
  }, [session]);
  useEffect(() => {
    if (standByInfo.memberSeq) {
      standbyJoin();
    }
    if (standByInfo.memberSeq === userInfo.memberSeq) {
      successToast(
        <div>
          <strong>
            <h1>경매 입장 준비장입니다.</h1>
          </strong>
          <br />
          경매장에 입장하기 전 카메라와 마이크 등 테스트를 마친 후 입장해주세요.
        </div>,
        'light',
        3000,
      );
    }

    (async () => await createChatRoom())();
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

  const startAuction = async () => {
    try {
      const response = await fetchData.post(socketApis.AUCTION_START, { hash: auctionId });
    } catch (err) {
      return console.log(err);
    }
  };
  const movoToStreaming = async () => {
    await startAuction();
    leaveSession();
    navigate(`/streamings/${auctionId}`);
  };

  if (standByInfo?.memberSeq && userInfo.memberSeq !== standByInfo?.memberSeq) {
    navigate(-1);
    errorToast('⚠️접근 권한이 없습니다.', 'colored', 3000);
    return;
  }

  const switchCamera = async ({ target: { value } }) => {
    const newPublisher = OV.initPublisher(undefined, {
      ...publisher,
      videoSource: value,
    });
    try {
      await session.unpublish(publisher);
      await session.publish(newPublisher);
      setPublisher(newPublisher);
      setStreamingDeviceList((prev) => ({ ...prev, videoId: value }));
    } catch (e) {
      console.log(e);
    }
  };

  const switchMicroPhone = async ({ target: { value } }) => {
    const newPublisher = OV.initPublisher(undefined, {
      ...publisher,
      audioSource: value,
    });
    try {
      await session.unpublish(publisher);
      await session.publish(newPublisher);
      setPublisher(newPublisher);
      setStreamingDeviceList((prev) => ({ ...prev, microPhoneId: value }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Helmet>경매 준비 | 더민트</Helmet>
      <Container>
        <Header>
          <p>{categories[standByInfo?.categorySeq - 1]?.name}</p>
          <h2>{standByInfo.title}</h2>
        </Header>
        <AuctionCreatorVideoContainer>
          <VideoWrapper>{publisher && <UserVideo streamManager={publisher} />}</VideoWrapper>
        </AuctionCreatorVideoContainer>
        <SettingWrapper>
          <SettingBox>
            <SelectContainer>
              <ControlContainer>
                {videoDeviceList.length && (
                  <Select onChange={switchCamera} value={streamingDeviceList?.videoId}>
                    {videoDeviceList.map((device) => (
                      <option value={device.deviceId} key={device.deviceId}>
                        {device.label}
                      </option>
                    ))}
                  </Select>
                )}

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
                  </div>
                ) : (
                  <div>
                    <IconWrapper
                      color={'pointRed'}
                      as="button"
                      onClick={() => {
                        videoControll(1);
                      }}>
                      <BsFillCameraVideoOffFill />
                    </IconWrapper>
                  </div>
                )}
              </ControlContainer>
              <ControlContainer>
                {microPhoneDeviceList.length && (
                  <Select onChange={switchMicroPhone} value={streamingDeviceList.microPhoneId}>
                    {microPhoneDeviceList.map((device) => (
                      <option value={device.deviceId} key={device.deviceId}>
                        {device.label}
                      </option>
                    ))}
                  </Select>
                )}
                {!audioEnabled ? (
                  <div>
                    <IconWrapper
                      color={'pointRed'}
                      as="button"
                      onClick={() => {
                        setAudioEnabled(true);
                      }}>
                      <BsFillMicMuteFill />
                    </IconWrapper>
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
                  </div>
                )}
              </ControlContainer>
            </SelectContainer>
            <SettingIcons>
              <IconWrapper active={true} exit={true} as="button" onClick={movoToStreaming}>
                <IoExit />
              </IconWrapper>
              <ContentText>경매장 입장</ContentText>
            </SettingIcons>
          </SettingBox>
        </SettingWrapper>
      </Container>
    </>
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
  padding: 0.25rem 1rem;
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
  text-align: center;
`;

const SettingWrapper = styled.div`
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
`;

const SettingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 2vw;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: ${(props) => (props.active ? '4rem' : '2rem')};
  height: ${(props) => (props.active ? '4rem' : '2rem')};
  background-color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
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
  margin-top: 1rem;
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
  gap: 1rem;
  align-items: center;
`;

const Select = styled.select`
  background-color: ${(props) => props.theme.colors.subBlack};
  border: none;
  color: ${(props) => props.theme.colors.white};
  width: 250px;
  padding: 1rem;
  height: 50px;
  border-radius: 5px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
