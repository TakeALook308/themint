import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../style/common';
import logo from '../assets/images/themint.png';

function NotFound() {
  return (
    <Container>
      <NotFoundContainer id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name changed or is
            temporarily unavailable.
          </p>
          <Link to="#">Go To Homepage</Link>
        </div>
      </NotFoundContainer>
    </Container>
  );
}

export default NotFound;

const NotFoundContainer = styled.div`
  position: relative;
  height: 100vh;
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
      > h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 230px;
        margin: 0px;
        font-weight: 900;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        background: url('../assets/images/bg.jpg') no-repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: cover;
        background-position: center;
      }
    }
    > h2 {
      font-family: 'Montserrat', sans-serif;
      color: #000;
      font-size: 24px;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 0;
    }
    > p {
      font-family: 'Montserrat', sans-serif;
      color: #000;
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
      background: #0046d5;
      display: inline-block;
      padding: 15px 30px;
      border-radius: 40px;
      color: #fff;
      font-weight: 700;
      -webkit-box-shadow: 0px 4px 15px -5px #0046d5;
      box-shadow: 0px 4px 15px -5px #0046d5;
    }
  }
`;
