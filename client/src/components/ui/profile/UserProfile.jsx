import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function ProfileCard() {
  const member = {
    seq: 1,
    nickname: '미노',
    profileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiGVRNg8egZNHf7d7-jeEA3JKgNTkStDZPQ&usqp=CAU',
    score: 100,
  };
  return (
    <Wrapper>
      <ProfileImgContainer>
        <ProfileImg>
          <div>
            <picture>
              <img src={member.profileUrl} alt="유저 프로필" width="168" height="168" />
            </picture>
          </div>
        </ProfileImg>
      </ProfileImgContainer>
      <ProfileArticle>
        <p>{member.nickname}</p>
        <p>신뢰도 점수: {member.score}</p>
        <StyledLink to="/talks/:userId">1:1 채팅</StyledLink>
      </ProfileArticle>
    </Wrapper>
  );
}

export default ProfileCard;
const Wrapper = styled.div`
  width: 100%;
  height: 400px;
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
`;

const StyledLink = styled(Link)`
  padding: 3px 6px 3px 6px;
  color: ${(props) => props.theme.colors.mainBlack};
  background-color: ${(props) => props.theme.colors.subMint};
  border-radius: 5px;
  font-weight: bold;
`;
