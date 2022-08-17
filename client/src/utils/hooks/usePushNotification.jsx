import { useRef } from 'react';

const usePushNotification = () => {
  const notificationRef = useRef(null);
  if (!Notification) {
    return;
  }

  if (Notification.permission !== 'granted') {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return;
      });
    } catch (error) {
      if (error instanceof TypeError) {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } else {
        console.error(error);
      }
    }
  }

  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notificationRef.current.close();
    };
  };

  const fireNotification = (title, options = {}) => {
    const newOption = {
      badge: 'https://s3-themint.s3.ap-northeast-2.amazonaws.com/member/basic5.png',
      icon: 'https://s3-themint.s3.ap-northeast-2.amazonaws.com/member/basic5.png',
      silent: false,
      requireInteraction: false,
      ...options,
    };

    notificationRef.current = new Notification(title, newOption);

    setNotificationClickEvent();
  };

  return { fireNotification };
};

export default usePushNotification;
