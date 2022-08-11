import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DefaultButton from '../../components/common/DefaultButton';
import ValidationMessage from '../../components/common/ValidationMessage';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';

function NicknameInput({ text, setEditMode }) {
  const {
    register,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { nickname: text[0] }, mode: 'onChange' });
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
      // validate: debounceCheckNickname,
    }),
  };
  return (
    <FormContainer>
      <InputContainer>
        <ActiveInput active={true}>
          <input
            name="nickname"
            id="nickname"
            type="text"
            autoComplete="off"
            placeholder=" "
            required
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
        />
        <DefaultButton title={'변경'} type="button" widthValue="70px" onClick={() => {}} />
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
