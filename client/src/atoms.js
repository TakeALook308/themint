import { atom, selector } from 'recoil';
import { getCookie } from './utils/functions/cookies';
import { v1 } from 'uuid';
import Session from './utils/functions/storage';

const session = new Session();

export const loggedinState = atom({
  key: `loggedin/${v1()}`,
  default: getCookie('accessToken') ? true : false,
});
console.log(session.get('profile'));

export const myInformationState = atom({
  key: `myInformation/${v1()}`,
  default: {
    memberId: session.get('profile') ? session.get('profile').memberId : '',
    nickname: session.get('profile') ? session.get('profile').nickname : '',
    memberSeq: session.get('profile') ? session.get('profile').memberSeq : '',
  },
});

export const timeState = atom({
  key: 'timeState',
  default: 0,
});
