import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import * as Common from '../style/common';
import { useForm } from 'react-hook-form';
import { ActiveInput } from '../style/style';
import ActiveInputBox from '../components/common/ActiveInputBox';
import DefaultButton from '../components/common/DefaultButton';
import { getData, userApis } from '../utils/api/userApi';
import debounce from '../utils/functions/debounce';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../utils/constants/constant';
import GradientButton from '../components/common/GradientButton';
import Logo from '../components/common/Logo';
import { Link } from 'react-router-dom';

function Register(props) {
  const [duplicatedID, setDuplicatedID] = useState(true);
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberId: '',
      memberName: '',
      nickname: '',
      pwd: '',
      email: '',
      address: '',
      phone: '',
    },
    mode: 'onChange',
  });

  const onValid = (data) => {
    console.log(data);
  };

  const password = useRef({});
  password.current = watch('pwd', '');

  const checkMemberId = async (e) => {
    const {
      target: { value },
    } = e;
    if (!value || value.length < STANDARD.ID_MIN_LENGTH) return;
    try {
      const response = await getData(userApis.ID_DUPLICATE_CHECK_API(value || value));
      if (response.status === 200) {
        setDuplicatedID(true);
        return true;
      }
    } catch {
      setError('memberId', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      setDuplicatedID(false);
    }
  };

  const onIdChange = async (value) => {
    processChange(value);
  };
  const processChange = debounce(async (value) => await checkMemberId(value));

  return (
    <Container nonMember={true}>
      <RegisterContainer>
        <Header>
          <Logo />
        </Header>
        <p>회원가입</p>
        <form onSubmit={handleSubmit(onValid)}>
          <div>
            <ActiveInput active={true}>
              <input
                name="memberId"
                id="memberId"
                type="text"
                maxLength={STANDARD.ID_MAX_LENGTH}
                minLength={STANDARD.ID_MIN_LENGTH}
                autoComplete="off"
                {...register('memberId', {
                  required: REGISTER_MESSAGE.REQUIRED_ID,
                  minLength: {
                    value: 6,
                    message: REGISTER_MESSAGE.ID_LENGTH,
                  },
                  maxLength: {
                    value: 20,
                    message: REGISTER_MESSAGE.ID_LENGTH,
                  },
                  pattern: {
                    value: REGEX.ID,
                    message: REGISTER_MESSAGE.ONLY_ENGLISH_AND_NUMBER,
                  },
                  onChange: (e) => onIdChange(e),
                })}
                placeholder=" "
                required
              />
              <label htmlFor="memberId">아이디</label>
            </ActiveInput>
            <MessageWrapper>
              <WarningMessage>{errors?.memberId?.message}</WarningMessage>
            </MessageWrapper>
            <ActiveInput active={true}>
              <input
                name="password"
                id="password"
                type="password"
                maxLength={STANDARD.ID_MAX_LENGTH}
                minLength={STANDARD.ID_MIN_LENGTH}
                {...register('pwd', {
                  required: REGISTER_MESSAGE.REQUIRED_PASSWORD,
                  minLength: {
                    value: 8,
                    message: REGISTER_MESSAGE.PASSWORD_STANDARD,
                  },
                  maxLength: {
                    value: 20,
                    message: REGISTER_MESSAGE.PASSWORD_STANDARD,
                  },
                  pattern: {
                    value: REGEX.PASSWORD,
                    message: REGISTER_MESSAGE.PASSWORD_STANDARD,
                  },
                })}
                placeholder=" "
                required
              />
              <label htmlFor="password">비밀번호</label>
            </ActiveInput>
            <MessageWrapper>
              <WarningMessage>{errors?.pwd?.message}</WarningMessage>
            </MessageWrapper>
            <ActiveInput active={true}>
              <input
                name="password-check"
                id="password-check"
                type="password"
                placeholder=" "
                {...register('passwordCheck', {
                  required: REGISTER_MESSAGE.REQUIRED_PASSWORD_CHECK,
                  validate: {
                    passwordMatch: (value) =>
                      value !== password.current ? REGISTER_MESSAGE.PASSWORD_CHECK : true,
                  },
                })}
                required
              />
              <label htmlFor="password">비밀번호 확인</label>
            </ActiveInput>
            <MessageWrapper>
              <WarningMessage>{errors?.passwordCheck?.message}</WarningMessage>
            </MessageWrapper>
            <GradientButton text={'회원가입 계속하기'} />
          </div>
        </form>
        <LinkContainer>
          <Link to="/login">
            <h2>로그인</h2>
          </Link>
        </LinkContainer>
        <div>or</div>
        <GradientButton text={'카카오톡으로 회원가입'} />
        <GradientButton text={'네이버로 회원가입'} />
      </RegisterContainer>
    </Container>
  );
}

export default Register;

const Container = styled(Common.Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterContainer = styled.div`
  width: 50%;
  height: fit-content;
  padding: 4rem 3rem;
  background-color: ${(props) => props.theme.colors.subBlack};
  border-radius: 10px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const LinkContainer = styled.div`
  width: 100%;
  h2 {
    margin: 0 auto;
    width: fit-content;
    text-decoration: underline;
  }
`;

const WarningMessage = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.pointRed};
`;

const MessageWrapper = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
`;
