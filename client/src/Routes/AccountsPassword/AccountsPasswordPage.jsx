import React, { useRef } from 'react';
import styled from 'styled-components';
import ActiveInputBox from '../../components/common/ActiveInputBox';
import { ActiveInput } from '../../style/style';
import GradientButton from '../../components/ButtonList/GradientButton';
import { useForm } from 'react-hook-form';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';
import { REGEX, REGISTER_MESSAGE } from '../../utils/constants/constant';
import { MessageWrapper } from '../../style/common';
import ValidationMessage from '../../components/common/ValidationMessage';
import { errorToast, successToast } from '../../lib/toast';

function AccountsPasswordPage() {
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      pwd: '',
      pwdCheck: '',
    },
    mode: 'onChange',
  });

  const password = useRef({});
  password.current = watch('pwd', '');

  const getData = async (data) => {
    await fetchData.patch(userApis.PASSWORD, data);
  };

  const pwdRegister = {
    ...register('pwd', {
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
    }),
  };

  const pwdCheckRegister = {
    ...register('pwdCheck', {
      required: REGISTER_MESSAGE.REQUIRED_PASSWORD_CHECK,
      validate: {
        passwordMatch: (value) =>
          value !== password.current ? REGISTER_MESSAGE.PASSWORD_CHECK : true,
      },
    }),
  };

  const onValid = async (data) => {
    try {
      const body = { pwd: data.pwd };
      const response = await fetchData.patch(userApis.PASSWORD, body);
      if (response.status === 200) {
        successToast();
      }
    } catch (err) {}
  };

  return (
    <Container>
      <PasswordDescriptionContainer>
        <li>비밀번호는 8~32 자의 영문 대소문자, 숫자, 특수문자를 조합하여 설정해 주세요.</li>
        <li>
          안전을 위해 자주 사용했거나 쉬운 비밀번호가 아닌 새 비밀번호를 등록하고, 주기적으로 변경해
          주세요.
        </li>
      </PasswordDescriptionContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputContainer>
          <label htmlFor="pwd">새 비밀번호</label>
          <InputMessageContainer>
            <ActiveInputBox
              type="password"
              id="pwd"
              name="pwd"
              placeholder={'새로운 비밀번호를 입력하세요.'}
              register={pwdRegister}
            />
            <MessageWrapper>
              <ValidationMessage text={errors?.pwd?.message} state={'fail'} />
            </MessageWrapper>
          </InputMessageContainer>
        </InputContainer>

        <InputContainer>
          <label htmlFor="pwdCheck">새 비밀번호 확인</label>
          <InputMessageContainer>
            <ActiveInputBox
              type="password"
              id="pwdCheck"
              name="pwdCheck"
              placeholder={'새로운 비밀번호를 다시 입력하세요.'}
              register={pwdCheckRegister}
            />
            <MessageWrapper>
              <ValidationMessage text={errors?.pwdCheck?.message} state={'fail'} />
            </MessageWrapper>
          </InputMessageContainer>
        </InputContainer>
        <ButtonContainer>
          <GradientButton text={'비밀번호 변경'} type={'submit'} size={'200px'} />
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default AccountsPasswordPage;

export const Container = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const PasswordDescriptionContainer = styled.ul`
  color: ${(props) => props.theme.colors.pointRed};
  line-height: 1.7;
  list-style-type: disc;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 70%;
  > label {
    padding-top: 0.5rem;
    width: 30%;
  }
`;

export const ButtonContainer = styled.div`
  margin: 0 auto;
`;

const InputMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
