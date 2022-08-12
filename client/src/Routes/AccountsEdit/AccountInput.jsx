import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import DefaultButton from '../../components/common/DefaultButton';
import ValidationMessage from '../../components/common/ValidationMessage';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { bankList } from '../../utils/constants/bankList';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import debounce from '../../utils/functions/debounce';
import { ButtonContainer, FormContainer, InputContainer } from './NicknameInput';

function AccountInput({ text, setEditMode, changeInformation }) {
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
      const response = await fetchData.get(userApis.EMAIL_DUPLICATE_CHECK_API(value));
      if (response.status === 200) {
        setIsDuplicatedEmail(false);
        return true;
      }
    } catch {
      setError('email', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
      setIsDuplicatedEmail(true);
      return false;
    }
  };

  const debounceCheckEmail = useMemo(
    () => debounce(async (value) => await checkEmail(value), 700),
    [],
  );

  const onValid = async (data) => {
    if (isDuplicatedEmail) {
      setError('email', { message: REGISTER_MESSAGE.DUPLICATED_EMAIL }, { shouldFocus: true });
      return;
    }
    setTimeout(() => changeInformation(data), 1000);
  };

  const registers = {
    ...register('account', {
      required: REGISTER_MESSAGE.REQUIRED_EMAIL,
      pattern: {
        value: REGEX.EMAIL,
        message: REGISTER_MESSAGE.EMAIL_STANDARD,
      },
      validate: debounceCheckEmail,
    }),
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <InputContainer>
        <select {...register('bankCode')}>
          {bankList.map((bank) => (
            <option value={bank.bankCode} key={bank.bankCode}>
              {bank.bankName}
            </option>
          ))}
        </select>
        <MessageWrapper>
          <ValidationMessage text={errors?.email?.message} state={'fail'} />
          {watch().email && !errors?.email && (
            <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_EMAIL} state={'pass'} />
          )}
        </MessageWrapper>
      </InputContainer>
      <InputContainer>
        <ActiveInput active={true}>
          <input
            name="account"
            id="account"
            type="text"
            autoComplete="off"
            placeholder=" "
            required
            {...registers}
          />
          <label htmlFor="account">계좌번호</label>
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
        <DefaultButton title={'변경'} type="submit" widthValue="70px" disabled={isSubmitting} />
      </ButtonContainer>
    </FormContainer>
  );
}

export default AccountInput;
