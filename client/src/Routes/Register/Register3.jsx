import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import GradientButton from '../../components/ButtonList/GradientButton';
import MintButton from '../../components/ButtonList/MintButton';
import { ActiveInput } from '../../style/style';
import { userApis } from '../../utils/apis/userApis';
import { fetchData } from '../../utils/apis/api';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import debounce from '../../utils/functions/debounce';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import { InputContainer } from './Register2';
import StepSignal from './StepSignal';
import { MessageWrapper } from '../../style/common';
import ValidationMessage from '../../components/common/ValidationMessage';
import styled from 'styled-components';

function Register3({ setUserInfo, setStep }) {
  const [duplicatedNickname, setDuplicatedNickname] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState();

  const handleInput = (e) => {
    setAddress(e.target.value);
  };

  const togglePostCode = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const {
    register,
    setError,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      zipCode: '',
      address: '',
      addressDetail: '',
    },
    mode: 'onChange',
  });

  const onValid = (data) => {
    if (duplicatedNickname) {
      setError(
        'nickname',
        { message: REGISTER_MESSAGE.DUPLICATED_NIACKNAME },
        { shouldFocus: true },
      );
      return;
    }
    setUserInfo((prev) => ({ ...prev, ...data }));
  };

  const checkNickname = async (value) => {
    if (errors?.nickname?.type === 'pattern' || !value || value.length < STANDARD.NAME_MIN_LENGTH)
      return;
    try {
      const response = await fetchData.get(userApis.NICKNAME_DUPLICATE_CHECK_API(value));
      if (response.status === 200) {
        setDuplicatedNickname(false);
      }
    } catch {
      setError('nickname', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      setDuplicatedNickname(true);
    }
  };

  const debounceCheckNickname = useMemo(
    () => debounce(async (value) => await checkNickname(value), 1000),
    [],
  );

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <ActiveInput active={true}>
          <input
            name="nickname"
            id="nickname"
            type="text"
            autoComplete="off"
            maxLength={STANDARD.NAME_MAX_LENGTH}
            minLength={STANDARD.NAME_MIN_LENGTH}
            {...register('nickname', {
              required: REGISTER_MESSAGE.REQUIRED_NICKNAME,
              minLength: {
                value: STANDARD.NAME_MIN_LENGTH,
                message: REGISTER_MESSAGE.NICKNAME_LENGTH,
              },
              maxLength: {
                value: STANDARD.NAME_MAX_LENGTH,
                message: REGISTER_MESSAGE.ID_LENGTH,
              },
              pattern: {
                value: REGEX.NICKNAME,
                message: REGISTER_MESSAGE.NICKNAME_STANDARD,
              },
              validate: debounceCheckNickname,
            })}
            placeholder=" "
            required
          />
          <label htmlFor="nickname">닉네임</label>
        </ActiveInput>
        <MessageWrapper>
          <ValidationMessage text={errors?.nickname?.message} state={'fail'} />
          {watch().nickname && !errors?.nickname && (
            <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_NICKNAME} state={'pass'} />
          )}
        </MessageWrapper>
        <InputContainer>
          <ActiveInput active={true}>
            <input
              name="zipCode"
              id="zipCode"
              type="text"
              {...register('zipCode', {
                required: REGISTER_MESSAGE.REQUIRED_ADDRESS,
                onChange: (e) => handleInput(e),
              })}
              disabled
              placeholder=" "
              required
            />
            <label htmlFor="zipCode">우편번호</label>
          </ActiveInput>
          <MintButton text={'조회'} type={'button'} onClick={togglePostCode} />
        </InputContainer>
        <div id="popupDom">
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode onClose={closePostCode} setAddress={setValue} />
            </PopupDom>
          )}
        </div>
        <MessageWrapper>
          <ValidationMessage text={errors?.pwd?.message} state={'fail'} />
        </MessageWrapper>
        <AddressContainer>
          <ActiveInput active={true}>
            <input
              name="address"
              id="address"
              type="text"
              {...register('address', {})}
              placeholder=" "
            />
            <label htmlFor="address">주소</label>
          </ActiveInput>
          <ActiveInput active={true}>
            <input
              name="addressDetail"
              id="addressDetail"
              type="text"
              {...register('addressDetail')}
              placeholder=" "
            />
            <label htmlFor="addressDetail">상세주소</label>
          </ActiveInput>
        </AddressContainer>
        <MessageWrapper></MessageWrapper>

        <StepSignal step={'register3'} />
        <GradientButton text={'회원가입'} />
      </div>
    </form>
  );
}

export default Register3;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
