import { atom, atomFamily, selector, selectorFamily } from 'recoil';
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

// export const notificationListSelector = selector({
//   key: `notificationListSelector/${v1()}`,
//   get: ({ get }) =>
//     localStorage.getItem(`notificationList/${get(myInformationState).memberId}`)
//       ? JSON.parse(localStorage.getItem(`notificationList/${get(myInformationState).memberId}`))
//       : [],
//   set: ({ set }, newValue) => {
//     set(notificationListState, newValue);
//   },
// });

// export const notificationSelector = atom({
//   key: `notificationSelector/${v1()}`,
//   get: ({ get }) => [],
//   set: ({ set }, newValue) => {
//     set(notificationListState, newValue);
//   },
// });
