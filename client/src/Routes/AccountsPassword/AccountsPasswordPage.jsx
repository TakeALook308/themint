import React from 'react';
import styled from 'styled-components';
import ActiveInputBox from '../../components/common/ActiveInputBox';
import { ActiveInput } from '../../style/style';
import GradientButton from '../../components/ButtonList/GradientButton';
import { useForm } from 'react-hook-form';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';

function AccountsPasswordPage() {
  const { register } = useForm({});

  const getDate = async (data) => {
    await fetchData.patch(userApis.PASSWORD, data);
  };
  return (
    <Container>
      <PasswordDescriptionContainer>
        <p>· 비밀번호는 8~32 자의 영문 대소문자, 숫자, 특수문자를 조합하여 설정해 주세요.</p>
        <p>
          · 안전을 위해 자주 사용했거나 쉬운 비밀번호가 아닌 새 비밀번호를 등록하고, 주기적으로
          변경해 주세요.
        </p>
      </PasswordDescriptionContainer>
      <Form>
        <InputContainer>
          <label htmlFor="pastPassword">현재 비밀번호</label>
          <ActiveInputBox
            type="password"
            id="pastPassword"
            name="pastPassword"
            placeholder={'현재 비밀번호를 입력해주세요.'}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="newPassword">새 비밀번호</label>
          <ActiveInputBox
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder={'새로운 비밀번호를 입력하세요.'}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
          <ActiveInputBox
            type="password"
            id="newPasswordCheck"
            name="newPasswordCheck"
            placeholder={'새로운 비밀번호를 다시 입력하세요.'}
          />
        </InputContainer>
        <ButtonContainer>
          <GradientButton text={'비밀번호 변경'} type={'submit'} size={'200px'} />
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default AccountsPasswordPage;

const Container = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const PasswordDescriptionContainer = styled.div`
  color: ${(props) => props.theme.colors.pointRed};
  line-height: 1.7;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  > label {
    width: 40%;
  }
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
`;
