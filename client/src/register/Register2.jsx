import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import GradientButton from '../components/common/GradientButton';
import MintButton from '../components/common/MintButton';
import { MessageWrapper } from '../style/common';
import { ActiveInput } from '../style/style';
import { getData, userApis } from '../utils/api/userApi';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../utils/constants/constant';
import debounce from '../utils/functions/debounce';
import { WarningMessage } from './Register3';
import StepSignal from './StepSignal';

function Register2({ setUserInfo, setStep }) {
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);
  const [duplicatedPhone, setDuplicatedPhone] = useState(false);

  const {
    register,
    watch,
    setError,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberName: '',
      nickname: '',
      phone: '',
    },
    mode: 'onChange',
  });

  //TODO: 임시 메서드 삭제 필요
  const click = () => {
    setStep((prev) => ({ ...prev, step2: false, step3: true }));
  };

  const onValid = (data) => {
    if (duplicatedEmail) {
      setError('email', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      setDuplicatedEmail(true);
      return;
    }
    setUserInfo((prev) => ({ ...prev, ...data }));
    setStep((prev) => ({ ...prev, step2: false, step3: true }));
  };

  const password = useRef({});
  password.current = watch('pwd', '');

  const checkMemberId = async (e) => {
    const {
      target: { value },
    } = e;
    if (!value) return;
    try {
      const response = await getData(userApis.ID_DUPLICATE_CHECK_API(value));
      if (response.status === 200) {
        setDuplicatedEmail(false);
        return true;
      }
    } catch {
      setError('email', { message: REGISTER_MESSAGE.DUPLICATED_EMAIL }, { shouldFocus: true });
      setDuplicatedEmail(true);
    }
  };

  const onChangeEmail = async (value) => {
    debounceEmailChange(value);
  };
  const debounceEmailChange = debounce(async (value) => await checkMemberId(value));

  const validatePhoneNumber = (event) => {
    event.preventDefault();
    console.log('validate');
    trigger('phone');
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <ActiveInput active={true}>
          <input
            name="memberName"
            id="memberName"
            type="text"
            autoComplete="off"
            {...register('memberName', {
              required: REGISTER_MESSAGE.REQUIRED_NAME,
              minLength: {
                value: STANDARD.NAME_MIN_LENGTH,
                message: REGISTER_MESSAGE.NAME_LENGTH,
              },
              maxLength: {
                value: STANDARD.NAME_MAX_LENGTH,
                message: REGISTER_MESSAGE.NAME_LENGTH,
              },
              pattern: {
                value: REGEX.NAME,
                message: REGISTER_MESSAGE.NAME_STANDARD,
              },
            })}
            placeholder=" "
            required
          />
          <label htmlFor="memberName">이름</label>
        </ActiveInput>
        <MessageWrapper>
          <WarningMessage>{errors?.memberName?.message}</WarningMessage>
        </MessageWrapper>
        <ActiveInput active={true}>
          <input
            name="email"
            id="email"
            type="email"
            {...register('email', {
              required: REGISTER_MESSAGE.REQUIRED_EMAIL,
              pattern: {
                value: REGEX.EMAIL,
                message: REGISTER_MESSAGE.EMAIL_STANDARD,
              },
              onChange: (e) => onChangeEmail(e),
            })}
            placeholder=" "
            required
          />
          <label htmlFor="email">email</label>
        </ActiveInput>
        <MessageWrapper>
          <WarningMessage>{errors?.email?.message}</WarningMessage>
        </MessageWrapper>
        <PhoneInputContainer>
          <ActiveInput active={true}>
            <input
              name="phone"
              id="phone"
              type="tel"
              {...register('phone', {
                required: REGISTER_MESSAGE.REQUIRED_PHONE,
                pattern: {
                  value: REGEX.PHONE,
                  message: REGISTER_MESSAGE.PHONE_STANDARD,
                },
              })}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="phone">전화번호</label>
          </ActiveInput>
          <MintButton text={'인증'} type={'text'} onClick={validatePhoneNumber} />
        </PhoneInputContainer>
        <MessageWrapper>
          <WarningMessage>{errors?.phone?.message}</WarningMessage>
        </MessageWrapper>
        <ActiveInput active={true}>
          <input
            name="certificationNumber"
            id="certificationNumber"
            type="number"
            {...register('certificationNumber', {
              required: REGISTER_MESSAGE.REQUIRED_CERTIFICATION_NUMBER,
            })}
            placeholder=" "
            required
          />
          <label htmlFor="certificationNumber">인증번호</label>
        </ActiveInput>
        <MessageWrapper>
          <WarningMessage>{errors?.certificationNumber?.message}</WarningMessage>
        </MessageWrapper>
        <StepSignal step={'register2'} />
        <GradientButton text={'다음'} type={'submit'} onClick={click} />
      </div>
    </form>
  );
}

export default Register2;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  div {
    flex: 0 1 100%;
  }
  button {
    flex: 0 1 20%;
  }
`;
