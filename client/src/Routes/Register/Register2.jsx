import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import GradientButton from '../../components/ButtonList/GradientButton';
import MintButton from '../../components/ButtonList/MintButton';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { userApis } from '../../utils/apis/userApis';
import { getData, postData } from '../../utils/apis/api';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import debounce from '../../utils/functions/debounce';
import StepSignal from './StepSignal';
import ValidationMessage from '../../components/common/ValidationMessage';

function Register2({ setUserInfo, setStep }) {
  const [certificatedNumber, setCertificatedNumber] = useState();
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

  const onValid = (data) => {
    if (duplicatedEmail) {
      setError('email', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      return;
    }
    trigger('certificationNumber');
    setUserInfo((prev) => ({ ...prev, ...data }));
    setStep((prev) => ({ ...prev, step2: false, step3: true }));
  };

  const checkMemberInfo = async (value, url, setState, key, errorMessage) => {
    if (!value || errors[key]) return;
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

  const certificatePhoneNumber = async (event) => {
    event.preventDefault();
    if (errors.phone) return;
    const response = await postData(userApis.PHONE_CERTIFICATE_API, {
      phone: watch().phone,
    });
    setCertificatedNumber(String(response.data));
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
          <ValidationMessage text={errors?.memberName?.message} state={'fail'} />
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
          <ValidationMessage text={errors?.email?.message} state={'fail'} />
          {watch().email && !errors?.email && (
            <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_EMAIL} state={'pass'} />
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
          <MintButton text={'인증'} type={'button'} onClick={certificatePhoneNumber} />
        </InputContainer>
        <MessageWrapper>
          <ValidationMessage text={errors?.phone?.message} state={'fail'} />
          {watch().phone && !errors?.phone && (
            <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_PHONE} state={'pass'} />
          )}
        </MessageWrapper>
        <ActiveInput active={true}>
          <input
            name="certificationNumber"
            id="certificationNumber"
            type="text"
            {...register('certificationNumber', {
              required: REGISTER_MESSAGE.REQUIRED_CERTIFICATION_NUMBER,
              validate: {
                certi: (value) =>
                  value !== certificatedNumber ? REGISTER_MESSAGE.FAILED_CERTICATION_NUMBER : true,
              },
            })}
            placeholder=" "
            autoComplete="off"
            required
          />
          <label htmlFor="certificationNumber">인증번호</label>
        </ActiveInput>
        <MessageWrapper>
          <ValidationMessage text={errors?.certificationNumber?.message} state={'fail'} />
          {watch().certificationNumber && !errors?.certificationNumber && (
            <ValidationMessage
              text={REGISTER_MESSAGE.VALIDATED_CERTICATION_NUMBER}
              state={'pass'}
            />
          )}
        </MessageWrapper>
        <StepSignal step={'register2'} />
        <GradientButton text={'다음'} type={'submit'} />
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
