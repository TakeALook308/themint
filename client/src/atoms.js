import { atom, selector } from 'recoil';
import { getCookie } from './utils/functions/cookies';
import { v1 } from 'uuid';
import Session from './utils/functions/storage';

// export const myInformationState = atom({
//   key: 'myInformation',
//   default: {
//     memberId: 'ney9083',
//     nickName: '므녀링',
//   }
// });

const session = new Session();

export const loggedinState = atom({
  key: `loggedin/${v1()}`,
  default: {
    logged: getCookie('accessToken') ? true : false,
  },
});

export const myInformationState = atom({
  key: `myInformation/${v1()}`,
  default: {
    memberId: session.get('profile') ? session.get('profile')?.memberId : '',
    nickname: session.get('profile') ? session.get('profile')?.nickname : '',
    memberSeq: session.get('profile') ? session.get('profile')?.memberSeq : '',
  },
});
