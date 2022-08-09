import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled, { css, keyframes } from 'styled-components';
import { MessageWrapper } from '../../style/common';
import { ActiveInput } from '../../style/style';
import { getData, postData } from '../../utils/api/api';
import { userApis } from '../../utils/api/userApi';
import { REGEX, REGISTER_MESSAGE } from '../../utils/constants/constant';
import GradientButton from '../../components/ButtonList/GradientButton';
import MintButton from '../../components/ButtonList/MintButton';
import ValidationMessage from '../../components/common/ValidationMessage';
import { errorToast, successToast } from '../../lib/toast';

function EmailCheck({ memberId, setMemberId, setIsPassed }) {
  const [email, setEmail] = useState('');
  const [isEmailed, setIsEmailed] = useState(false);
  const [authNum, setAuthNum] = useState();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({});

  const id = useRef({});
  id.current = watch('memberId', '');
  const auth = useRef({});
  auth.current = watch('email', '');

  useEffect(() => {
    if (!memberId || !auth) return;
    (async () => {
      try {
        const response = await postData(userApis.AUTH_EMAIL, { memberId, email: auth.current });
        if (response.status === 200) {
          setIsEmailed(true);
          setAuthNum(String(response.data?.randNum));
        }
      } catch (err) {
        errorToast('아이디 또는 이메일을 확인해주세요.');
      }
    })();
  }, [memberId]);

  const onValid = () => {
    trigger('authNumber');
    if (errors?.authNumber) return;
    setIsPassed(true);
    successToast(REGISTER_MESSAGE.VALIDATED_EMAIL_AUTH);
  };

  const sendAuthNumber = () => {
    trigger('memberId');
    trigger('email');
    if (errors?.memberId) return;
    if (errors?.email) return;
    if (auth.current === email) return;
    setEmail(auth.current);
    setMemberId(id.current);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <InputContainer>
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
        </InputContainer>
        <MessageWrapper>
          <ValidationMessage text={errors?.memberId?.message} state={'fail'} />
        </MessageWrapper>
        <InputContainer>
          <ActiveInput active={true}>
            <input
              name="email"
              id="email"
              type="email"
              {...register('email', {
                required: REGISTER_MESSAGE.REQUIRED_EMAIL,
                pattern: {
                  value: REGEX.EMAIL,
                  message: REGISTER_MESSAGE.EMAIL_STANDARD,
                },
              })}
              placeholder=" "
              required
            />
            <label htmlFor="email">email</label>
          </ActiveInput>
          <MintButton text={'인증'} type={'button'} onClick={sendAuthNumber} />
        </InputContainer>
        <MessageWrapper>
          {!watch().email && !errors?.email && (
            <ValidationMessage text={REGISTER_MESSAGE.REGISTER_EMAIL} />
          )}
          <ValidationMessage text={errors?.email?.message} state={'fail'} />
        </MessageWrapper>
        {isEmailed && (
          <NoticeContainer isEmailed={isEmailed}>
            <Email>{email}</Email>로 <br /> 비밀번호 재설정을 위한 <br /> 인증번호를 전송했습니다.{' '}
            <br />
            비밀번호 재설정을 원하는 경우 <br /> 아래에 인증번호를 입력해주세요.
          </NoticeContainer>
        )}
        <ActiveInput active={true}>
          <input
            name="authNumber"
            id="authNumber"
            type="text"
            {...register('authNumber', {
              required: REGISTER_MESSAGE.REQUIRED_EMAIL_AUTH,
              validate: (value) => (value !== authNum ? REGISTER_MESSAGE.FAILED_EMAIL_AUTH : true),
            })}
            placeholder=" "
            required
          />
          <label htmlFor="authNumber">인증번호</label>
        </ActiveInput>
        <MessageWrapper>
          <ValidationMessage text={errors?.authNumber?.message} state={'fail'} />
        </MessageWrapper>
        <GradientButton text={'인증번호 확인하기'} type={'submit'} />
      </div>
    </form>
  );
}

export default EmailCheck;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  div {
    flex: 0 1 100%;
  }
  button {
    flex: 0 1 20%;
  }
`;

const lengthen = keyframes`
  0% {
    max-height: 0px
  }
  50% {
    padding: 1rem 0;
    max-height: 100px;
  }
  100% {
    padding: 1rem 0;
    max-height: 200px;
  }
`;

const NoticeContainer = styled.article`
  width: 100%;
  text-align: center;
  background-color: ${(props) => props.theme.colors.pointGray};
  margin-bottom: 2rem;
  border-radius: 5px;
  backdrop-filter: blur(2px);
  max-height: 0;
  overflow: hidden;
  ${(props) =>
    props.isEmailed &&
    css`
      animation: ${lengthen} 0.5s forwards linear;
    `}
`;

const Email = styled.span`
  color: ${(props) => props.theme.colors.mainBlack};
  font-weight: bold;
`;
