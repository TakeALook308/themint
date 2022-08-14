import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function ProfileSearchCard({ auction, func }) {
  // TODO: 데이터 교체하기
  const [statusNum, setStatusNum] = useState(0);
  return (
    <CardContainer>
      <Link to={`/profile/${auction?.memberSeq}`}>
        <ProfileImgContainer>
          <ProfileImg>
            <div>
              <picture>
                {auction.profileUrl ? (
                  <img
                    src={process.env.REACT_APP_IMAGE_URL + auction.profileUrl}
                    alt="유저 프로필"
                    width="168"
                    height="168"
                  />
                ) : null}
              </picture>
            </div>
          </ProfileImg>
        </ProfileImgContainer>

        <ProfileArticle>
          <p>{auction.nickname}</p>
          <span>민트지수 {auction.score}</span>
        </ProfileArticle>
      </Link>
    </CardContainer>
  );
}

export default ProfileSearchCard;

const CardContainer = styled.article`
  position: relative;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease-in;
  &:hover {
    transform: scale(1.03);
  }
  > div {
    width: 100%;
    padding-top: 75%;
    position: relative;
    a {
      &:first-child {
        > div {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          > picture {
            position: relative;
            width: 100%;
            height: 100%;
            > img {
              position: relative;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      &:last-child {
        position: absolute;
        bottom: 20px;
        right: 5%;
        width: 15%;
        border: 2px solid transparent;
        overflow: hidden;
        border-radius: 50%;
        background-image: ${(props) =>
          `linear-gradient(#fff, #fff), linear-gradient(to right, ${props.theme.colors.mainMint} 0%, ${props.theme.colors.subMint} 100%)`};
        background-origin: border-box;
        background-clip: content-box, border-box;
        > div {
          position: relative;
          width: 100%;
          padding-top: 100%;
          picture {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
`;

const ProfileImgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProfileImg = styled.main`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 50%;
  border: 2px solid transparent;
  overflow: hidden;
  border-radius: 50%;
  background-image: ${(props) =>
    `linear-gradient(#fff, #fff), linear-gradient(to right, ${props.theme.colors.mainMint} 0%, ${props.theme.colors.subMint} 100%)`};
  background-origin: border-box;
  background-clip: content-box, border-box;
  > div {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 100%;
    picture {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const ProfileArticle = styled.article`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  height: 100px;
  > p {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;
