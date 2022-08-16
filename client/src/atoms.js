import { atom, atomFamily } from 'recoil';
import { getCookie } from './utils/functions/cookies';
import { v1 } from 'uuid';
import Session from './utils/functions/storage';
import { fetchData } from './utils/apis/api';
import { userApis } from './utils/apis/userApis';

const session = new Session();

export const loggedinState = atom({
  key: `loggedin/${v1()}`,
  default: getCookie('accessToken') ? true : false,
});

export const myInformationState = atom({
  key: `myInformation/${v1()}`,
  default: {
    memberId: '',
    nickname: '',
    memberSeq: '',
  },
});

export const keywordState = atom({
  key: `keyword/${v1()}`,
  default: {
    keyword: '',
    type: 'auction',
  },
});

export const timeState = atom({
  key: 'timeState',
  default: 0,
});
export const deviceListState = atom({
  key: `deviceList/${v1()}`,
  default: {
    videoId: '',
    microPhoneId: '',
  },
});

export const notificationListFamilyState = atomFamily({
  key: `notificationList/${v1()}`,
  default: (param) =>
    localStorage.getItem(`notificationList/${param}`)
      ? JSON.parse(localStorage.getItem(`notificationList/${param}`))
      : [],
});
