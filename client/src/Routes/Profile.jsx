import React from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import ProfileReviews from './ProfileReviews';
import ProfileSalesHistory from './ProfileSalesHistory';
import ProfilePurchaseHistory from './ProfilePurchaseHistory';
import ProfileInterests from './ProfileInterests';

function Profile(props) {
  return (
    <Container>
      <Header>
        <NavStyle
          className={(props) => {
            return `${props.isActive ? 'isActive ' : ''}iconContainer`;
          }}
          end
          to="">
          리뷰
        </NavStyle>
        <NavStyle to="saleshistory">판매내역</NavStyle>
        <NavStyle to="purchasehistory">구매내역</NavStyle>
        <NavStyle to="interest">관심</NavStyle>
      </Header>
      <hr />
      <main>
        <Outlet />
      </main>
    </Container>
  );
}

export default Profile;
const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 1px;
`;

const Header = styled.header`
  margin-bottom: 1.25rem;
  margin-top: 70px;
`;

const NavStyle = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  width: 252px;
  height: 70px;
  font-size: 20px;
  font-weight: 400;
  margin: 2px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.mainBlack};

  outline: invert;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.mainMint};
  }
  &.active {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.subMint};
    position: relative;
    font-weight: bold;
  }
  > p {
    margin-top: 20px;
  }
`;
