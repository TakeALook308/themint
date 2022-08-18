import React from 'react';
import styled, { keyframes } from 'styled-components';
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
      <ProfileImgContainer num={member.score}>
        <div className="pop">{member.score}</div>
        <ProfileImg style={{ '--num': member.score }} num={member.score}>
          <div className="dot"></div>
          <div c>
            <svg>
              <circle cx="70" cy="70" r="70"></circle>
              <circle cx="70" cy="70" r="70"></circle>
            </svg>

            {member.profileUrl ? (
              <img src={process.env.REACT_APP_IMAGE_URL + member.profileUrl} alt="유저 프로필" />
            ) : null}
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
const animateDot = (num) => keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(calc(-3.6deg * ${num}));
  }
`;

const animateLine = keyframes`
  0% {
    opacity: 0;}
  100% {
    opacity: 1;
  }
`;
const ProfileImgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  gap: 5px;
  .pop {
    background-color: ${(props) =>
      props.num > 0 ? props.theme.colors.subMint : props.theme.colors.pointRed};
    color: ${(props) => props.theme.colors.mainBlack};
    padding: 0 5px;
    border-radius: 3px;
    opacity: 0;
    animation: ${animateLine} 0.5s linear forwards;
    animation-delay: 1.5s;
  }
`;

const ProfileImg = styled.main`
  position: relative;

  .dot {
    position: absolute;
    width: 140px;
    height: 140px;
    inset: 5px;
    z-index: 5;
    transform: rotate(calc(-3.6deg * var(--num)));
    animation: ${(props) => animateDot(props.num)} 1s linear forwards;
  }

  .dot::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.num > 0 ? props.theme.colors.subMint : props.theme.colors.pointRed};
    box-shadow: 0 0 8px
      ${(props) => (props.num > 0 ? props.theme.colors.subMint : props.theme.colors.pointRed)};
  }

  img {
    position: absolute;
    top: 13px;
    left: 13px;
    width: 124px;
    height: 124px;
    object-fit: contain;
    border-radius: 75px;
  }

  svg {
    transform: rotate(270deg);
    position: relative;
    width: 150px;
    height: 150px;
    circle {
      width: 100%;
      height: 100%;
      fill: transparent;
      stroke-width: 3;
      stroke: ${(props) => props.theme.colors.pointGray};
      transform: translate(5px, 5px);
      &:nth-child(2) {
        stroke: ${(props) =>
          props.num > 0 ? props.theme.colors.subMint : props.theme.colors.pointRed};
        stroke-dasharray: 440;
        stroke-dashoffset: calc(440 + (440 * var(--num)) / 100);

        opacity: 0;
        animation: ${animateLine} 0.5s linear forwards;
        animation-delay: 1.5s;
      }
    }
  }
`;

const ProfileArticle = styled.article`
  display: flex;
  justify-content: center;
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
