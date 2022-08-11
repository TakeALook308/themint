import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DefaultButton from '../../components/common/DefaultButton';
import ValidationMessage from '../../components/common/ValidationMessage';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { getData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import debounce from '../../utils/functions/debounce';

function NicknameInput({ text, setEditMode, changeInformation }) {
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);
  const {
    register,
    setError,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { nickname: text[0] }, mode: 'onChange' });

  const checkNickname = async (value) => {
    if (errors?.nickname?.type === 'pattern' || !value || value.length < STANDARD.NAME_MIN_LENGTH)
      return;
    try {
      const response = await getData(userApis.NICKNAME_DUPLICATE_CHECK_API(value));
      if (response.status === 200) {
        setIsDuplicatedNickname(false);
      }
    } catch {
      setError('nickname', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      setIsDuplicatedNickname(true);
    }
  };

  const debounceCheckNickname = useMemo(
    () => debounce(async (value) => await checkNickname(value), 1000),
    [],
  );

  const onValid = async (data) => {
    if (isDuplicatedNickname) {
      setError(
        'nickname',
        { message: REGISTER_MESSAGE.DUPLICATED_NIACKNAME },
        { shouldFocus: true },
      );
      return;
    }
    await changeInformation(data);
  };

  const registers = {
    ...register('nickname', {
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
    }),
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <InputContainer>
        <ActiveInput active={true}>
          <input
            name="nickname"
            id="nickname"
            type="text"
            autoComplete="off"
            placeholder=" "
            required
            maxLength={STANDARD.NAME_MAX_LENGTH}
            minLength={STANDARD.NAME_MIN_LENGTH}
            {...registers}
          />
          <label htmlFor="nickname">닉네임</label>
        </ActiveInput>
        <MessageWrapper>
          <ValidationMessage text={errors?.nickname?.message} state={'fail'} />
          {watch().nickname && !errors?.nickname && (
            <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_NICKNAME} state={'pass'} />
          )}
        </MessageWrapper>
      </InputContainer>
      <ButtonContainer>
        <DefaultButton
          title={'취소'}
          type="button"
          widthValue="70px"
          onClick={() => setEditMode(false)}
          disabled={isSubmitting}
        />
        <DefaultButton title={'변경'} type="submit" widthValue="70px" />
      </ButtonContainer>
    </FormContainer>
  );
}

export default NicknameInput;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  padding-top: 0.7rem;
  display: flex;
  gap: 1rem;
`;

export const InputContainer = styled.div`
  width: 60%;
`;
