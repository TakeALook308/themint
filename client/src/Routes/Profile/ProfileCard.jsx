import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myInformationState } from '../../atoms';
import { fetchData } from '../../utils/apis/api';
import { socketApis } from '../../utils/apis/socketApis';

function ProfileCard({ member }) {
  const myInformation = useRecoilValue(myInformationState);
  const navigate = useNavigate();

  const getRoomId = async () => {
    const body = {
      memberSeq1: myInformation.memberSeq,
      memberSeq2: member.memberSeq,
    };
    const response = await fetchData.post(socketApis.CHATROOM_CREATEION, body);

    return response;
  };
  const moveToChatRoom = async () => {
    try {
      const response = await getRoomId();
      const roomId = response.data.roomId;
      navigate(`/talks/${roomId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <ProfileImgContainer>
        <ProfileImg>
          <div>
            <picture>
              {member.profileUrl ? (
                <img
                  src={process.env.REACT_APP_IMAGE_URL + member.profileUrl}
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
        <p>{member.nickname}</p>
        {myInformation.memberSeq !== member.memberSeq && (
          <StyledLink onClick={moveToChatRoom}>1:1 채팅</StyledLink>
        )}
        <span>민트지수 {member.score}</span>
      </ProfileArticle>
    </Wrapper>
  );
}

export default ProfileCard;
const Wrapper = styled.div`
  width: 100%;
  height: 380px;
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

const StyledLink = styled.button`
  padding: 5px 10px 5px 10px;
  color: ${(props) => props.theme.colors.mainBlack};
  background-color: ${(props) => props.theme.colors.subMint};
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  outline: none;
  cursor: pointer;
`;
