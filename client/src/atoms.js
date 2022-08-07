import { atom, selector } from 'recoil';

export const myInformationState = atom({
  key: 'myInformation',
  default: {
    memberId: 'ney9083',
    nickName: '므녀링',
  },
});
