import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const tokenOption = {
  path: '/',
  secure: true,
  sameSite: 'none',
  httpOnly: true,
};

export const setCookie = (name, value, option = tokenOption) => {
  cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};
