import { atom, atomFamily } from 'recoil';
import { getCookie } from './utils/functions/cookies';
import { v1 } from 'uuid';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
  key: `deviceList`,
  default: {
    videoId: '',
    microPhoneId: '',
  },
  effects_UNSTABLE: [persistAtom],
  storage: localStorage,
});

export const notificationListFamilyState = atomFamily({
  key: `notificationList/${v1()}`,
  default: (param) =>
    localStorage.getItem(`notificationList/${param}`)
      ? JSON.parse(localStorage.getItem(`notificationList/${param}`))
      : [],
});
