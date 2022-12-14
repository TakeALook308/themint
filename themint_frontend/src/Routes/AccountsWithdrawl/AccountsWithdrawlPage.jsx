import React, { useState } from 'react';
import styled from 'styled-components';
import GradientButton from '../../components/ButtonList/GradientButton';
import useLogout from '../../utils/hooks/useLogout';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';

function AccountsWithdrawlPage() {
  const [withdrawn, setWithdrawn] = useState('false');

  const onChangeWithdrawl = (e) => {
    setWithdrawn(e.target.value);
  };

  const logout = useLogout();

  const withdraw = async () => {
    await fetchData.patch(userApis.DELETE_USER);
    logout({ type: 'withdrawl' });
  };

  const onSubmit = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      withdraw();
    }
  };
  return (
    <Container>
      <DescriptionContainer>
        <H3>더민트(TheMint) 계정 탈퇴 전 꼭 확인해 주세요!</H3>
        <br />
        더민트 계정을 탈퇴하면 &nbsp;
        <HighLight>계정 정보 및 서비스 이용기록을 포함한 모든 정보가 삭제</HighLight>
        됩니다. <br />
        탈퇴한 후에는 더 이상 더 민트 계정으로 로그인할 수 없으므로, 더민트 계정을 사용한 사이트
        이용 및 서비스 이용을 할 수 없게 됩니다. <br />
        <br />
        더민트 계정을 탈퇴하기 전 ‘프로필’ 메뉴에서 현재 사용 중인 서비스를 확인해 주세요. 탈퇴된
        &nbsp;
        <HighLight>
          더민트 계정 정보와 서비스 이용기록 등은 복구할 수 없으니 신중하게 선택
        </HighLight>
        하시길 바랍니다.
        <br />
        <br />
        회원 탈퇴 후 재가입이 불가능합니다.
      </DescriptionContainer>
      <FieldSet>
        <A11yHidden>탈퇴 동의 여부</A11yHidden>
        <div>
          <input
            type="radio"
            name="withdrawl"
            value="true"
            id="true"
            checked={withdrawn === 'true' ? true : false}
            onChange={onChangeWithdrawl}
          />
          <label htmlFor="true">해당 내용을 모두 확인하였으며, 회원 탈퇴에 동의 합니다.</label>
        </div>
        <div>
          <input
            type="radio"
            id="false"
            name="withdrawl"
            value="false"
            checked={withdrawn === 'false' ? true : false}
            onChange={onChangeWithdrawl}
          />
          <label htmlFor="false">회원 탈퇴에 동의하지 않습니다.</label>
        </div>
      </FieldSet>

      <ButtonContainer>
        <GradientButton
          text={'확인'}
          type={'button'}
          onClick={onSubmit}
          size={'200px'}
          disabled={withdrawn === 'false'}
        />
      </ButtonContainer>
    </Container>
  );
}

export default AccountsWithdrawlPage;

const Container = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const H3 = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.h5};
  line-height: 1;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const HighLight = styled.span`
  color: ${(props) => props.theme.colors.pointRed};
  font-weight: bold;
`;

const DescriptionContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mainBlack};
  padding: 1rem 0.5rem;
  line-height: 1.5;
  border-radius: 2px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const FieldSet = styled.fieldset`
  font-size: ${(props) => props.theme.fontSizes.p};
  line-height: 1.5;
`;

const A11yHidden = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;
