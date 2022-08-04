import React, { useState } from 'react';
import styled from 'styled-components';
import * as Common from '../style/common';
import { useForm } from 'react-hook-form';
import { ActiveInput } from '../style/style';
import ActiveInputBox from '../components/common/ActiveInputBox';
import DefaultButton from '../components/common/DefaultButton';
import { getData, userApis } from '../utils/api/userApi';
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

  const checkMemberId = async (e) => {
    const { target } = e;
    if (!target?.value) return;
    try {
      const response = await getData(userApis.ID_DUPLICATE_CHECK_API(target?.value));
      if (response.status === 200) return true;
    } catch {
      setError('memberId', { message: REGISTER_MESSAGE.DUPLICATED_ID }, { shouldFocus: true });
    }
  };

  const onIdChange = async (value) => {
    processChange(value);
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
            maxLength={20}
            minLength={5}
            {...register('memberId', {
              required: REGISTER_MESSAGE.REQUIRED_ID,
              minLength: {
                value: 6,
                message: REGISTER_MESSAGE.ID_LENGTH,
              },
              maxLength: {
                value: 20,
                message: REGISTER_MESSAGE.ID_LENGTH,
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: REGISTER_MESSAGE.ONLY_ENGLISH_AND_NUMBER,
              },
              // validate: {
              //   duplicate: async (value) =>
              //     checkMemberId(value) ? REGISTER_MESSAGE.DUPLICATED_ID : true,
              // },
            })}
            onChange={onIdChange}
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
