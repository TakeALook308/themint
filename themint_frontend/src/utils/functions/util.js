import { LOGIN_MESSAGE } from '../constants/constant';

export const makeLoginMessageRandomNumber = () => {
  const len = LOGIN_MESSAGE.SUCCESS_LOGIN.length;
  return Math.floor(Math.random() * len);
};
