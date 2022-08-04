import React, { useState } from 'react';
import styled from 'styled-components';
import * as Common from '../style/common';
import { useForm } from 'react-hook-form';
import { ActiveInput } from '../style/style';
import ActiveInputBox from '../components/common/ActiveInputBox';
import DefaultButton from '../components/common/DefaultButton';

function Register(props) {
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not the same' },
        { shouldFocus: true }, // error일 경우 자동 focus
      );
    }
  };
  console.log(watch().id);
  return (
    <Common.Container nonMember={true}>
      회원가입
      <form>
        <ActiveInput active={true}>
          <input
            name="id"
            id="id"
            type="text"
            {...register('id', {
              required: '아이디를 입력해주세요.',
            })}
            placeholder=" "
            required
          />
          <label htmlFor="id">아이디</label>
        </ActiveInput>
        <ActiveInput active={true}>
          <input
            name="password"
            id="password"
            type="password"
            {...register('password', { required: '비밀번호를 입력해주세요.' })}
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
