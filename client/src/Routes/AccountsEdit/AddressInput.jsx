import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import MintButton from '../../components/ButtonList/MintButton';
import DefaultButton from '../../components/common/DefaultButton';
import ValidationMessage from '../../components/common/ValidationMessage';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { REGISTER_MESSAGE } from '../../utils/constants/constant';
import PopupDom from '../Register/PopupDom';
import PopupPostCode from '../Register/PopupPostCode';

function AddressInput({ text, setEditMode, changeInformation }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleInput = (e) => {
    console.log(e);
  };

  const togglePostCode = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      zipCode: text[0],
      address: text[1],
      addressDetail: text[2],
    },
  });

  const onValid = async (data) => {
    await changeInformation(data);
  };

  const registers = {
    ...register('zipCode', {
      required: REGISTER_MESSAGE.REQUIRED_ADDRESS,
      onChange: (e) => handleInput(e),
    }),
  };

  return (
    <FormContainer onSubmit={handleSubmit(onValid)}>
      <InputContainer>
        <InputWrapper>
          <ActiveInput active={true}>
            <input
              name="zipCode"
              id="zipCode"
              type="text"
              autoComplete="off"
              placeholder=" "
              required
              disabled
              {...registers}
            />
            <label htmlFor="zipCode">우편번호</label>
          </ActiveInput>
          <MintButton text={'찾기'} type={'button'} onClick={togglePostCode} size={'70px'} />
          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode onClose={closePostCode} setAddress={setValue} />
              </PopupDom>
            )}
          </div>
        </InputWrapper>
        <MessageWrapper>
          <ValidationMessage text={errors?.email?.message} state={'fail'} />
          {watch().email && !errors?.email && (
            <ValidationMessage text={REGISTER_MESSAGE.VALIDATED_EMAIL} state={'pass'} />
          )}
        </MessageWrapper>
        <AddressContainer>
          <ActiveInput active={true}>
            <input
              name="address"
              id="address"
              type="text"
              disabled
              {...register('address')}
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
      </InputContainer>
      <ButtonContainer>
        <MintButton text={'취소'} type="button" size="70px" onClick={() => setEditMode(false)} />
        <MintButton text={'변경'} type="submit" size="70px" disabled={isSubmitting} />
      </ButtonContainer>
    </FormContainer>
  );
}

export default AddressInput;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const InputContainer = styled.div`
  width: 60%;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 70%;
`;
