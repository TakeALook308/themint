export const REGISTER_MESSAGE = {
  REQUIRED_ID: '아이디를 입력해주세요.',
  DUPLICATED_ID: '이미 존재하는 아이디입니다.',
  ONLY_ENGLISH_AND_NUMBER: '아이디는 영문 대·소문자와 숫자만 사용이 가능합니다.',
  ID_LENGTH: '아이디는 6 ~ 20자 사이로 작성해주세요.',
  REQUIRED_PASSWORD: '비밀번호를 생성해주세요.',
  PASSWORD_STANDARD: '비밀번호는 영문자, 숫자, 특수문자 포함 8글자 이상 입력해주세요.',
  REQUIRED_PASSWORD_CHECK: '비밀번호를 확인해주세요.',
  PASSWORD_CHECK: '입력한 비밀번호와 일치하지 않습니다.',
  REQUIRED_NAME: '이름을 입력해주세요.',
  NAME_STANDARD: '이름은 한글만 입력이 가능합니다.',
  NAME_LENGTH: '이름은 2 ~ 10자 사이로 작성해주세요.',
  REQUIRED_EMAIL: '이메일 주소를 입력해주세요.',
  EMAIL_STANDARD: '이메일 주소만 입력이 가능합니다.',
  DUPLICATED_EMAIL: '사용 중인 이메일 주소입니다.',
  REQUIRED_PHONE: '전화번호를 입력해주세요.',
  PHONE_STANDARD: '전화번호는 "-"를 포함한 특수문자를 제외하고 숫자만 입력해주세요.',
  DUPLICATED_PHONE: '사용 중인 전화번호입니다.',
  REQUIRED_CERTIFICATION_NUMBER: '인증번호를 입력해주세요.',
  CERTICATION_NUMBER: '인증번호가 일치하지 않습니다.',
  REQUIRED_NICKNAME: '닉네임을 입력해주세요.',
  DUPLICATED_NIACKNAME: '사용 중인 닉네임입니다.',
  NICKNAME_LENGTH: '닉네임은 2 ~ 10자 사이로 작성해주세요.',
  NICKNAME_STANDARD: '닉네임은 영어, 한글, 숫자로만 구성될 수 있습니다.',
  REQUIRED_ADDRESS: '주소를 입력해주세요.',
};

export const STANDARD = {
  ID_MIN_LENGTH: 6,
  ID_MAX_LENGTH: 20,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 10,
};

export const REGEX = {
  ID: /^[a-zA-Z0-9]*$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
  NAME: /^[가-힣]*$/,
  EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  PHONE: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
  NICKNAME: /^[가-힣|a-z|A-Z|0-9|]+$/,
};

export const PAGES = {
  REGISTER: '회원가입',
  LOGIN: '로그인',
};
