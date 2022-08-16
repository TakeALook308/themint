import { atom, selector, selectorFamily } from 'recoil';
import { getCookie } from './utils/functions/cookies';
import { v1 } from 'uuid';

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
