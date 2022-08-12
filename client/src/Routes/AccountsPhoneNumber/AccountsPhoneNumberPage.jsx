import React from 'react';
import styled from 'styled-components';
import GradientButton from '../../components/ButtonList/GradientButton';
import ActiveInputBox from '../../components/common/ActiveInputBox';
import {
  ButtonContainer,
  Container,
  Form,
  InputContainer,
} from '../AccountsPassword/AccountsPasswordPage';

function AccountsPhoneNumberPage(props) {
  return (
    <Container>
      <PhoneNumberDescriptionContainer>
        <li> 더민트 이용을 위해서는 반드시 핸드폰 인증이 필요합니다.</li>
        <li> 더민트 계정에서는 하나의 계정에 하나의 핸드폰 번호만 이용 가능합니다.</li>
        <li>
          더민트 계정에서 핸드폰 번호를 변경하고 싶으신 경우 새로운 핸드폰 번호로 인증 받으셔야
          합니다.
        </li>
      </PhoneNumberDescriptionContainer>
      <Form>
        <InputContainer>
          <label htmlFor="pastPassword">전화번호</label>
          <ActiveInputBox
            type="password"
            id="pastPassword"
            name="pastPassword"
            placeholder={'현재 비밀번호를 입력해주세요.'}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="newPassword">인증코드</label>
          <ActiveInputBox
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder={'새로운 비밀번호를 입력하세요.'}
          />
        </InputContainer>
        <ButtonContainer>
          <GradientButton text={'전화번호 변경'} type={'submit'} size={'200px'} />
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default AccountsPhoneNumberPage;

const PhoneNumberDescriptionContainer = styled.ol`
  color: ${(props) => props.theme.colors.pointRed};
  line-height: 1.7;
  list-style-type: decimal;
`;
