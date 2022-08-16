import React from 'react';
import { useForm } from 'react-hook-form';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { LOGIN_MESSAGE, REGISTER_MESSAGE } from '../../utils/constants/constant';
import GradientButton from '../../components/ButtonList/GradientButton';
import ValidationMessage from '../../components/common/ValidationMessage';
import useSetLoggedIn from '../../utils/hooks/useLogin';

function ThemintLogin({ login }) {
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

  const setLoggedIn = useSetLoggedIn();

  const onValid = async (data) => {
    try {
      await setLoggedIn(login, data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 409) {
        setError('memberId', { message: LOGIN_MESSAGE.FAILED_LOGIN });
        return;
      }
      if (err.response.status === 404) {
        setError('memberId', { message: LOGIN_MESSAGE.FAILED_LOGIN });
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <ActiveInput active={true}>
          <input
            name="memberId"
            id="memberId"
            type="text"
            {...register('memberId', {
              required: REGISTER_MESSAGE.REQUIRED_ID,
            })}
            placeholder=" "
            required
          />
          <label htmlFor="memberId">아이디</label>
        </ActiveInput>
        <MessageWrapper>
          <ValidationMessage text={errors?.memberId?.message} state={'fail'} />
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
          <ValidationMessage text={errors?.pwd?.message} state={'fail'} />
        </MessageWrapper>
        <GradientButton text={'로그인'} type={'submit'} />
      </div>
    </form>
  );
}

export default ThemintLogin;
