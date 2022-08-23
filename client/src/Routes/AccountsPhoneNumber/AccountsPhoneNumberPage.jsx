import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import GradientButton from '../../components/ButtonList/GradientButton';
import MintButton from '../../components/ButtonList/MintButton';
import ActiveInputBox from '../../components/common/ActiveInputBox';
import ValidationMessage from '../../components/common/ValidationMessage';
import { errorToast, successToast } from '../../lib/toast';
import { MessageWrapper } from '../../style/common';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { REGEX, REGISTER_MESSAGE } from '../../utils/constants/constant';
import debounce from '../../utils/functions/debounce';
import CountDown from '../../utils/hooks/CountDown';
import {
  ButtonContainer,
  Container,
  Form,
  InputContainer,
  InputMessageContainer,
} from '../AccountsPassword/AccountsPasswordPage';
import { InputContainer as InputWrapper } from '../Register/Register2';

function AccountsPhoneNumberPage() {
  const [isDuplicatedPhone, setIsDuplicatedPhone] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const {
    register,
    watch,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
    },
    mode: 'onChange',
  });

  const authNumber = useRef({});
  authNumber.current = watch('authNumber', null);

  const checkMemberInfo = async (value, url, setState, key, errorMessage) => {
    if (!value || errors[key]) return;
    try {
      const response = await fetchData.get(url);
      if (response.status === 200) {
        setState(false);
      }
    } catch (err) {
      setError(key, { message: errorMessage }, { shouldFocus: true });
      setState(true);
    }
  };

  const debouncePhoneChange = async (value) => {
    return await checkMemberInfo(
      value,
      userApis.PHONE_DUPLICATE_CEHCK_API(value),
      setIsDuplicatedPhone,
      'phone',
      REGISTER_MESSAGE.DUPLICATED_PHONE,
    );
  };

  const debouncedValidatePhoneNumber = useMemo(
    () => debounce((e) => debouncePhoneChange(e.target.value), 500),
    [],
  );

  const phoneRegister = {
    ...register('phone', {
      required: REGISTER_MESSAGE.REQUIRED_PHONE,
      pattern: {
        value: REGEX.PHONE,
        message: REGISTER_MESSAGE.PHONE_STANDARD,
      },
      onChange: debouncedValidatePhoneNumber,
    }),
  };

  const authRegister = {
    ...register('authNumber', {
      required: REGISTER_MESSAGE.REQUIRED_CERTIFICATION_NUMBER,
    }),
  };

  const onValid = async (data) => {
    if (isDuplicatedPhone) {
      setError('phone', { message: REGISTER_MESSAGE.DUPLICATED_PHONE });
      return;
    }
    const body = { phone: data.phone, authNumber: authNumber.current };
    setTimeout(async () => {
      try {
        const response = await fetchData.post(userApis.PHONE_AUTHNUMBER_CHECK, body);
        if (response.status === 200) {
          successToast('전화번호 변경에 성공하였습니다.');
          setValue('phone', '');
          setValue('authNumber', '');
        }
      } catch (err) {
        errorToast('인증번호를 확인해주세요.');
      }
    }, 1000);
  };

  const onInValid = () => {
    if (isDuplicatedPhone) {
      setError('phone', { message: REGISTER_MESSAGE.DUPLICATED_PHONE });
      return;
    }
    if (errors?.authNumber?.message) {
      errorToast(errors?.authNumber?.message);
    }
  };

  const phone = useRef({});
  phone.current = watch('phone', '');

  const certificatePhoneNumber = async (event) => {
    event.preventDefault();
    if (!phone.current) return;
    if (errors.phone) return;
    setIsAuthenticating(true);
    try {
      const response = await fetchData.post(userApis.PHONE_CERTIFICATE_API, {
        phone: phone.current,
      });
    } catch (err) {
      if (err.response.status) {
      }
    }
  };
  return (
    <Container>
      <PhoneNumberDescriptionContainer>
        <li> 더민트 이용을 위해서는 반드시 핸드폰 인증이 필요합니다.</li>
        <li> 더민트 계정에서는 하나의 계정에 하나의 핸드폰 번호만 이용 가능합니다.</li>
        <li>
          더민트 계정에서 핸드폰 번호를 변경하고 싶으신 경우 새로운 핸드폰 번호로 인증 받으셔야
          합니다.
        </li>
      </PhoneNumberDescriptionContainer>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
        <InputContainer>
          <label htmlFor="phone">전화번호</label>
          <InputMessageContainer>
            <InputWrapper>
              <ActiveInputBox
                type="text"
                id="phone"
                name="phone"
                placeholder={'전화번호를 입력하세요.'}
                register={phoneRegister}
                disabled={isAuthenticating}
              />
              <MintButton
                text={'인증'}
                type={'button'}
                onClick={certificatePhoneNumber}
                disabled={isDuplicatedPhone || isAuthenticating}
              />
            </InputWrapper>
            <MessageWrapper>
              <ValidationMessage text={errors?.phone?.message} state={'fail'} />
              {watch().phone && !errors?.phone && (
                <>
                  <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_PHONE} state={'pass'} />
                  {isAuthenticating && (
                    <CountDown
                      isAuthenticating={isAuthenticating}
                      setIsAuthenticating={setIsAuthenticating}
                    />
                  )}
                </>
              )}
            </MessageWrapper>
          </InputMessageContainer>
        </InputContainer>
        <InputContainer>
          <label htmlFor="authNumber">인증코드</label>
          <InputMessageContainer>
            <ActiveInputBox
              type="text"
              id="authNumber"
              name="authNumber"
              placeholder={'문자로 통해 받은 인증코드를 입력하세요.'}
              register={authRegister}
            />
          </InputMessageContainer>
        </InputContainer>
        <MessageWrapper />
        <ButtonContainer>
          <GradientButton text={'전화번호 변경'} type={'submit'} size={'200px'} />
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default AccountsPhoneNumberPage;

const PhoneNumberDescriptionContainer = styled.ol`
  color: ${(props) => props.theme.colors.pointRed};
  line-height: 1.7;
  list-style-type: decimal;
  list-style-position: inside;
`;
