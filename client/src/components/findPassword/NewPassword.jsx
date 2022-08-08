import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { REGEX, REGISTER_MESSAGE, STANDARD } from '../../utils/constants/constant';
import GradientButton from '../common/GradientButton';
import ValidationMessage from '../common/ValidationMessage';

function NewPassword(props) {
  const {
    handleSubmit,
    register,
    watch,
    stateForm: { errors },
  } = useForm({});

  const password = useRef({});
  password.current = watch('password', '');

  const onValid = () => {};
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <ActiveInput active={true}>
          <input
            name="password"
            id="password"
            type="password"
            maxLength={STANDARD.ID_MAX_LENGTH}
            minLength={STANDARD.ID_MIN_LENGTH}
            {...register('pwd', {
              required: REGISTER_MESSAGE.REQUIRED_PASSWORD,
              minLength: {
                value: 8,
                message: REGISTER_MESSAGE.PASSWORD_STANDARD,
              },
              maxLength: {
                value: 20,
                message: REGISTER_MESSAGE.PASSWORD_STANDARD,
              },
              pattern: {
                value: REGEX.PASSWORD,
                message: REGISTER_MESSAGE.PASSWORD_STANDARD,
              },
            })}
            placeholder=" "
            required
          />
          <label htmlFor="password">비밀번호</label>
        </ActiveInput>
        <MessageWrapper>
          <ValidationMessage text={errors?.pwd?.message} state={'fail'} />
        </MessageWrapper>
        <ActiveInput active={true}>
          <input
            name="password-check"
            id="password-check"
            type="password"
            placeholder=" "
            {...register('passwordCheck', {
              required: REGISTER_MESSAGE.REQUIRED_PASSWORD_CHECK,
              validate: {
                passwordMatch: (value) =>
                  value !== password.current ? REGISTER_MESSAGE.PASSWORD_CHECK : true,
              },
            })}
            required
          />
          <label htmlFor="password">비밀번호 확인</label>
        </ActiveInput>
        <MessageWrapper>
          <ValidationMessage text={errors?.passwordCheck?.message} state={'fail'} />
        </MessageWrapper>
        <GradientButton text={'비밀번호 재설정'} type={'submit'} />
      </div>
    </form>
  );
}

export default NewPassword;
