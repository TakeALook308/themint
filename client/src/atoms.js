import { atom, selector } from 'recoil';

export const myInformationState = atom({
  key: 'myInformation',
  default: {
    memberId: '',
    nickname: '',
    memberSeq: null,
  },
});
