import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import GradientButton from '../common/GradientButton';
import MintButton from '../common/MintButton';
import { ActiveInput } from '../../style/style';
import { userApis } from '../../utils/api/userApi';
import { getData } from '../../utils/api/api';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import debounce from '../../utils/functions/debounce';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import { InputContainer } from './Register2';
import StepSignal from './StepSignal';
import { MessageWrapper, SuccessValidationMessage, WarningMessage } from '../../style/common';

function Register3({ setUserInfo }) {
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      address: '',
    },
    mode: 'onChange',
  });

  const onValid = (data) => {
    if (duplicatedNickname) {
      setError('memberId', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      return;
    }
    setUserInfo((prev) => ({ ...prev, ...data }));
  };

  const checkNickname = async (value) => {
    if (errors?.nickname?.type === 'pattern' || !value || value.length < STANDARD.NAME_MIN_LENGTH)
      return;
    try {
      const response = await getData(userApis.NICKNAME_DUPLICATE_CHECK_API(value));
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
          <WarningMessage>{errors?.nickname?.message}</WarningMessage>
          {watch().nickname && !errors?.nickname && (
            <SuccessValidationMessage>
              {REGISTER_MESSAGE.VALIDATED_NICKNAME}
            </SuccessValidationMessage>
          )}
        </MessageWrapper>
        <InputContainer>
          <ActiveInput active={true}>
            <input
              name="address"
              id="address"
              type="text"
              value={address || ''}
              onChange={handleInput}
              {...register('address', {
                required: REGISTER_MESSAGE.REQUIRED_ADDRESS,
              })}
              placeholder=" "
              required
            />
            <label htmlFor="address">주소</label>
          </ActiveInput>
          <MintButton text={'찾기'} type={'button'} onClick={togglePostCode} />
        </InputContainer>
        <div id="popupDom">
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode onClose={closePostCode} setAddress={setAddress} />
            </PopupDom>
          )}
        </div>
        <MessageWrapper>
          <WarningMessage>{errors?.pwd?.message}</WarningMessage>
        </MessageWrapper>
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
        <MessageWrapper></MessageWrapper>

        <StepSignal step={'register3'} />
        <GradientButton text={'회원가입'} />
      </div>
    </form>
  );
}

export default Register3;
