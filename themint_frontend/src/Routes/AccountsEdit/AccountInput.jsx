import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DefaultButton from '../../components/common/DefaultButton';
import ValidationMessage from '../../components/common/ValidationMessage';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { bankList } from '../../utils/constants/bankList';
import { REGEX, REGISTER_MESSAGE } from '../../utils/constants/constant';
import { ButtonContainer, FormContainer, InputContainer } from './NicknameInput';

function AccountInput({ text, setEditMode, changeInformation }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { bankCode: text[0], accountNo: text[1] }, mode: 'onChange' });

  const onValid = async (data) => {
    changeInformation(data);
  };

  const registers = {
    ...register('accountNo', {
      required: REGISTER_MESSAGE.REQUIRED_ACCOUNT,
      pattern: {
        value: REGEX.ACCOUNT,
        message: REGISTER_MESSAGE.ACCOUNT_STANDARD,
      },
    }),
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <BankInfoWrapper>
        <InputContainer>
          <Select {...register('bankCode', { required: REGISTER_MESSAGE.REQUIRED_BANKCODE })}>
            {bankList.map((bank) => (
              <option value={bank.bankCode} key={bank.bankCode}>
                {bank.bankName}
              </option>
            ))}
          </Select>
          <MessageWrapper>
            <ValidationMessage text={errors?.email?.message} state={'fail'} />
          </MessageWrapper>
        </InputContainer>
        <InputContainer>
          <ActiveInput active={true}>
            <input
              name="accountNo"
              id="accountNo"
              type="text"
              autoComplete="off"
              placeholder=" "
              required
              {...registers}
            />
            <label htmlFor="accountNo">계좌번호</label>
          </ActiveInput>
          <MessageWrapper>
            <ValidationMessage text={errors?.accountNo?.message} state={'fail'} />
          </MessageWrapper>
        </InputContainer>
      </BankInfoWrapper>
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

const Select = styled.select`
  width: 150px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.pointBlack};
  outline: none;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  padding: 0 0.5rem;
`;

const BankInfoWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 60%;
`;
