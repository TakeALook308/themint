import React, { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import GradientButton from '../common/GradientButton';
import MintButton from '../common/MintButton';
import { MessageWrapper, SuccessValidationMessage, WarningMessage } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { userApis } from '../../utils/api/userApi';
import { getData } from '../../utils/api/api';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import debounce from '../../utils/functions/debounce';
import StepSignal from './StepSignal';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

function Register2({ setUserInfo, setStep }) {
  const [email, setEmail] = useState('');
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
      return;
    }
    setUserInfo((prev) => ({ ...prev, ...data }));
    setStep((prev) => ({ ...prev, step2: false, step3: true }));
  };

  const checkMemberInfo = async (value, url, setState, key, errorMessage) => {
    if (!value || errors[key]) return;
    console.log(value);
    console.log('fuck');
    try {
      const response = await getData(url);
      if (response.status === 200) {
        setState(false);
      }
    } catch {
      setError(key, { message: errorMessage }, { shouldFocus: true });
      setState(true);
    }
  };

  const debounceEmailChange = async (value) =>
    await checkMemberInfo(
      value,
      userApis.EMAIL_DUPLICATE_CHECK_API(value),
      setDuplicatedEmail,
      'email',
      REGISTER_MESSAGE.DUPLICATED_EMAIL,
    );

  const validatePhoneNumber = (event) => {
    event.preventDefault();
    console.log('validate');
    trigger('phone');
  };

  const debouncePhoneChange = async (value) =>
    await checkMemberInfo(
      value,
      userApis.PHONE_DUPLICATE_CEHCK_API(value),
      setDuplicatedPhone,
      'phone',
      REGISTER_MESSAGE.DUPLICATED_PHONE,
    );

  const debouncedValidateEmail = useMemo(
    () => debounce((value) => debounceEmailChange(value), 700),
    [],
  );

  const debouncedValidatePhoneNumber = useMemo(
    () => debounce((value) => debouncePhoneChange(value), 700),
    [],
  );

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
              validate: debouncedValidateEmail,
            })}
            placeholder=" "
            required
          />
          <label htmlFor="email">email</label>
        </ActiveInput>
        <MessageWrapper>
          <WarningMessage>{errors?.email?.message}</WarningMessage>
          {watch().email && !errors?.email && (
            <SuccessValidationMessage>{REGISTER_MESSAGE.VALIDATED_EMAIL}</SuccessValidationMessage>
          )}
        </MessageWrapper>
        <InputContainer>
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
                validate: debouncedValidatePhoneNumber,
              })}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="phone">전화번호</label>
          </ActiveInput>
          <MintButton text={'인증'} type={'button'} onClick={validatePhoneNumber} />
        </InputContainer>
        <MessageWrapper>
          <WarningMessage>{errors?.phone?.message}</WarningMessage>
          {watch().phone && !errors?.phone && (
            <SuccessValidationMessage>{REGISTER_MESSAGE.VALIDATED_PHONE}</SuccessValidationMessage>
          )}
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

export const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  div {
    flex: 0 1 100%;
  }
  button {
    flex: 0 1 20%;
  }
`;
