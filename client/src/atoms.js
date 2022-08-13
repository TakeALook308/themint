import { atom, selector, selectorFamily } from 'recoil';
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
    memberId: session.get('profile') ? session.get('profile')?.memberId : '',
    nickname: session.get('profile') ? session.get('profile')?.nickname : '',
    memberSeq: session.get('profile') ? session.get('profile')?.memberSeq : '',
  },
});

export const userState = atom({
  key: 'userState',
  default: {},
});

export const getUserSelector = selectorFamily({
  key: 'user/get',
  get: async (memberId) => {
    // const user = get(myInformationState);
    try {
      const { data } = await fetchData.get(userApis.USER_INFORMATION(memberId));
      return data;
    } catch (err) {
      throw err;
    }
  },
  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
});
