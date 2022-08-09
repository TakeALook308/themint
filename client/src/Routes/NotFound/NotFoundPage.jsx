import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import back from '../../assets/images/bg.jpg';

function NotFoundPage() {
  return (
    <NotFoundContainer>
      <div>
        <div>
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          <br /> 입력하신 주소가 정확한지 다시한번 확인해주세요.
        </p>
        <Link to="main">메인 페이지로 이동하기</Link>
      </div>
    </NotFoundContainer>
  );
}

export default NotFoundPage;

const NotFoundContainer = styled.div`
  position: relative;
  height: calc(100vh - 261px);
  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-width: 410px;
    width: 100%;
    text-align: center;
    > div {
      height: 280px;
      position: relative;
      z-index: -1;
      font-family: 'Montserrat', sans-serif;
      color: ${(props) => props.theme.colors.white};
      > h1 {
        font-size: 230px;
        margin: 0px;
        font-weight: 900;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        background: url(${back}) no-repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: cover;
        background-position: center;
      }
    }
    > h2 {
      font-size: 24px;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 0;
    }
    > p {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 20px;
      margin-top: 0px;
    }
    > a {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      text-decoration: none;
      text-transform: uppercase;
      background: ${(props) => props.theme.colors.gradientMintToPurple};
      display: inline-block;
      padding: 15px 30px;
      border-radius: 40px;
      color: #fff;
      font-weight: 700;
    }
  }
`;
