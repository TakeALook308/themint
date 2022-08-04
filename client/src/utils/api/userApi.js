import { instance } from './api';

export const userApis = {
  ID_DUPLICATE_CHECK_API: (id) => `/api/member/id/${id}`,
  NICKNAME_DUPLICATE_CHECK_API: (nickname) => `/api/member/nickname/${nickname}`,
  EMAIL_DUPLICATE_CHECK_API: (email) => `/api/member/email/${email}`,
  REGISTER: '/api/member',
};

export const getData = async (url) => await instance.get(url);
export const postData = async (url, body) => await instance.post(url, body);
