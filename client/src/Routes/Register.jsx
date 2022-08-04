import React, { useState } from 'react';
import styled from 'styled-components';
import * as Common from '../style/common';
import { useForm } from 'react-hook-form';
import { ActiveInput } from '../style/style';
import ActiveInputBox from '../components/common/ActiveInputBox';
import DefaultButton from '../components/common/DefaultButton';
import { checkForDuplicates, userApis } from '../utils/api/userApi';
import debounce from '../utils/functions/debounce';
import { REGISTER_MESSAGE } from '../utils/constants/constant';

function Register(props) {
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onValid = (data) => {
    console.log(data);
  };

  const checkMemberId = async (value) => {
    console.log(value);
    try {
      const response = await checkForDuplicates(userApis.ID_DUPLICATE_CHECK_API(watch().memberId));
      if (response.status === 200) return true;
      return false;
    } catch {
      console.log('false라고 해라...');
      return false;
    }
  };

  const processChange = debounce(async (value) => await checkMemberId(value));

  return (
    <Common.Container nonMember={true}>
      회원가입
      <form onSubmit={handleSubmit(onValid)}>
        <ActiveInput active={true}>
          <input
            name="memberId"
            id="memberId"
            type="text"
            {...register('memberId', {
              required: REGISTER_MESSAGE.REQUIRED_ID,
              minLength: 6,
              maxLength: 20,
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: REGISTER_MESSAGE.ONLY_ENGLISH_AND_NUMBER,
              },
              validate: {
                duplicate: async (value) =>
                  processChange(value) ? REGISTER_MESSAGE.DUPLICATED_ID : true,
              },
            })}
            placeholder=" "
            required
          />
          <label htmlFor="memberId">아이디</label>
        </ActiveInput>
        <span>{errors?.memberId?.message}</span>
        <ActiveInput active={true}>
          <input
            name="password"
            id="password"
            type="password"
            {...register('password', { required: REGISTER_MESSAGE.REQUIRED_ID })}
            placeholder=" "
            required
          />
          <label htmlFor="password">비밀번호</label>
        </ActiveInput>
        <ActiveInput active={true}>
          <input
            name="password-check"
            id="password-check"
            type="password"
            placeholder=" "
            {...register('passwordCheck')}
            required
          />
          <label htmlFor="password">비밀번호 확인</label>
        </ActiveInput>
        <DefaultButton />
      </form>
    </Common.Container>
  );
}

export default Register;
