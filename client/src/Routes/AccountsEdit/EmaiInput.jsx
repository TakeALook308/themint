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

function EmaiInput({ text, setEditMode, changeInformation }) {
  const [isDuplicatedEmail, setIsDuplicatedEmail] = useState(false);
  const {
    register,
    setError,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: text[0] }, mode: 'onChange' });

  const checkEmail = async (value) => {
    if (errors?.email?.type === 'pattern' || !value || value.length < STANDARD.NAME_MIN_LENGTH)
      return;
    try {
      const response = await getData(userApis.EMAIL_DUPLICATE_CHECK_API(value));
      if (response.status === 200) {
        setIsDuplicatedEmail(false);
      }
    } catch {
      setError('email', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      setIsDuplicatedEmail(true);
    }
  };

  const debounceCheckEmail = useMemo(
    () => debounce(async (value) => await checkEmail(value), 1000),
    [],
  );

  const onValid = async (data) => {
    if (isDuplicatedEmail) {
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
    ...register('email', {
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
      validate: debounceCheckEmail,
    }),
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <InputContainer>
        <ActiveInput active={true}>
          <input
            name="email"
            id="email"
            type="email"
            autoComplete="off"
            placeholder=" "
            required
            {...registers}
          />
          <label htmlFor="email">email</label>
        </ActiveInput>
        <MessageWrapper>
          <ValidationMessage text={errors?.email?.message} state={'fail'} />
          {watch().email && !errors?.email && (
            <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_EMAIL} state={'pass'} />
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
        <DefaultButton title={'변경'} type="submit" widthValue="70px" />
      </ButtonContainer>
    </FormContainer>
  );
}

export default EmaiInput;

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
