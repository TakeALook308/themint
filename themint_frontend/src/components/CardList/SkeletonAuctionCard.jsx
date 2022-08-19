import React from 'react';
import styled, { keyframes } from 'styled-components';

function SkeletonAuctionCard() {
  return (
    <CardContainer as="article">
      <div>
        <div>
          <div>
            <div>
              <ShineBox></ShineBox>
              <ShineBox></ShineBox>
            </div>
            <ShineBox>
              <div>
                <div></div>
              </div>
            </ShineBox>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

export default SkeletonAuctionCard;

const shine = keyframes`
    to {
    background-position: 100% 0;
  }
`;

const ShineBox = styled.div`
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: ${shine} 2s infinite;
`;

const CardContainer = styled(ShineBox)`
  position: relative;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  > div {
    width: 100%;
    padding-top: 75%;
    position: relative;
    > div {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      > div {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 33%;
        background: linear-gradient(
          1.15deg,
          #0d0c0f 1.06%,
          rgba(13, 12, 15, 0.73) 54.67%,
          rgba(13, 12, 15, 0) 99.1%
        );
        display: flex;
        flex-direction: row;
        padding: 20px;
        justify-content: space-between;
        align-items: center;
        > div {
          &:first-child {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 100%;
            width: 80%;
            gap: 10px;
            > div {
              background-color: ${(props) => props.theme.colors.textGray};
              &:first-child {
                width: 100%;
                height: 100%;
                background-size: 100px 500px;
              }
              &:last-child {
                width: 50%;
                height: 100%;
                background-size: 50px 500px;
              }
            }
          }
          &:last-child {
            position: relative;
            width: 15%;
            background-color: ${(props) => props.theme.colors.textGray};
            border-radius: 50%;
            background-size: 30px 500px;
            > div {
              position: relative;
              width: 100%;
              padding-top: 100%;
              > div {
                position: absolute;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
`;
