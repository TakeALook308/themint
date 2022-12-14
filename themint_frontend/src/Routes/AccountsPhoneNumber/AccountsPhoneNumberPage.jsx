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
import CountDown from '../../components/common/CountDown';
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
    const body = { phone: data.phone, authNum: authNumber.current };
    try {
      const response = await fetchData.post(userApis.PHONE_AUTHNUMBER_CHECK, body);
      if (response.status === 200) {
        successToast('???????????? ????????? ?????????????????????.');
        setValue('phone', '');
        setValue('authNumber', '');
      }
    } catch (err) {
      errorToast('??????????????? ??????????????????.');
    }
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
        <li> ????????? ????????? ???????????? ????????? ????????? ????????? ???????????????.</li>
        <li> ????????? ??????????????? ????????? ????????? ????????? ????????? ????????? ?????? ???????????????.</li>
        <li>
          ????????? ???????????? ????????? ????????? ???????????? ????????? ?????? ????????? ????????? ????????? ?????? ????????????
          ?????????.
        </li>
      </PhoneNumberDescriptionContainer>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
        <InputContainer>
          <label htmlFor="phone">????????????</label>
          <InputMessageContainer>
            <InputWrapper>
              <ActiveInputBox
                type="text"
                id="phone"
                name="phone"
                placeholder={'??????????????? ???????????????.'}
                register={phoneRegister}
                disabled={isAuthenticating}
              />
              <MintButton
                text={'??????'}
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
          <label htmlFor="authNumber">????????????</label>
          <InputMessageContainer>
            <ActiveInputBox
              type="text"
              id="authNumber"
              name="authNumber"
              placeholder={'????????? ?????? ?????? ??????????????? ???????????????.'}
              register={authRegister}
            />
          </InputMessageContainer>
        </InputContainer>
        <MessageWrapper />
        <ButtonContainer>
          <GradientButton text={'???????????? ??????'} type={'submit'} size={'200px'} />
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
