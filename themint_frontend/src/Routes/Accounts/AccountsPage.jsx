import React, { Suspense } from 'react';
import { useQuery } from 'react-query';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AccountsEdit, AccountsPassword, AccountsPhoneNumber, AccountsWithdrawl } from '..';
import { myInformationState } from '../../atoms';
import { Container } from '../../style/common';
import { fetchData } from '../../utils/apis/api';
import { userApis } from '../../utils/apis/userApis';

function AccountsPage() {
  const myInformation = useRecoilValue(myInformationState);
  const getUserInfo = async () => {
    const response = await fetchData.get(userApis.USER_INFORMATION(myInformation?.memberSeq));
    return response?.data;
  };

  const {} = useQuery(['userInformation'], getUserInfo);

  return (
    <GridContainer>
      <article>
        <PageTitle>정보 수정</PageTitle>
      </article>
      <TabAndNestedSection>
        <ul>
          <li>
            <NavStyle to="edit">회원 정보</NavStyle>
          </li>
          <li>
            <NavStyle to="password">비밀번호 변경</NavStyle>
          </li>
          <li>
            <NavStyle to="phone-number">전화번호 인증</NavStyle>
          </li>
          <li>
            <NavStyle to="withdrawl">회원 탈퇴</NavStyle>
          </li>
        </ul>
        <article>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="edit" element={<AccountsEdit />} />
              <Route path="password" element={<AccountsPassword />} />
              <Route path="phone-number" element={<AccountsPhoneNumber />} />
              <Route path="withdrawl" element={<AccountsWithdrawl />} />
            </Routes>
          </Suspense>
        </article>
      </TabAndNestedSection>
    </GridContainer>
  );
}

export default AccountsPage;

const GridContainer = styled(Container)`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
`;

const PageTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.page};
  font-weight: bold;
`;

const TabAndNestedSection = styled.section`
  display: flex;
  gap: 2rem;
  & > ul {
    width: 200px;
  }
  & > article {
    width: calc(100% - 200px);
  }
`;

const NavStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 1rem;
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 50px;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.mainBlack};
  border-radius: 5px;

  outline: invert;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.subMint};
  }
  &.active {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.subMint};
    color: ${(props) => props.theme.colors.mainBlack};

    position: relative;
    font-weight: bold;
  }
`;
