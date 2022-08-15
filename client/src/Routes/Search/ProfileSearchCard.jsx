import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function ProfileSearchCard({ auction }) {
  return (
    <CardContainer>
      <div>
        <Link to={`/profile/${auction?.memberSeq}`}>
          <div>
            <ProfileImgContainer>
              <ProfileImg>
                <div>
                  <picture>
                    {auction.profileUrl ? (
                      <img
                        src={process.env.REACT_APP_IMAGE_URL + auction.profileUrl}
                        alt="유저 프로필"
                        width="400"
                        height="400"
                      />
                    ) : null}
                  </picture>
                </div>
              </ProfileImg>
            </ProfileImgContainer>
            <ProfileArticle>
              <p>{auction.nickname}</p>
              <p>민트지수 {auction.score}</p>
            </ProfileArticle>
          </div>
        </Link>
      </div>
    </CardContainer>
  );
}

export default ProfileSearchCard;

const CardContainer = styled.article`
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s ease-in;
  background: rgba(73, 73, 73, 0.35);
  box-shadow: 0 8px 32px 0 rgba(21, 47, 37, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  &:hover {
    transform: scale(1.03);
  }
  > div {
    width: 100%;
    padding-top: 100%;
    position: relative;
  }
  a {
    > div {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const ProfileImgContainer = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 5px solid transparent;
  border-radius: 50%;
  background-image: ${(props) =>
    `linear-gradient(#fff, #fff), linear-gradient(to right, ${props.theme.colors.mainMint} 0%, ${props.theme.colors.subMint} 100%)`};
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
      object-fit: contain;
      background-color: ${(props) => props.theme.colors.textGray};
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;

const ProfileArticle = styled.article`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  height: 40%;
  > p {
    &:first-child {
      font-size: 24px;
      font-weight: bold;
    }
    &:last-child {
      font-size: ${(props) => props.theme.fontSizes.p};
      font-weight: bold;
    }
  }
`;
