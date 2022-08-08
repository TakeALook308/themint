export const userApis = {
  ID_DUPLICATE_CHECK_API: (id) => `/api/member/id/${id}`,
  NICKNAME_DUPLICATE_CHECK_API: (nickname) => `/api/member/nickname/${nickname}`,
  EMAIL_DUPLICATE_CHECK_API: (email) => `/api/member/email/${email}`,
  PHONE_DUPLICATE_CEHCK_API: (phone) => `/api/member/phone/${phone}`,
  PHONE_CERTIFICATE_API: `/api/member/sms`,
  REGISTER: '/api/member',
  LOGIN: '/api/member/login',
  AUTH_EMAIL: '/api/member/password',
  PASSWORD_CHANGE: '/api/member/password/change',
};
