import React from 'react';
import styled from 'styled-components';
import GradientButton from '../../components/ButtonList/GradientButton';
import { ButtonContainer } from '../AccountsPassword/AccountsPasswordPage';

function AccountsWithdrawlPage(props) {
  return (
    <Container>
      <DescriptionContainer>
        <h3>더민트(TheMint) 계정 탈퇴 전 꼭 확인해 주세요!</h3>
        더민트 계정을 탈퇴하면
        <HighLight>계정 정보 및 서비스 이용기록을 포함한 모든 정보가 삭제</HighLight>
        됩니다. <br />
        탈퇴한 후에는 더 이상 더 민트 계정으로 로그인할 수 없으므로, 더민트 계정을 사용한 사이트
        이용 및 서비스 이용을 할 수 없게 됩니다. <br />
        더민트 계정을 탈퇴하기 전 ‘프로필’메뉴에서 현재 사용 중인 서비스를 확인해 주세요. 탈퇴된
        <HighLight>
          더민트 계정 정보와 서비스 이용기록 등은 복구할 수 없으니 신중하게 선택
        </HighLight>
        하시길 바랍니다.
      </DescriptionContainer>
      <input type="checkbox" value="" />
      <label>해당 내용을 모두 확인하였으며, 회원 탈퇴에 동의 합니다.</label>
      <ButtonContainer>
        <GradientButton text={'비밀번호 변경'} type={'submit'} size={'200px'} />
      </ButtonContainer>
    </Container>
  );
}

export default AccountsWithdrawlPage;

const Container = styled.article`
  width: 100%;
  height: 100%;
`;

const HighLight = styled.span`
  color: ${(props) => props.theme.colors.pointRed};
`;

const DescriptionContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainBlack};
`;
