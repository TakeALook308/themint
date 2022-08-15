import React, { useRef } from 'react';
import useThrottle from './useThrottle';

const usePushNotification = () => {
  const notificationRef = useRef(null);
  const timerRef = useRef(null);

  if (!Notification) {
    return;
  }

  if (Notification.permission !== 'granted') {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return;
      });
    } catch (err) {
      if (err instanceof TypeError) {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } else {
        console.log(err);
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
  /**************** 위에 작성한 코드까지는 위에 설명해놨음! ****************/

  // Notification을 위한 타이머를 설정하는 함수!
  const throttle = useThrottle;
  const setNotificationTimer = (timeout) => {
    throttle(() => {
      notificationRef.current.close();
      notificationRef.current = null;
    }, timeout);
  };

  const fireNotification = (title, timeout, options = {}) => {
    if (Notification.permission !== 'granted') return;
    const newOption = {
      badge: 'https://babble.gg/img/logos/babble-speech-bubble.png',
      icon: 'https://babble.gg/img/logos/babble-speech-bubble.png',
      ...options,
    };
    if (!notificationRef.current) {
      setNotificationTimer(timeout);
      notificationRef.current = new Notification(title, newOption);

      setNotificationClickEvent();
    }
  };

  return { fireNotification };
};

export default usePushNotification;
