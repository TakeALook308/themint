import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myInformationState } from '../../../atoms';
import useLogout from '../../../utils/hooks/useLogout';

function SubMenu(props) {
  const myInformation = useRecoilValue(myInformationState);
  const logout = useLogout();
  return (
    <>
      <Item>
        <Link to={`profile/${myInformation.memberSeq}`}>프로필</Link>
      </Item>
      <Item>
        <Link to="/accounts/edit">정보 수정</Link>
      </Item>
      <Item>
        <LogoutButton onClick={logout} type="button">
          로그아웃
        </LogoutButton>
      </Item>
    </>
  );
}

export default SubMenu;

const Item = styled.li`
  text-align: center;
  padding: 0.25rem;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.1s ease-in;
  color: ${(props) => props.theme.colors.white};
  &:hover {
    background-color: ${(props) => props.theme.colors.pointGray};
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.p};
  font-weight: bold;
`;
