import React from 'react';
import { useForm } from 'react-hook-form';
import { MessageWrapper, WarningMessage } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import GradientButton from '../common/GradientButton';

function ThemintLogin(props) {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberId: '',
      pwd: '',
    },
  });

  const onValid = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <ActiveInput active={true}>
          <input
            name="memberId"
            id="memberId"
            type="text"
            autoComplete="off"
            {...register('memberId', {
              required: REGISTER_MESSAGE.REQUIRED_ID,
            })}
            placeholder=" "
            required
          />
          <label htmlFor="memberId">아이디</label>
        </ActiveInput>
        <MessageWrapper>
          <WarningMessage>{errors?.memberId?.message}</WarningMessage>
        </MessageWrapper>
        <ActiveInput active={true}>
          <input
            name="password"
            id="password"
            type="password"
            {...register('pwd', {
              required: REGISTER_MESSAGE.REQUIRED_PASSWORD,
            })}
            placeholder=" "
            required
          />
          <label htmlFor="password">비밀번호</label>
        </ActiveInput>
        <MessageWrapper>
          <WarningMessage>{errors?.pwd?.message}</WarningMessage>
        </MessageWrapper>
        <GradientButton text={'로그인'} type={'submit'} />
      </div>
    </form>
  );
}

export default ThemintLogin;
