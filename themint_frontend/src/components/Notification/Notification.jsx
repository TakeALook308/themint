import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { notificationState } from '../../atoms';
import NotificationButton from './NotificationButton';
import NotificationList from './NotificationList';

function Notification(props) {
  const notificationEnabled = useRecoilValue(notificationState);
  return (
    <NotiContainer>
      <NotificationButton />
      {notificationEnabled && <NotificationList />}
    </NotiContainer>
  );
}

export default Notification;

const NotiContainer = styled.div`
  position: relative;
`;
