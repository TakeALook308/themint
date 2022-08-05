export const REGISTER_MESSAGE = {
  REQUIRED_ID: '아이디를 입력해주세요.',
  DUPLICATED_ID: '이미 존재하는 아이디입니다.',
  ONLY_ENGLISH_AND_NUMBER: '아이디는 영문 대·소문자와 숫자만 사용이 가능합니다.',
  ID_LENGTH: '아이디는 6 ~ 20자 사이로 작성해주세요.',
  REQUIRED_PASSWORD: '비밀번호를 생성해주세요.',
  PASSWORD_STANDARD: '비밀번호는 영문자, 숫자, 특수문자 포함 8글자 이상 입력해주세요.',
  REQUIRED_PASSWORD_CHECK: '비밀번호를 확인해주세요.',
  PASSWORD_CHECK: '입력한 비밀번호와 일치하지 않습니다.',
};

export const STANDARD = {
  ID_MIN_LENGTH: 6,
  ID_MAX_LENGTH: 20,
};

export const REGEX = {
  ID: /^[a-zA-Z0-9]*$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
};
