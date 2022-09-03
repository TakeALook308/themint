export const userApis = {
  ID_DUPLICATE_CHECK_API: (id) => `/api/member/id/${id}`,
  NICKNAME_DUPLICATE_CHECK_API: (nickname) => `/api/member/nickname/${nickname}`,
  EMAIL_DUPLICATE_CHECK_API: (email) => `/api/member/email/${email}`,
  PHONE_DUPLICATE_CEHCK_API: (phone) => `/api/member/phone/${phone}`,
  PHONE_CERTIFICATE_API: `/api/member/sms`,
  REGISTER: '/api/member',
  LOGIN: '/api/member/login',
  AUTH_EMAIL: '/api/member/password/check',
  PASSWORD_CHANGE: '/api/member/password/change',
  PASSWORD: '/api/member/password',
  EMAIL_AUTHNUMBER_CHECK: '/api/member/password/check/auth',
  PHONE_AUTHNUMBER_CHECK: '/api/member/sms/auth',
  FIND_ID: '/api/member/id',
  SCORE_CHANGE: '/api/member/score',
  DELETE_USER: '/api/member/delete',
  USER_INFORMATION: (memberSeq) => `/api/member/${memberSeq}`,
  PROFILE_IMAGE_CHANGE: '/api/member/img',
  MY_BASIC_INFORMATION: '/api/member/info',
  INFORMATION_CHANGE: '/api/member',
  USER_LIST: (word, size) => {
    return (page) => `/api/member?word=${word}&page=${page}&size=${size}`;
  },
};
