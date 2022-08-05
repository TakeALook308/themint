import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import GradientButton from '../components/common/GradientButton';
import { MessageWrapper, WarningMessage } from '../style/common';
import { ActiveInput } from '../style/style';
import { getData, userApis } from '../utils/api/userApi';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../utils/constants/constant';
import debounce from '../utils/functions/debounce';

function Register1({ setUserInfo, setStep }) {
  const [duplicatedID, setDuplicatedID] = useState(false);

  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberId: '',
      pwd: '',
    },
    mode: 'onChange',
  });

  const onValid = (data) => {
    if (duplicatedID) {
      setError('memberId', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      return;
    }
    setUserInfo((prev) => ({ ...prev, ...data }));
    setStep((prev) => ({ ...prev, step1: false, step2: true }));
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
        setDuplicatedID(false);
      }
    } catch {
      // setError('memberId', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      // setDuplicatedID(false);
      setDuplicatedID(true);
    }
  };

  const onChangeId = async (value) => {
    debounceIdChange(value);
  };
  const debounceIdChange = debounce(async (value) => await checkMemberId(value));

  return (
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
              onChange: (e) => onChangeId(e),
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
        <GradientButton text={'회원가입 계속하기'} type={'submit'} />
      </div>
    </form>
  );
}

export default Register1;
