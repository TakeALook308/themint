import React, { useEffect, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import { GoPrimitiveDot } from 'react-icons/go';
import { useRecoilState, useRecoilValue } from 'recoil';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';
import {
  loggedinState,
  myInformationState,
  notificationListFamilyState,
  notificationState,
} from '../../atoms';
import usePushNotification from '../../utils/hooks/usePushNotification';
let sock;
let client;

function NotificationButton() {
  const [hasNewNotice, SetHasNewNotice] = useState(false);
  const isLoggedin = useRecoilValue(loggedinState);
  const myInformation = useRecoilValue(myInformationState);
  const [notificationList, setNotificationList] = useRecoilState(
    notificationListFamilyState(myInformation.memberId),
  );
  const [notificationEnabled, setNotificationEnabled] = useRecoilState(notificationState);
  const { fireNotification } = usePushNotification();
  useEffect(() => {
    if (isLoggedin && myInformation?.memberId) {
      sock = new SockJS('https://i7a308.p.ssafy.io/api/ws-stomp');
      client = Stomp.over(sock);
      client.debug = null;
      client.connect({}, () => {
        client.subscribe(
          `/sub/notice/${myInformation.memberId}`,
          function (message) {
            const messagedto = JSON.parse(message.body);
            setNotificationList((prev) => [messagedto, ...prev]);
            localStorage.setItem(
              `notificationList/${myInformation.memberId}`,
              JSON.stringify([messagedto, ...notificationList]),
            );
            if (messagedto.type === 1) {
              fireNotification('더민트', {
                body: `${messagedto.title}: ${messagedto.notification}`,
              });
            }
            if (messagedto.type === 2) {
              fireNotification('더민트', {
                body: `${messagedto.senderNickname} 메시지: ${messagedto.previewMsg}`,
              });
            }

            SetHasNewNotice(true);
          },
          (err) => {},
        );
      });
    }
    return () => {
      client?.disconnect();
    };
  }, []);

  const onClick = (e) => {
    e.stopPropagation();
    setNotificationEnabled(!notificationEnabled);
    SetHasNewNotice(false);
  };

  return (
    <Button onClick={onClick}>
      <HiOutlineBell size={25} />
      {hasNewNotice && <Dot />}
    </Button>
  );
}

export default NotificationButton;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  position: relative;
`;

const Dot = styled(GoPrimitiveDot)`
  position: absolute;
  bottom: 1px;
  right: 1px;
  color: ${(props) => props.theme.colors.pointRed};
  font-size: 20px;
`;
