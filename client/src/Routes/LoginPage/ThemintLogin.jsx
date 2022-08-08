import React from 'react';
import { useForm } from 'react-hook-form';
import { session } from '../../App';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { LOGIN_MESSAGE, REGISTER_MESSAGE } from '../../utils/constants/constant';
import GradientButton from '../../components/ButtonList/GradientButton';
import ValidationMessage from '../../components/common/ValidationMessage';

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

  const onValid = async (data) => {
    try {
      const response = await login.login(data);
      const {
        data: { memberId, memberSeq, nickname, accessToken },
      } = response;
      login.setUserInfo({ memberId, memberSeq, nickname });
      login.setToken({ accessToken });
      login.moveToMain(nickname);
      login.setLogged(true);
      session.set('profile', { memberId, memberSeq, nickname });
    } catch (err) {
      if (err.response.status === 409) {
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
