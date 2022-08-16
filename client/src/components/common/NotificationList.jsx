import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myInformationState, notificationListFamilyState } from '../../atoms';

function NotificationList({ setShow }) {
  const myInformation = useRecoilValue(myInformationState);
  const [notificationList, setNotificationList] = useRecoilState(
    notificationListFamilyState(myInformation.memberId),
  );
  const deleteNotification = (idx) => {
    const list = notificationList.filter((notification, i) => idx !== i);
    localStorage.setItem(`notificationList/${myInformation.memberId}`, JSON.stringify(list));
    setNotificationList(list);
  };

  return (
    <Modal
      onClick={(e) => {
        e.stopPropagation();
      }}>
      {!notificationList?.length && <NotList>알림이 없습니다.</NotList>}
      {notificationList?.map((notification, i) => (
        <NotificationCard key={i}>
          <NotificationButton to={`${notification.url}`} onClick={() => setShow(false)}>
            <p>{notification.title} 🔔</p>
            <p>{notification.notification}</p>
          </NotificationButton>
          <DeleteButton onClick={() => deleteNotification(i)}>
            <MdClose />
          </DeleteButton>
        </NotificationCard>
      ))}
    </Modal>
  );
}

export default NotificationList;

const shake = keyframes`
  0%{
    transform: rotate(0deg);
  }
  10%{
    transform: rotate(45deg);
  }
  20%{
    transform: rotate(-45deg);
  }
  30%{
    transform: rotate(30deg);
  }
  40%{
    transform: rotate(-30deg);
  }
  50%{
    transform: rotate(10deg);
  }
  60%{
    transform: rotate(-10deg);
  }
  70%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(0deg);
  }
`;

const NotList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 250px;
  height: 275px;
  background-color: red;
  position: absolute;
  padding: 0.5rem;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.subBlack};
  right: 0;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NotificationCard = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointGray};
  border-radius: 5px;
  height: 50px;
  padding: 0.5rem;
  display: flex;
  button {
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.colors.white};
    font-size: 20px;
    width: 20%;
    cursor: pointer;
  }
`;

const NotificationButton = styled(Link)`
  text-align: left;
  width: 80%;
  > p {
    &:first-child {
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    &:last-child {
      font-size: ${(props) => props.theme.fontSizes.small};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const DeleteButton = styled.button`
  &:hover {
    animation: ${shake} 1s infinite;
  }
`;
